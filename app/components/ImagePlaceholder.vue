<script setup>
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Image'
  },
  width: {
    type: [String, Number],
    default: 1600
  },
  height: {
    type: [String, Number],
    default: 900
  },
  format: {
    type: String,
    default: 'webp'
  },
  sizes: {
    type: String,
    default: '(max-width: 768px) 100vw, 768px'
  }
})

</script>

<template>
  <UPageCard
    variant="ghost"
    class="p-0 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),_inset_-4px_-4px_8px_rgba(255,255,255,1)] rounded-2xl bg-[--ui-bg]"
  >
    <div class="aspect-video w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
      <template v-if="src">
        <NuxtImg
          :src="src"
          :alt="alt || 'Image'"
          :width="width || 1600"
          :height="height || 900"
          :format="format || 'webp'"
          :sizes="sizes || '(max-width: 768px) 100vw, 768px'"
          class="rounded-xl object-cover w-full h-full"
          loading="lazy"
          decoding="async"
        />
      </template>
      <template v-else>
        <div class="text-center text-(--ui-text-muted) text-sm italic">Image placeholder</div>
      </template>
    </div>
  </UPageCard>
</template>
