<template>
  <UPageSection class="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5">
    <div class="text-center space-y-6">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Ready to Optimize Your Systems?
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Let's discuss how we can help streamline your operations, automate workflows, and scale your business with intention.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton 
          to="/contact" 
          size="xl" 
          icon="i-lucide-arrow-right" 
          trailing
        >
          Start Your Project
        </UButton>
        <UButton 
          to="/work" 
          variant="subtle" 
          color="neutral" 
          size="xl"
        >
          View Our Work
        </UButton>
      </div>
    </div>
  </UPageSection>
</template>