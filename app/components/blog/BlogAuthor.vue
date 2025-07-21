<script setup>
import { Icon, UCard } from '#components'

defineProps({
  author: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <UCard class="mt-16 p-1 rounded-2xl bg-stone-50 dark:bg-[#0f162b] ring-0 shadow-[3px_3px_8px_rgba(0,0,0,0.05),-3px_-3px_8px_rgba(255,255,255,1)]">
    <div class="flex flex-col sm:flex-row items-start gap-6">
      <NuxtImg
        v-if="author?.avatar?.src"
        :src="author.avatar.src"
        :alt="author.name"
        class="w-16 h-16 rounded-full bg-white p-2 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),inset_-4px_-4px_8px_rgba(255,255,255,0.1)]"
      />
      <div class="max-w-full sm:max-w-[70%]">
        <p class="font-semibold text-xl text-gray-900 dark:text-white leading-tight font-['Prenton']">{{ author.name }}</p>
        <p v-if="author.bio" class="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
          {{ author.bio }}
        </p>
        <div class="flex gap-3 mt-4">
          <NuxtLink
            v-for="(link, index) in author.social"
            :key="index"
            :to="link.url"
            target="_blank"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-[#f9b712] text-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.4)] transition hover:scale-105"
            :aria-label="link.label"
          >
            <Icon :name="`i-simple-icons-${link.icon}`" class="w-3 h-3" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </UCard>
</template>
