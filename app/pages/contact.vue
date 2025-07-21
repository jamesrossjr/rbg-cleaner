<script setup lang="ts">

const form = reactive({
  fullName: '',
  companyName: '',
  biggestChallenge: '',
  email: '',
  phone: '',
  companyWebsite: '',
  consent: false,
  honey: '',
  primaryGoal: '',
  decisionTimeline: '',
  budgetRange: '',
})

const isSubmitting = ref(false)
const attemptedSubmit = ref(false)
const startTime = ref(Date.now())

const toast = useToast()
const formSection = ref<HTMLElement | null>(null)

useSeoMeta({
  title: 'Discovery Call | Right Brain Group',
  description: 'Share your top business challenge and book a 30-minute Discovery Call with a Client Solution Advisor at Right Brain Group.',
  ogTitle: 'Discovery Call | Right Brain Group',
  ogDescription: 'Share your top business challenge and book a 30-minute Discovery Call with a Client Solution Advisor at Right Brain Group.',
  twitterCard : 'summary_large_image',
})



const submitForm = async () => {
  attemptedSubmit.value = true
  if (form.honey) {
    console.warn('Spam detected: Honeypot filled.')
    return
  }

  const timeElapsed = Date.now() - startTime.value
  if (timeElapsed < 3000) {
    console.warn('Spam detected: Submitted too quickly.')
    return
  }

  // Client-side Validation
  if (!form.fullName.trim() || !form.companyName.trim() || !form.biggestChallenge || !form.email.trim() || !form.companyWebsite.trim()) {
    toast.add({
      title: 'Missing Information',
      description: 'Please fill out all required fields before submitting.',
      icon: 'i-lucide-alert-triangle',
      duration: 5000,
      color: 'warning',
    })
    if (formSection.value) {
      formSection.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  if (form.consent !== true) {
    toast.add({
      title: 'Heads up!',
      description: 'You must consent to be contacted before submitting.',
      icon: 'i-lucide-alert-triangle',
      duration: 5000,
      color: 'warning',
    })
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
      headers: {
        'x-start-time': startTime.value.toString(),
      },
    })

    toast.add({
      title: 'Thank you!',
      description: 'We have received your message.',
      icon: 'i-lucide-check-circle',
      duration: 5000,
      color: 'primary',
    })

    Object.assign(form, {
      fullName: '',
      companyName: '',
      biggestChallenge: '',
      email: '',
      phone: '',
      companyWebsite: '',
      consent: false,
      honey: '',
      primaryGoal: '',
      decisionTimeline: '',
      budgetRange: '',
    })
    startTime.value = Date.now()
  } catch {
    toast.add({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      icon: 'i-lucide-x-circle',
      duration: 5000,
      color: 'error',
    })

    if (formSection.value) {
      formSection.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UContainer id="main" class="py-16 space-y-13">
    <!-- Hero -->
    <div
      v-motion
      class="text-center space-y-4"
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
    >
      <h1 class="text-4xl font-bold text-balance">Let's Address Your Biggest Challenge</h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        Share your top challenge and book a 30-minute Discovery Call with a Client Solution Advisor.
      </p>
    </div>

    <!-- Form -->
    <div
      v-motion
      class="max-w-xl mx-auto space-y-6"
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }"
    >
    <UForm 
      :state="form"
      class="space-y-4"
      @submit.prevent="submitForm"
    >
        <!-- Honeypot -->
        <div class="hidden">
          <input v-model="form.honey" autocomplete="off" tabindex="-1">
        </div>

        <!-- Basic Information Section -->
        <section class="py-4">
          <h2 class="text-xl font-semibold mb-4">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <UFormField label="Your Full Name" name="fullName" class="w-full">
              <UInput v-model="form.fullName" required aria-label="Full Name" class="w-full" />
            </UFormField>

            <!-- Company Name -->
            <UFormField label="Company or Organization Name" name="companyName" class="w-full">
              <UInput v-model="form.companyName" required aria-label="Company Name" class="w-full" />
            </UFormField>

            <!-- Company Website -->
            <UFormField label="Company Website" name="companyWebsite" class="w-full">
              <UInput v-model="form.companyWebsite" required aria-label="Company Website" class="w-full" />
            </UFormField>

            <!-- Email Address -->
            <UFormField label="Your Email Address" name="email" class="w-full">
              <UInput v-model="form.email" type="email" required aria-label="Email Address" class="w-full" />
            </UFormField>

            <!-- Phone Number -->
            <UFormField label="Your Phone Number" name="phone" class="w-full">
              <UInput v-model="form.phone" aria-label="Phone Number" class="w-full" />
            </UFormField>

          </div>
        </section>

        <hr class="my-8 border-gray-200 dark:border-gray-700">

        <!-- Business Challenges Section -->
        <section class="py-2 sm:py-4 space-y-8">
          <h2 class="text-xl font-semibold mb-4">Business Challenges</h2>

          <!-- Biggest Challenge -->
          <UFormField label="What's the biggest challenge your business is facing?" name="biggestChallenge" class="w-full mb-5 sm:mb-8">
            <USelectMenu
              v-model="form.biggestChallenge"
              value-key="value"
              label-key="label"
              :items="[
                { label: 'Weak or outdated website', value: 'Weak or outdated website' },
                { label: 'Unclear or inconsistent branding', value: 'Unclear or inconsistent branding' },
                { label: 'Inefficient systems or processes', value: 'Inefficient systems or processes' },
                { label: 'Slow growth or missed opportunities', value: 'Slow growth or missed opportunities' },
                { label: 'Projects falling behind or over budget', value: 'Projects falling behind or over budget' },
                { label: 'Other', value: 'Other' }
              ]"
              placeholder="Select a challenge"
              :ui="{ value: 'truncate w-full' }"
              class="w-full"
            />
          </UFormField>


          <!-- Primary Goal -->
          <UFormField label="What's your primary goal for this project?" name="primaryGoal" class="w-full mb-5 sm:mb-8">
            <USelectMenu
              v-model="form.primaryGoal"
              value-key="value"
              label-key="label"
              :items="[
                { label: 'Launch a new brand or business', value: 'Launch a new brand or business' },
                { label: 'Grow an existing business', value: 'Grow an existing business' },
                { label: 'Improve operations or efficiency', value: 'Improve operations or efficiency' },
                { label: 'Expand to a new market or audience', value: 'Expand to a new market or audience' },
                { label: 'Other', value: 'Other' }
              ]"
              placeholder="Select your primary goal"
              :ui="{ value: 'truncate w-full' }"
              class="w-full"
            />
          </UFormField>

          <!-- Decision Timeline -->
          <UFormField label="What's your ideal timeline for making a decision?" name="decisionTimeline" class="w-full mb-5 sm:mb-8">
            <USelectMenu
              v-model="form.decisionTimeline"
              value-key="value"
              label-key="label"
              :items="[
                { label: 'Immediately', value: 'Immediately' },
                { label: 'Within 30 days', value: 'Within 30 days' },
                { label: 'Within 60–90 days', value: 'Within 60–90 days' },
                { label: 'Longer than 90 days', value: 'Longer than 90 days' }
              ]"
              placeholder="Select your timeline"
              :ui="{ value: 'truncate w-full' }"
              class="w-full"
            />
          </UFormField>

          <!-- Budget Range -->
          <UFormField label="What's your estimated budget range for this project?" name="budgetRange" class="w-full mb-5 sm:mb-2">
            <div class="pb-5">

            <USelectMenu
              v-model="form.budgetRange"
              value-key="value"
              label-key="label"
              :items="[
                { label: 'Under $5,000', value: 'Under $5000' },
                { label: '$5,000–$15,000', value: '$5000–$15000' },
                { label: '$15,000–$30,000', value: '$15000–$30000' },
                { label: '$30,000+', value: '$30000+' }
              ]"
              placeholder="Select a budget range"
              :ui="{ value: 'truncate w-full' }"
              class="w-full"
            />
          </div>
          </UFormField>
        </section>

        <hr class="my-8 border-gray-200 dark:border-gray-700">

        <!-- Additional Information Section -->
        <section class="py-2 sm:py-4 space-y-8">
          <h2 class="text-xl font-semibold mb-4">Consent to be contacted</h2>


          <!-- Consent to Contact -->
          <UFormField name="consent">
            <template #default>
              <div class="mt-5 space-y-1">
                <div class="flex items-start space-x-2">
                  <UCheckbox
                    v-model="form.consent"
                    :true-value="true"
                    :false-value="false"
                    class="text-base font-semibold"
                    color="success"
                    variant="list"
                    required
                    label="I consent to be contacted and agree to the"
                  />
                  <div class="text-sm text-gray-700 hover:text-primary dark:text-gray-300">
                    <NuxtLink to="/privacy-policy" class="underline hover:text-primary">Privacy Policy</NuxtLink>
                    and
                    <NuxtLink to="/terms-of-service" class="underline hover:text-primary">Terms of Service</NuxtLink>.
                  </div>
                </div>
                <!-- Error display handled by UFormField via :error -->
              </div>
            </template>
          </UFormField>

          <!-- Submit Button -->
          <div class="flex justify-center pt-13">
            <UButton
              type="submit"
              :loading="isSubmitting"
              size="lg"
              variant="solid"
              color="primary"
              icon="i-lucide-arrow-right"
              aria-label="Submit Discovery Call Request"
              class="button-primary"
            >
              Request Meeting!
            </UButton>
          </div>
        </section>
      </UForm>
    </div>
  </UContainer>
</template>