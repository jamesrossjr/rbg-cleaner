<script setup lang="ts">
/* const columns = [
  { label: 'Resources', children: [{ label: 'Help center' }, { label: 'Docs' }, { label: 'Roadmap' }, { label: 'Changelog' }] },
  { label: 'Features', children: [{ label: 'Affiliates' }, { label: 'Portal' }, { label: 'Jobs' }, { label: 'Sponsors' }] },
  { label: 'Company', children: [{ label: 'About' }, { label: 'Pricing' }, { label: 'Careers' }, { label: 'Blog' }] }
]

const toast = useToast()
const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true
  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })
} */
</script>

<template>
  <USeparator class="h-px" />
  <footer aria-label="Site footer">
    <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
      <!--<template #top>
        <UContainer>
          <UFooterColumns>
            <div class="w-3/4">
              <h3 class="text-3xl font-bold mb-4">
                <UIcon name="i-lucide-mails" /> Build Something Brilliant Together
              </h3>
              <p id="footer-description" class="text-lg text-gray-600 dark:text-gray-300">
                Share your goals and we’ll help turn them into a powerful digital experience.
              </p>
            </div>
            <template #right>
              <form @submit.prevent="onSubmit" aria-describedby="footer-description">
                <UFormField name="email" label="Subscribe to our newsletter" size="lg">
                  <UInput v-model="email" type="email" class="w-full" placeholder="Enter your email">
                    <template #trailing>
                      <UButton type="submit" size="xs" class="text-[#17283b]" color="neutral" label="Subscribe" />
                    </template>
                  </UInput>
                </UFormField>
              </form>
            </template>
          </UFooterColumns>
        </UContainer>
      </template>-->

      <template #left>
        <p class="text-(--ui-text-muted) text-sm">
          Copyright © {{ new Date().getFullYear() }} Right Brain Group LLC. All rights reserved.
        </p>
      </template>

      <template #right>
        <UButton to="https://facebook.com/Right-Brain-Group-LLC" icon="i-simple-icons-facebook" target="_blank" aria-label="Facebook" variant="ghost" color="neutral" />
        <UButton to="https://linkedin.com/in/Right-Brain-Group-LLC" icon="i-simple-icons-linkedin" target="_blank" aria-label="LinkedIn" variant="ghost" color="neutral" />
        <UButton to="https://instagram.com/Right-Brain-Group-LLC" icon="i-simple-icons-instagram" target="_blank" aria-label="Instagram" variant="ghost" color="neutral" />
        <UButton to="https://x.com/RightBrainGroup" icon="i-simple-icons-x" target="_blank" aria-label="X" variant="ghost" color="neutral" />
      </template>
    </UFooter>
  </footer>
</template>
