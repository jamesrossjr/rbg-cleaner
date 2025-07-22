<script setup lang="ts">
definePageMeta({
  layout: 'blog',
  title: 'Insights - Right Brain Group',
  description: 'Discover insights on business optimization, systems thinking, and scaling strategies from the Right Brain Group team.',
})

const route = useRoute()

// Get blog posts
const { data: posts } = await useAsyncData(route.path, () =>
  queryCollection('blog').all()
)

useSeoMeta({
  title: 'Insights - Right Brain Group',
  ogTitle: 'Insights - Right Brain Group',
  description: 'Discover insights on business optimization, systems thinking, and scaling strategies from the Right Brain Group team.',
  ogDescription: 'Discover insights on business optimization, systems thinking, and scaling strategies from the Right Brain Group team.'
})

defineOgImageComponent('Saas')

// Extracted UI configuration for blog post cards
const postUi = {
  root: 'rounded-2xl p-4 md:p-5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,1)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),inset_-4px_-4px_6px_rgba(255,255,255,0.05)]',
  header: 'relative overflow-hidden rounded-2xl bg-[--ui-bg] shadow-none aspect-video flex items-center justify-center',
  image: 'object-cover object-top w-full h-full rounded-t-2xl'
}

// Hero content for the blog index page
const hero = {
  title: 'Insights & Ideas',
  description: 'Explore our latest thoughts on business optimization, systems thinking, and strategies that help organizations scale with intention.',
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Hero Section -->
    <UPageHero
      :title="hero.title"
      :description="hero.description"
      class="mb-12"
    >
      <template #links>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton 
            to="/contact" 
            size="xl" 
            icon="i-lucide-arrow-right" 
            trailing
          >
            Discuss Your Project
          </UButton>
          <UButton 
            to="/about" 
            size="xl" 
            variant="subtle" 
            color="neutral"
          >
            Learn About Us
          </UButton>
        </div>
      </template>
    </UPageHero>

    <div class="container mx-auto px-4">
      <!-- Blog Posts --> 
      <UBlogPosts v-if="posts && posts.length > 0">
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

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <UIcon name="i-lucide-book-open" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">Check back soon for insights and updates from our team.</p>
        <UButton to="/contact" variant="subtle">
          Get in Touch
        </UButton>
      </div>
    </div>

    <!-- Contact CTA Section -->
    <BlogContactCTA />
  </div>
</template>
