<template>
  <div>
    <NuxtImg
      :src="resolvedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :aria-label="ariaLabel || alt"
      decoding="async"
      :srcset="finalSrcset"
      :sizes="sizes"
      :class="imgClass"
    />
  </div>
</template>

<script setup lang="ts">
// -- Props --
const props = defineProps<{
  src: string
  alt: string
  width: number 
  height: number
  ariaLabel?: string
  imgClass?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
  srcset?: string
  useFibonacci?: boolean
}>()

// -- Normalize Public Path --
const resolvedSrc = computed(() =>
  props.src.startsWith('/') ? props.src : `/${props.src}`
)

// -- Default Fibonacci Breakpoints --
const fibonacciSizes = [160, 260, 420, 680, 1100]

// -- Generate srcset if enabled --
const finalSrcset = computed(() => {
  if (props.srcset) return props.srcset
  if (!props.useFibonacci) return undefined

  const ext = props.src.split('.').pop()
  const base = props.src.replace(`.${ext}`, '')

  return fibonacciSizes
    .filter(size => size <= props.width * 2)
    .map(size => `${base}-${size}w.${ext} ${size}w`)
    .join(', ')
})
</script>
