<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  category: 'media' | 'alignment' | 'growth' | 'infrastructure' | 'care'
}>()

const colorMap = {
  media: 'text-purple-400',
  alignment: 'text-blue-400',
  growth: 'text-green-400',
  infrastructure: 'text-yellow-400',
  care: 'text-pink-400'
}

const highlightIndexMap = {
  media: 0,
  alignment: 1,
  growth: 2,
  infrastructure: 3,
  care: 4
}

const activeIndex = computed(() => highlightIndexMap[props.category])
</script>

<template>
  <span class="inline-flex justify-center items-center overflow-hidden whitespace-nowrap font-mono leading-none tracking-tight h-[2.3rem]">
    <span
      v-for="(letter, i) in 'MAGIC'.split('')"
      :key="i"
      :class="[
        'inline-block w-[1.5ch] text-center transition-colors duration-500',
        i === activeIndex ? colorMap[props.category] : 'text-inherit'
      ]"
    >
      {{ letter }}
    </span>
  </span>
</template>
