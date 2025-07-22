<script setup lang="ts">
definePageMeta({
  layout: 'default',
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

// Sort posts by date and separate featured
const sortedPosts = computed(() => {
  if (!posts.value) return { featured: [], recent: [] }
  
  const sorted = posts.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featured = sorted.filter(post => post.featured)
  const recent = sorted.filter(post => !post.featured)
  
  return { featured, recent }
})

// Get unique categories
const categories = computed(() => {
  if (!posts.value) return []
  
  const tagSet = new Set<string>()
  posts.value.forEach(post => {
    if (post.badge?.label) {
      tagSet.add(post.badge.label)
    }
  })
  
  return Array.from(tagSet).sort()
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Masthead -->
    <div class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-16 lg:py-24">
          <div class="text-center">
            <h1 class="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Insights
            </h1>
            <p class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Strategic thinking on business optimization, systems design, and the future of work.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Navigation -->
    <div class="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-8 py-4 overflow-x-auto">
          <button class="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white border-b-2 border-primary pb-2">
            All Stories
          </button>
          <button 
            v-for="category in categories" 
            :key="category"
            class="whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors pb-2"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Featured Story -->
    <div v-if="sortedPosts.featured.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Featured</h2>
        <div class="w-12 h-0.5 bg-primary"></div>
      </div>
      
      <NuxtLink 
        :to="sortedPosts.featured[0].path"
        class="group block"
      >
        <article class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="lg:order-2">
            <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
              <NuxtImg
                v-if="sortedPosts.featured[0].image?.src"
                :src="sortedPosts.featured[0].image.src"
                :alt="sortedPosts.featured[0].image.alt || sortedPosts.featured[0].title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                format="webp"
                loading="lazy"
              />
            </div>
          </div>
          <div class="lg:order-1">
            <div class="flex items-center space-x-3 mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {{ sortedPosts.featured[0].badge?.label }}
              </span>
              <time class="text-sm text-gray-600 dark:text-gray-400">
                {{ new Date(sortedPosts.featured[0].date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </time>
            </div>
            <h1 class="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-primary transition-colors">
              {{ sortedPosts.featured[0].title }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {{ sortedPosts.featured[0].description }}
            </p>
            <div class="flex items-center space-x-4">
              <div v-if="sortedPosts.featured[0].authors" class="flex items-center space-x-3">
                <img 
                  v-if="sortedPosts.featured[0].authors[0]?.avatar?.src"
                  :src="sortedPosts.featured[0].authors[0].avatar.src" 
                  :alt="sortedPosts.featured[0].authors[0].name"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ sortedPosts.featured[0].authors[0]?.name }}
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                5 min read
              </div>
            </div>
          </div>
        </article>
      </NuxtLink>
    </div>

    <!-- Latest Stories -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Latest Stories</h2>
        <div class="w-12 h-0.5 bg-primary"></div>
      </div>

      <!-- Stories Grid -->
      <div v-if="sortedPosts.recent.length > 0" class="grid lg:grid-cols-3 gap-12">
        <article 
          v-for="post in sortedPosts.recent" 
          :key="post.path"
          class="group"
        >
          <NuxtLink :to="post.path" class="block">
            <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 mb-6">
              <NuxtImg
                v-if="post.image?.src"
                :src="post.image.src"
                :alt="post.image.alt || post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                format="webp"
                loading="lazy"
              />
            </div>
            
            <div class="flex items-center space-x-3 mb-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {{ post.badge?.label }}
              </span>
              <time class="text-sm text-gray-600 dark:text-gray-400">
                {{ new Date(post.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }) }}
              </time>
            </div>
            
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary transition-colors">
              {{ post.title }}
            </h2>
            
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
              {{ post.description }}
            </p>
            
            <div class="flex items-center justify-between">
              <div v-if="post.authors" class="flex items-center space-x-2">
                <img 
                  v-if="post.authors[0]?.avatar?.src"
                  :src="post.authors[0].avatar.src" 
                  :alt="post.authors[0].name"
                  class="w-6 h-6 rounded-full"
                />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ post.authors[0]?.name }}
                </span>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-500">3 min read</span>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-lucide-newspaper" class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">No stories yet</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          We're working on bringing you insightful content. Check back soon for updates.
        </p>
        <UButton to="/contact" variant="outline">
          Get Notified
        </UButton>
      </div>
    </div>

    <!-- Newsletter CTA -->
    <div class="bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Never miss an insight
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get our latest thinking on business optimization and systems design delivered to your inbox.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <UButton to="/contact" size="lg" class="flex-1">
              Subscribe
            </UButton>
            <UButton to="/work" variant="outline" size="lg" class="flex-1">
              View Our Work
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
