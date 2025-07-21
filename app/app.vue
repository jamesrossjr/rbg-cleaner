<script setup lang="ts">
const colorMode = useColorMode()

let hasMounted = false
watch(() => colorMode.preference, (newPref) => {
  if (!hasMounted) {
    hasMounted = true
    return
  }
  const theme = colorMode.value
  console.log(`Theme changed to: ${theme} (preference: ${newPref})`)
  useToast().add({ title: `Theme: ${theme}`, description: `Preference: ${newPref}`, duration: 2000 })
})
colorMode.preference = colorMode.preference || 'system'

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color.value || 'white' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en',
    dir: 'ltr'
  },
  bodyAttrs: {
    class: 'overflow-x-hidden'
  }
})

useSeoMeta({
  titleTemplate: '%s - Right Brain Group LLC - SaaS template',
  ogImage: 'https://rightbraingroup.com/social-card.png',
  twitterImage: 'https://rightbraingroup.com/social-card.png',
  twitterCard: 'summary_large_image'
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || []
})

provide('navigation', navigation)
// Nuxt UI loading indicator manual control


</script>

<template>
  <NuxtLayout />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.618s cubic-bezier(0.55, 0, 0.1, 1);
}

.page-enter-from {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(13px); /* 13px = Fibonacci */
}

.page-leave-to {
  opacity: 0;
  filter: blur(8px); /* 8px = Fibonacci */
  transform: translateY(-8px);
}
</style>
