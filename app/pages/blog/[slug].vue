<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryCollection('blog').path(`/blog/${route.params.slug}`).first()
)

const { data: relatedPosts } = await useAsyncData(`related-${route.params.slug}`, () =>
  queryCollection('blog').limit(3).all()
)

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
  <div v-if="post" class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Hero Image -->
    <div v-if="post.image?.src" class="relative h-[60vh] lg:h-[70vh] overflow-hidden">
      <NuxtImg
        :src="post.image.src"
        :alt="post.image.alt || post.title"
        :width="post.image.width || 1920"
        :height="post.image.height || 1080"
        class="w-full h-full object-cover"
        format="webp"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
    </div>

    <!-- Article Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-12 lg:py-16">
        <!-- Breadcrumb -->
        <div class="mb-8">
          <nav class="flex items-center space-x-2 text-sm">
            <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Insights
            </NuxtLink>
            <span class="text-gray-400">/</span>
            <span class="text-gray-900 dark:text-white">{{ post.title }}</span>
          </nav>
        </div>

        <!-- Article Meta -->
        <div class="mb-8">
          <div class="flex items-center space-x-4 mb-4">
            <span v-if="post.badge" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {{ post.badge.label }}
            </span>
            <time class="text-sm text-gray-600 dark:text-gray-400">
              {{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </time>
            <span class="text-sm text-gray-600 dark:text-gray-400">5 min read</span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
          {{ post.title }}
        </h1>

        <!-- Description -->
        <p class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
          {{ post.description }}
        </p>

        <!-- Author -->
        <div v-if="post.authors" class="border-t border-b border-gray-200 dark:border-gray-800 py-8 mb-12">
          <div class="flex items-start space-x-4">
            <img 
              v-if="post.authors[0]?.avatar?.src"
              :src="post.authors[0].avatar.src" 
              :alt="post.authors[0].name"
              class="w-16 h-16 rounded-full"
            />
            <div class="flex-1">
              <div class="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                {{ post.authors[0]?.name }}
              </div>
              <div v-if="post.authors[0]?.bio" class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ post.authors[0].bio }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="prose prose-lg lg:prose-xl dark:prose-invert max-w-none
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
        <ContentRenderer :value="post" />
      </div>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Topics</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Share -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Share this article</h3>
        <div class="flex items-center space-x-4">
          <button class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <UIcon name="i-lucide-twitter" class="w-4 h-4" />
            <span class="text-sm">Twitter</span>
          </button>
          <button class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <UIcon name="i-lucide-linkedin" class="w-4 h-4" />
            <span class="text-sm">LinkedIn</span>
          </button>
          <button class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <UIcon name="i-lucide-link" class="w-4 h-4" />
            <span class="text-sm">Copy Link</span>
          </button>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    <div v-if="relatedPosts && relatedPosts.length > 0" class="bg-gray-50 dark:bg-gray-900 mt-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">More Insights</h2>
          <div class="w-12 h-0.5 bg-primary"></div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-12">
          <article 
            v-for="relatedPost in relatedPosts.slice(0, 3)" 
            :key="relatedPost.path"
            class="group"
          >
            <NuxtLink :to="relatedPost.path" class="block">
              <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6">
                <NuxtImg
                  v-if="relatedPost.image?.src"
                  :src="relatedPost.image.src"
                  :alt="relatedPost.image.alt || relatedPost.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  format="webp"
                  loading="lazy"
                />
              </div>
              
              <div class="flex items-center space-x-3 mb-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {{ relatedPost.badge?.label }}
                </span>
                <time class="text-sm text-gray-600 dark:text-gray-400">
                  {{ new Date(relatedPost.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }) }}
                </time>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                {{ relatedPost.title }}
              </h3>
              
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                {{ relatedPost.description }}
              </p>
            </NuxtLink>
          </article>
        </div>

        <div class="text-center mt-16">
          <UButton to="/blog" variant="outline" size="lg">
            View All Insights
          </UButton>
        </div>
      </div>
    </div>

    <!-- Newsletter CTA -->
    <div class="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay in the loop
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get insights like this delivered directly to your inbox. No spam, unsubscribe anytime.
          </p>
          <UButton to="/contact" size="lg">
            Subscribe to Updates
          </UButton>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 State -->
  <div v-else class="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
    <div class="text-center">
      <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
        <UIcon name="i-lucide-file-x" class="w-12 h-12 text-gray-400" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Story not found</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
        The article you're looking for doesn't exist or has been moved.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton to="/blog" variant="outline" size="lg">
          Browse Insights
        </UButton>
        <UButton to="/contact" size="lg">
          Get in Touch
        </UButton>
      </div>
    </div>
  </div>
</template>
