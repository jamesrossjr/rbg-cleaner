<script setup lang="ts">
const route = useRoute()

const { data: work } = await useAsyncData(`work-${route.params.slug}`, () =>
  queryCollection('works').path(`/work/${route.params.slug}`).first()
)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('works', route.path, {
    fields: ['description']
  })
})

// Type guard to check for null or undefined work.value
if (work.value) {
  const title = work.value.seo?.title || work.value.title
  const description = work.value.seo?.description || work.value.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
  })

  if (work.value.image?.src) {
    defineOgImage({
      url: work.value.image.src
    })
  } else {
    defineOgImageComponent('Saas', {
      headline: 'Work'
    })
  }
} else {
  console.error('work not found')
}
</script>



<template>
  <UContainer v-if="work">
    <UPageHeader
      :title="work.title"
      :description="work.description"
    >
      <template #headline>
        <UBadge
          v-bind="work.badge"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ new Date(work.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in work.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            alt="Author avatar"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="work"
          :value="work"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="work?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="work.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
