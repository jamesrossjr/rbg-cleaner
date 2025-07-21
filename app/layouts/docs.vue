<script setup lang="ts">
// Injects the sidebar navigation from @nuxt/content
import type { ContentNavigationItem } from '@nuxt/content'

// Retrieves the navigation items for the content structure
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <!-- UPage provides a structured layout with optional slots for sidebars -->
        <UPage>
          <!-- Sidebar navigation and search area -->
          <template #left>
            <UPageAside>
              <template #top>
                <!-- Keyboard shortcut-aware search input -->
                <UContentSearchButton
                  label="Search..."
                  variant="outline"
                  class="w-full"
                >
                  <template #trailing>
                    <div class="flex items-center gap-0.5 ms-auto">
                      <!-- Displays keyboard shortcuts for the search functionality -->
                      <UKbd value="meta" />
                      <UKbd value="k" />
                    </div>
                  </template>
                </UContentSearchButton>
              </template>

              <!-- Dynamic navigation based on your content structure -->
              <UContentNavigation
                :navigation="navigation"
                highlight
              />
            </UPageAside>
          </template>

          <!-- Main content area will render the current page -->
          <NuxtPage />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
