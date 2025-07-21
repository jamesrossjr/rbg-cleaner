<script setup lang="ts">

import { getTagColor } from '../utils/blogCategories'

const sectionContainer = 'px-5 sm:px-8 lg:px-13 py-6 sm:py-10 lg:py-14'

interface Feature {
  title?: string
  description?: string
  icon?: string
  [key: string]: unknown
}

interface PageData {
  title: string
  description?: string
  hero?: {
    title?: string
    description?: string
    image?: {
      src: string
      width?: number
      height?: number
      alt?: string
    }
    links?: { to: string; label: string; icon?: string }[]
  }
  section1?: {
    title?: string
    description?: string
    orientation?: 'horizontal' | 'vertical'
    image?: {
      src?: string
      alt?: string
    }
    features?: Feature[]
  }
  section2?: {
    title?: string
    description?: string
    orientation?: 'horizontal' | 'vertical'
    image?: {
      src?: string
      alt?: string
    }
    features?: Feature[]
  }
  features?: {
    title?: string
    description?: string
    items?: Record<string, unknown>[]
  }
  testimonials?: {
    title?: string
    description?: string
    items?: Record<string, unknown>[]
  }
  blog?: {
    title?: string
    description?: string
  }
  faqs?: {
    title?: string
    description?: string
    items?: {
      label: string
      icons?: string[]
      content: string
    }[]
  }
  cta?: {
    title?: string
    description?: string
    [key: string]: unknown
  }
}

const { data: page } = await useAsyncData('index', () =>
  queryCollection('index').first()
) as { data: Ref<PageData> }
const { data: posts } = await useAsyncData('posts', () => queryCollection('posts').all()) as { data: Ref<Record<string, unknown>[]> }
const { data: works } = await useAsyncData('works', () => queryCollection('works').all()) as { data: Ref<Record<string, unknown>[]> }


