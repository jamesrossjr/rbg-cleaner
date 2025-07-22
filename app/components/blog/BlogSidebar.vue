<script setup lang="ts">
// Get all blog posts for sidebar navigation
const { data: posts } = await useAsyncData('blog-sidebar', () =>
  queryCollection('blog').all()
)

// Get unique categories/tags from posts
const categories = computed(() => {
  if (!posts.value) return []
  
  const tagSet = new Set<string>()
  posts.value.forEach(post => {
    if (post.badge?.label) {
      tagSet.add(post.badge.label)
    }
    if (post.tags) {
      post.tags.forEach((tag: string) => tagSet.add(tag))
    }
  })
  
  return Array.from(tagSet).sort()
})

// Recent posts for sidebar
const recentPosts = computed(() => {
  if (!posts.value) return []
  return posts.value
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
})
</script>

<template>
  <div class="space-y-8">
    <!-- About Section -->
    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">About Our Insights</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Discover strategies for business optimization, systems thinking, and scaling with intention from the Right Brain Group team.
      </p>
      <UButton to="/about" variant="subtle" size="sm" block>
        Learn More About Us
      </UButton>
    </div>

    <!-- Recent Posts -->
    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Posts</h3>
      <div class="space-y-3">
        <NuxtLink
          v-for="post in recentPosts"
          :key="post.path"
          :to="post.path"
          class="block group"
        >
          <div class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {{ post.title }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Categories -->
    <div v-if="categories.length > 0" class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Topics</h3>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="category in categories"
          :key="category"
          :label="category"
          variant="subtle"
          size="sm"
          class="cursor-pointer hover:bg-primary/10"
        />
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
      <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Ready to Transform Your Business?</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Let's discuss how we can help optimize your systems and scale with intention.
      </p>
      <UButton to="/contact" size="sm" block>
        Get Started
      </UButton>
    </div>
  </div>
</template>
