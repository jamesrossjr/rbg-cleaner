<script setup lang="ts">
const route = useRoute()

// Define navigation items: Insights always clickable and highlighted on any blog route
const items = computed(() => [{
  label: 'About',
  to: '/about'
}, {
  label: 'Work',
  to: '/work',
}, /* {
  label: 'Help Desk',
  to: '/docs',
  active: route.path.startsWith('/docs')
}, */{
  label: 'Insights',
  to: '/blog',
  active: route.path.startsWith('/blog')
}, {
  label: 'Contact',
  to: '/contact'
},

])
</script>

<template>
  <UHeader :ui="{ container: 'w-full max-w-full mx-auto' }" class="backdrop-blur">
    <template #left>
      <div itemscope itemtype="https://schema.org/Organization">
        <NuxtLink class="flex items-center" to="/" itemprop="url">
          <LogoPro 
            class="w-auto h-6 shrink-0"
            priority
            loading="eager"
            decoding="async"
            itemprop="logo"
          />
          <h2 class="text-2xl pl-2" itemprop="name">
              Right Brain
          </h2>
        </NuxtLink>
    </div>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton class="hidden sm:inline-flex"/>

      <!-- SIGN IN BUTTONS
      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="hidden lg:inline-flex"
      /> 
      -->

      <UButton
        label="Talk Strategy"
        trailing-icon="i-lucide-message-circle"
        class="!p-2 sm:!px-4 inline-flex u-button-base button-primary text-transparent sm:text-current"
        to="/contact"
        aria-label="Contact"
        :ui="{
          label: 'hidden sm:inline-flex',
          trailingIcon: 'p-0 m-0'
        }"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      />
    </template>
  </UHeader>
</template>
