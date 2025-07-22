<script setup lang="ts">
definePageMeta({
  layout: 'blog',
})

const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryCollection('blog').path(`/blog/${route.params.slug}`).first()
)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path, {
    fields: ['description']
  })
})

// Type guard to check for null or undefined post.value
if (post.value) {
  const title = post.value.seo?.title || post.value.title
  const description = post.value.seo?.description || post.value.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
  })

  if (post.value.image?.src) {
    defineOgImage({
      url: post.value.image.src
    })
  } else {
    defineOgImageComponent('Saas', {
      headline: 'Insights'
    })
  }
} else {
  console.error('Post not found')
}
</script>

<template>
  <div v-if="post">
    <!-- Featured Image -->
    <div v-if="post.image?.src" class="mb-8">
      <NuxtImg
        :src="post.image.src"
        :alt="post.image.alt || post.title"
        :width="post.image.width || 1200"
        :height="post.image.height || 630"
        class="w-full aspect-video object-cover rounded-lg"
        format="webp"
        loading="lazy"
      />
    </div>

    <!-- Post Header -->
    <UPageHeader
      :title="post.title"
      :description="post.description"
      class="mb-8"
    >
      <template #headline>
        <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <UBadge
            v-if="post.badge"
            v-bind="post.badge"
            variant="subtle"
          />
          <span v-if="post.badge">&middot;</span>
          <time>{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
        </div>
      </template>

      <!-- Author Info -->
      <div v-if="post.authors" class="flex flex-wrap items-center gap-3 mt-6">
        <div
          v-for="(author, index) in post.authors"
          :key="index"
          class="flex items-center gap-3"
        >
          <UAvatar
            v-if="author.avatar"
            v-bind="author.avatar"
            :alt="`${author.name} avatar`"
            size="sm"
          />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">{{ author.name }}</div>
            <div v-if="author.bio" class="text-sm text-gray-600 dark:text-gray-400">{{ author.bio }}</div>
          </div>
        </div>
      </div>
    </UPageHeader>

    <!-- Main Content -->
    <UPage>
      <UPageBody prose>
        <ContentRenderer
          v-if="post"
          :value="post"
        />

        <!-- Post Tags -->
        <div v-if="post.tags && post.tags.length > 0" class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in post.tags"
              :key="tag"
              :label="tag"
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        <!-- Navigation to Previous/Next Posts -->
        <USeparator v-if="surround?.length" class="my-8" />
        <UContentSurround :surround="surround" />
      </UPageBody>

      <!-- Table of Contents -->
      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc 
          :links="post.body.toc.links"
          class="sticky top-8"
        />
      </template>
    </UPage>

    <!-- Contact CTA -->
    <BlogContactCTA />
  </div>

  <!-- 404 State -->
  <div v-else class="text-center py-16">
    <UIcon name="i-lucide-file-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post Not Found</h1>
    <p class="text-gray-600 dark:text-gray-300 mb-6">The blog post you're looking for doesn't exist.</p>
    <div class="flex gap-4 justify-center">
      <UButton to="/blog" variant="subtle">
        Back to Insights
      </UButton>
      <UButton to="/contact">
        Get in Touch
      </UButton>
    </div>
  </div>
</template>
