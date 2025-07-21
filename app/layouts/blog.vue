<template>
  <div class="min-h-screen flex flex-col">
    <!-- App Header -->
    <AppHeader />

    <!-- Main layout area -->
    <UMain class="flex-1 w-full">
      <UPage class="flex flex-col lg:flex-row upage">

        <!-- Sidebar -->
        <template #left>
          <UPageAside class="w-64 h-screen shrink-0 hidden lg:block bg-gray-50 !pt-4 !px-8 lg:!pr-4 dark:bg-gray-800">
            <BlogSidebar 
              class="flex-shrink-0"
            />
          </UPageAside>
        </template>

        <!-- Main content -->
        <UPageBody class="flex-1 w-full p-4">
          <NuxtPage />
        </UPageBody>
      </UPage>
    </UMain>

    <!-- App Footer -->
    <AppFooter />
  </div>
</template>