function getBadgePropsFromItem(item: { badge?: { label?: string } }) {
  const label = item.badge?.label || 'General'
  return {
    label,
    color: getTagColor(label) as 'error' | 'primary' | 'neutral' | 'secondary' | 'success' | 'info' | 'warning' | undefined,
    variant: 'soft' as 'solid' | 'outline' | 'soft' | 'subtle' | undefined,
    class: 'lgt-inset border border-gray-200 dark:border-gray-800 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-xs font-semibold shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.2)]'
  }
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

watchEffect(() => {
  if (!page.value) return
 
  useSeoMeta({
    titleTemplate: '',
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description
  })
})



</script>

<template>
  <main>
    <div v-if="page">
    <!-- Hero -->
    <UPageHero
      id="Hero"
      :description="page?.hero?.description"
      class="py-0"
    >
      <template #title>
        <div class="flex flex-col items-center justify-center">
          <NuxtImg
            :src="page?.hero?.image?.src"
            :width="page?.hero?.image?.width"
            :height="page?.hero?.image?.height"
            :alt="page?.hero?.image?.alt"
            class="mx-auto mb-6"
            decoding="async"
            style="max-width: 260px"
          />
          <span class="text-center">
            {{ page?.hero?.title }}
          </span>
        </div>
      </template>
      <template #links>
        <UButton
          :to="page?.hero?.links?.[0]?.to"
          :label="page?.hero?.links?.[0]?.label"
          :leading-icon="page?.hero?.links?.[0]?.icon"
          class="u-button-base button-primary !px-5"
        />        
        <UButton
          class="button-secondary cursor-pointer"
          :label="page?.hero?.links?.[1]?.label"
          :leading-icon="page?.hero?.links?.[1]?.icon"
          @click="() => scrollToSection('services')"
        />
      </template>
      <div class="absolute rounded-full dark:bg-(--ui-primary) blur-[250px] size-40 sm:size-50 transform -translate-x-1/2 left-1/2 -translate-y-80" />

      
      <ClientOnly>
        <StarsBg />
      </ClientOnly>
    </UPageHero>

    <!-- Section 1 -->
    <UPageSection
      id="section-1"
      :title="page?.section1?.title"
      :description="page?.section1?.description"
      :orientation="page?.section1?.orientation"
      :image="page?.section1?.image"
      :features="page?.section1?.features"
      :links="[
        {
          label: 'Learn More',
          to: '/',
          class: 'button-primary',
          icon: 'i-lucide-info'
        }
      ]"
      :ui="{ container: sectionContainer }"
    >
      <BarChart class="w-full mx-auto"  />
    </UPageSection>

    <!-- Section 2 -->
    <UPageSection
      id="section-2"
      :title="page?.section2?.title"
      :description="page?.section2?.description"
      :orientation="page?.section2?.orientation"
      :image="page?.section2?.image"
      :features="page?.section2?.features"
      reverse
      :links="[
        {
          label: 'Learn More',
          to: '/',
          class: 'button-primary',
          icon: 'i-lucide-info'
        }
      ]"
      :ui="{ container: sectionContainer }"
    >
      <LineChart class="w-full mx-auto" />
    </UPageSection>

    <!-- Work Carosel -->
    <UPageSection
      id="work-header"
      :title="page?.testimonials?.title"
      :description="page?.testimonials?.description"
      class="text-center sm:text-left w-full"
      :ui="{ container: 'max-w-(--ui-container) mx-auto px-4 relative w-full sm:px-0 lg:px-0 sm:pb-24 lg:pb-32' }"
    > 

        <UContainer
          id="testimonial-left"
          class="relative w-full sm:px-0 lg:px-0 sm:pb-24 lg:pb-32"
          :ui="{ container: 'w-full mx-auto' }"
        >

        <UCarousel
          v-if="works?.length"
          :items="works"
          snap="center"
          loop
          autoplay
          :interval="5000"
          class="max-w-screen-xl mx-auto overflow-visible px-4"
          :ui="{
            container: 'flex gap-3 p-8',
            item: 'shrink-0 snap-center transition-transform duration-300 ease-in-out basis-full sm:basis-1/2 lg:basis-1/3'
          }"
        >
          <template #default="{ item }">
              <NuxtLink
                :to="typeof item === 'object' && item !== null && '_path' in item ? (item as any)._path : undefined"
                class="relative block"
              >
                <div class="rounded-xl shadow-xl bg-white dark:bg-gray-900">
                  <template v-if="typeof item === 'object' && item !== null">
                    <img
                      v-if="item.image?.src"
                      :src="item.image?.src || '/placeholder.jpg'"
                      :alt="item.image.alt || item.title"
                      class="w-full h-64 object-cover rounded-t-xl"
                    >
                    <div class="p-4">
                      <h3 class="text-xl font-semibold mb-2">{{ item.title || 'Untitled' }}</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.excerpt || item.description || 'No description available.' }}</p>
                    </div>
                  </template>
                </div>
              </NuxtLink>
            </template>
        </UCarousel>
      </UContainer>
    </UPageSection>

    <!-- Services -->
    <UPageSection
      id="services"
      v-bind="page?.features"
      :ui="{ container: sectionContainer }"
    >
      <UPageGrid class="items-stretch gap-6">
        <div
          v-for="(item, index) in page?.features?.items"
          :key="index"
          class="group relative rounded-2xl h-full overflow-visible animated-border"
        >
          <UPageCard
            v-bind="typeof item === 'object' && item !== null ? item : {}"
            class="lgt-neo relative z-10 rounded-[inherit] p-6 transition-all duration-300 h-full"
          />
        </div>
      </UPageGrid>
      <UButton
        to="/"
        size="lg"
        icon="i-lucide-arrow-right"
        class="button-primary mt-10 mx-auto"
        aria-label="View all services"
      >
        View Services
      </UButton>
    </UPageSection>
    
    <!-- Testimonials Header-->
    <UPageSection
      id="testimonials-header"
      :title="page?.testimonials?.title"
      :description="page?.testimonials?.description"
      class="text-center sm:text-left"
      :ui="{ container: '!pb-20 sm:pt-24 lg:pt-32 py-10 sm:py-16 lg:py-20' }"
    /> 

    <!-- Testimonials -->
    <UContainer
      id="testimonial-left"
      class="relative w-full sm:px-0 lg:px-0 sm:pb-24 lg:pb-32"
      :ui="{ container: 'w-full mx-auto' }"
    >
      <ClientOnly 
        v-if="page?.testimonials"
      >
        <template #default>
          <!-- Testimonials Desktop Left -->
          
            <UPageMarquee
              id="testimonials-right"
              pause-on-hover
              style="--duration: 89s;"
              :overlay="false"
              :ui="{
                root: 'overflow-visible [--gap:--spacing(6)] z-10',
                content: 'w-auto hidden sm:flex pb-5'
              }"
            >
              <div class="flex flex-1 items-stretch gap-6">
                <TestimonialCard
                  v-for="(testimonial, index) in page?.testimonials?.items"
                  :key="`right-${index}`"
                  :testimonial="testimonial"
                />
              </div>
            </UPageMarquee>
          
          <!-- Testimonials Desktop Right -->

            <UPageMarquee
              id="testimonials-right"
              pause-on-hover
              reverse
              style="--duration: 89s;"
              :overlay="false"
              :ui="{
                root: 'overflow-visible [--gap:--spacing(6)] z-20',
                content: 'w-auto hidden sm:flex'
              }"
            >
              <div class="flex flex-1 items-stretch gap-6">
                <TestimonialCard
                  v-for="(testimonial, index) in page?.testimonials?.items"
                  :key="`left-${index}`"
                  :testimonial="testimonial"
                />
              </div>
            </UPageMarquee>

          <!-- Testimonials Mobile -->

          <UPageSection
            id="testimonials-mobile"
            class="block sm:hidden mt-6"
            :ui="{ container: 'pt-0 pb-10 flex flex-col items-center justify-center gap-6' }"
          >
            <div class="flex flex-1 flex-col gap-6">
              <TestimonialCard
                v-for="(testimonial, index) in page?.testimonials?.items"
                :key="`mobile-${index}`"
                :testimonial="testimonial"
              />
            </div>
          </UPageSection>
        </template>
      </ClientOnly>
    </UContainer>

    <!-- Insights (Blog) -->
    <UPageSection
      id="blog-header"
      :title="page?.blog?.title"
      :description="page?.blog?.description"
      class="text-center flex text-left sm:text-left gap-14"
    > 
      <ClientOnly>
          <template v-if="posts?.length">
          <UCarousel 
            :items="posts"
            :items-to-show="3"
            wrap-around
            loop
            arrows
            autoplay
            class="blog-carousel mt-8 sm:mt-0"
            :ui="{
              item: 'w-full sm:basis-1/2 md:basis-1/3 flex text-left',
              container: 'items-stretch mb-6',
              controls: 'absolute -top-8 inset-x-12'
            }"
          >
          <template #default="{ item }">
            <UBlogPost
              v-bind="typeof item === 'object' && item !== null ? item : {}"
              :to="typeof item === 'object' && item !== null && 'path' in item ? item.path : undefined"
              variant="naked"
              :badge="getBadgePropsFromItem(typeof item === 'object' && item !== null ? item : { badge: { label: 'General' } })"
              :ui="{ 
                root: 'rounded-lg p-4 md:p-5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,1)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),inset_-4px_-4px_6px_rgba(255,255,255,0.05)]',
                header: 'relative rounded-lg overflow-hidden bg-[--ui-bg] shadow-none aspect-video flex items-center justify-center',
                image: 'object-cover object-top w-full h-full rounded-lg'
              }"
            />
          </template>
          </UCarousel>
        </template>
      </ClientOnly>
    </UPageSection>

    <!-- FAQ -->
    <UPageSection
      id="FAQs"
      :title="page?.faqs?.title"
      :description="page?.faqs?.description"
      class="text-center flex text-left sm:text-left max-w-4xl mx-auto"
      >
      <ClientOnly>
        <UPageAccordion 
            :items="page?.faqs?.items"
            :ui="{ trigger: 'transition-transform duration-300', body: 'prose text-black dark:text-white pl-[45px] pr-[75px] text-left' }"
        >
          <template #leading="{ item }">            
          <UIcon
              v-if="item.icons?.[0]"
              :name="item.icons?.[0]"
              class="text-[#17283b] dark:text-[#e7a600] size-6 mr-4"
            />
          </template>
          <template #default="{ item }">
            <span class="text-base font-medium">{{ item.label }}</span>
          </template>
          <template #content="{ item }">
            <div>
              {{ item.content }}
            </div>
          </template>
        </UPageAccordion>
      </ClientOnly>
    </UPageSection>

    <USeparator />

    <!-- CTA -->
    <UPageSection
      id="cta"
      class="w-full overflow-hidden"
      :ui="{ container: 'w-full max-w-full !px-0 !py-0' }"
      :title="page?.cta?.title"
      :description="page?.cta?.description"
    >
      <MagicCTA
        v-if="page?.cta"
        v-bind="page?.cta"
        class="px-4"
        magic-category="growth"
      />
    </UPageSection>

    </div>
  </main>
</template>

<style scoped>
/* Critical styles for Hero and Header */
.font-prenton {
  font-family: 'Prenton', sans-serif;
}

h1, h2 {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
</style>
