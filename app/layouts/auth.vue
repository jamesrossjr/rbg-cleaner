<template>
  <div class="relative min-h-screen flex items-center justify-center px-4">
    <!-- Back button to return to homepage -->
    <UButton
      icon="i-lucide-chevron-left"
      to="/"
      size="xl"
      color="neutral"
      variant="subtle"
      class="absolute left-8 top-8 rounded-full z-10"
    />

    <!-- Auth form/card container -->
    <UPageCard
      variant="subtle"
      class="max-w-sm w-full"
    >
      <!-- Page-specific content injected here -->
      <slot />
    </UPageCard>
  </div>
</template>