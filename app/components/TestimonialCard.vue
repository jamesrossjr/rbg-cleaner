<template>
  <LazyUPageCard
    variant="subtle"
    :href="testimonial.sourceLink"
    :description="testimonial.quote"
    class="w-100 group shrink-0 lgt-neo bg-light p-6 rounded-2xl shadow-md transition-transform duration-500 hover:-translate-y-4 hover:shadow-lg relative z-10 hover:z-20"
    :ui="{ description: 'before:content-[open-quote] after:content-[close-quote] line-clamp-3' }"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <LazyUTooltip :text="`Verified ${testimonial.source}`">
          <a
            :href="testimonial.sourceLink"
            target="_blank"
            rel="noopener"
            class="flex-shrink-0"
          >
            <img
              :src="`/images/${testimonial.source}-logo.svg`"
              width="20"
              height="20"
              format="webp,avif"
              :alt="`${testimonial.source} logo`"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 20px">
          </a>
        </LazyUTooltip>
        <div class="text-lg text-yellow-500 group-hover:text-amber-500">
          {{ '★'.repeat(Number(testimonial.stars)) + '☆'.repeat(5 - Number(testimonial.stars)) }}
          <span class="text-sm text-gray-500 font-medium">
            ({{ testimonial.stars }}/5)
          </span>
        </div>
      </div>
    </template>

    <template #footer>
      <LazyUUser
        v-bind="testimonial.user"
        size="xl"
        :ui="{
          name: 'font-semibold text-base text-primary-900 dark:text-primary-50',
          description: 'text-sm text-gray-500'
        }"
      />
    </template>
  </LazyUPageCard>
</template>

<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true
  }
})
</script>
