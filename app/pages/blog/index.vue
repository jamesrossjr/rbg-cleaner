<script setup lang="ts">
import { useSeoMeta, useRoute } from '#imports'

definePageMeta({
  layout: 'blog',
})

const route = useRoute()

const { data: indexPage } = await useAsyncData('index', () =>
  queryCollection('index').first()
) as unknown as { data: Ref<Record<string, unknown>> }
  const { data: posts } = await useAsyncData(route.path, () =>
  queryCollection('posts').all()
)

useSeoMeta({
  title: indexPage.value?.title,
  ogTitle: indexPage.value?.title,
  description: indexPage.value?.description,
  ogDescription: indexPage.value?.description
})

defineOgImageComponent('Saas')

// Extracted UI configuration for blog post cards
const postUi = {
  root: 'rounded-2xl p-4 md:p-5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,1)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),inset_-4px_-4px_6px_rgba(255,255,255,0.05)]',
  header: 'relative overflow-hidden rounded-2xl bg-[--ui-bg] shadow-none aspect-video flex items-center justify-center',
  image: 'object-cover object-top w-full h-full rounded-t-2xl'
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-4">
      <!-- Blog Posts --> 
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="post.path"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="getBadgePropsFromItem(post)"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :image="post.image?.src"
          :ui="postUi"
        />
      </UBlogPosts>

    </div>
  </div>
</template>
