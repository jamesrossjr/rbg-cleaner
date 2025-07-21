<script setup lang="ts">
// Vue composition imports
import { onMounted, ref, computed } from 'vue'


// Icon options for each MAGIC category
const iconMap = {
  media: ['lucide:camera', 'lucide:mic', 'lucide:video', 'lucide:music', 'lucide:film'],
  alignment: ['lucide:users', 'lucide:map', 'lucide:compass', 'lucide:handshake', 'lucide:globe'],
  growth: ['lucide:trending-up', 'lucide:rocket', 'lucide:line-chart', 'lucide:bar-chart', 'lucide:leaf'],
  infrastructure: ['lucide:settings', 'lucide:server', 'lucide:layers', 'lucide:database', 'lucide:hard-drive'],
  care: ['lucide:heart', 'lucide:smile', 'lucide:hand-heart', 'lucide:flower', 'lucide:users']
}

// Category sequence for rotation
const categorySequence = ['media', 'alignment', 'growth', 'infrastructure', 'care']

// Background gradients by category
const gradientMap: Record<typeof categorySequence[number], string> = {
  media: 'from-purple-400 via-violet-300 to-indigo-400 dark:from-purple-700 dark:via-violet-600 dark:to-indigo-700',
  alignment: 'from-blue-300 via-sky-200 to-cyan-300 dark:from-blue-600 dark:via-sky-500 dark:to-cyan-600',
  growth: 'from-green-400 via-lime-300 to-green-300 dark:from-green-600 dark:via-lime-500 dark:to-green-500',
  infrastructure: 'from-yellow-300 via-orange-300 to-amber-300 dark:from-yellow-600 dark:via-orange-500 dark:to-amber-500',
  care: 'from-pink-300 via-rose-200 to-fuchsia-300 dark:from-pink-600 dark:via-rose-500 dark:to-fuchsia-600'
}

// Fetch homepage content for dynamic CTA endings
const { data } = await useAsyncData('homepage', () => queryContent('/0.index').findOne() as Promise<CTAContent | null>)

/**
 * Props for MagicCTA
 * @prop title - Optional CTA title
 * @prop buttonText - Optional button text
 * @prop buttonLink - Optional button destination
 * @prop magicCategory - Category for theming (hyphenated in templates)
 * @prop theme - Light or dark mode
 * @prop layout - Layout orientation
 * @prop rotate - Whether to rotate categories
 */
const props = defineProps<{
  title?: string
  buttonText?: string
  buttonLink?: string
  magicCategory?: 'media' | 'alignment' | 'growth' | 'infrastructure' | 'care'
  theme?: 'light' | 'dark'
  layout?: 'centered' | 'sidebar'
  rotate?: boolean
}>()

// Detect MAGIC category from current route
const route = useRoute()

const routeCategory = computed(() => {
  const segment = route.path.split('/')[1]?.toLowerCase()
  const validCategory = segment && ['media', 'alignment', 'growth', 'infrastructure', 'care'].includes(segment)
  return (validCategory ? segment : 'infrastructure') as keyof typeof iconMap
})

// Selected MAGIC category (from props or route)
const currentCategory = ref<'media' | 'alignment' | 'growth' | 'infrastructure' | 'care'>(
  props.magicCategory || routeCategory.value || 'infrastructure'
)

// CTA line ending based on selected category
const dynamicCTAEnding = computed(() => data.value?.cta?.dynamicEnding?.[currentCategory.value] || 'Modern Systems')

// Icon set based on current category
const icons = computed(() => {
  const category = currentCategory.value
  return typeof category === 'string' && category in iconMap ? iconMap[category as keyof typeof iconMap] : iconMap.infrastructure
})

// Style mappings for background and button
const sectionBgClass = computed(() => {
  return `bg-gradient-to-br ${gradientMap[currentCategory.value]}`
})

const buttonClass = computed(() => {
  return `bg-${currentCategory.value}-600`
})

// Dynamic button text
const dynamicButtonText = computed(() => 'Unlock Now')

// Category rotation handler
onMounted(() => {
  if (props.rotate) {
    let index = categorySequence.indexOf(currentCategory.value)
    if (index === -1) index = 0

    setInterval(() => {
      index = (index + 1) % categorySequence.length
      currentCategory.value = categorySequence[index] as 'media' | 'alignment' | 'growth' | 'infrastructure' | 'care'
    }, 8000)
  }
})

// Mock content API for dev usage
type CTAContent = {
  cta: {
    dynamicEnding: Record<'media' | 'alignment' | 'growth' | 'infrastructure' | 'care', string>
    description: string
  }
}

function queryContent(path: string) {
  const mockContentDatabase: Record<string, CTAContent> = {
    '/0.index': {
      cta: {
        dynamicEnding: {
          media: 'Creative Media',
          alignment: 'Team Alignment',
          growth: 'Business Growth',
          infrastructure: 'Efficient Systems',
          care: 'People First'
        },
        description: 'Unlock the potential of your business with our innovative solutions.'
      }
    }
  };

  return {
    findOne: () => Promise.resolve(mockContentDatabase[path] || null)
  };
}
</script>

<template>
  <!-- CTA Section with background and animated icons -->
  <div
:class="[
    'relative overflow-hidden min-h-[320px] transition-[background] duration-[4000ms] ease-in-out border-none rounded-none flex items-center justify-center bg-[length:400%_400%] animate-gradient-slow',
    sectionBgClass,
    'py-20'
  ]">
    <div class="absolute inset-0 bg-white/10" />
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10 animate-gradient-background blur-xl opacity-60 dark:opacity-40 pointer-events-none" />
    <TransitionGroup name="fade" tag="div" class="pointer-events-none absolute inset-0 opacity-20 will-change-transform transform-gpu">
      <UIcon
v-for="(icon, i) in icons" :key="icon" :name="icon" aria-hidden="true" :class="[
        i === 0 && 'absolute top-10 left-10 w-8 h-8 text-primary animate-float-slow',
        i === 1 && 'absolute bottom-14 left-1/4 w-6 h-6 text-secondary animate-float-fast',
        i === 2 && 'absolute top-1/2 right-12 w-10 h-10 text-primary animate-float-medium',
        i === 3 && 'absolute top-1/4 right-[20%] w-7 h-7 text-secondary animate-float-slow',
        i === 4 && 'absolute bottom-1/4 left-[20%] w-9 h-9 text-primary animate-float-medium'
      ]" />
    </TransitionGroup>

    <!-- Main content area with title and button -->
    <div class="relative z-10 container max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 text-center md:text-left">
      <div class="flex-1 w-full flex flex-col items-center md:items-start">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1em] drop-shadow-md">
          <span class="block">Unlock the</span>
          <AnimatedMagic :category="currentCategory" class="animated-magic-letter tracking-tight" />
          <span class="block">of {{ dynamicCTAEnding }}</span>
        </h2>
        <p v-if="data?.cta?.description" class="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-xl mx-auto md:mx-0">
          {{ data.cta.description }}
        </p>
      </div>
      <NuxtLink
        :to="buttonLink"
        :class="[
          buttonClass,
          'z-10 text-white font-bold px-6 py-2 rounded-full border-2 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70'
        ]"
      >
        {{ dynamicButtonText }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Floating animation */
@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0);
  }
}

.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float 4s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 2.5s ease-in-out infinite;
}

/* Pulse animation */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.98;
    transform: scale(1.01);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animated text shadow */
.animated-magic-letter {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-background {
  background-size: 200% 200%;
  animation: gradientBackground 12s ease infinite;
}
</style>