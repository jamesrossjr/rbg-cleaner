<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'About - Right Brain Group',
  description: 'Learn about the mission, vision, and team behind Right Brain Group. Discover how we combine creativity and systems thinking to build future-ready solutions.',
})

// Floating science icons management
const floatingContainer = ref<HTMLElement>()

onMounted(() => {
  createFloatingIcons()
})

const createFloatingIcons = () => {
  if (!floatingContainer.value) return

  const icons = ['🧬', '⚛️', '🔬', '🧪', '🔭', '⚙️', '🧠', '🚀', '🔌', '🛰️', '⚗️', '💡', '💻', '🤖', '🪐']
  const colors = [
    'text-blue-400/30 dark:text-blue-300/40',
    'text-purple-400/30 dark:text-purple-300/40', 
    'text-indigo-400/30 dark:text-indigo-300/40',
    'text-green-400/30 dark:text-green-300/40',
    'text-red-400/30 dark:text-red-300/40',
    'text-yellow-400/30 dark:text-yellow-300/40',
    'text-pink-400/30 dark:text-pink-300/40',
    'text-cyan-400/30 dark:text-cyan-300/40',
    'text-orange-400/30 dark:text-orange-300/40'
  ]

  // Clear existing icons
  floatingContainer.value.innerHTML = ''

  icons.forEach((icon, index) => {
    const iconElement = document.createElement('div')
    iconElement.innerHTML = icon
    iconElement.className = `absolute pointer-events-none ${colors[index % colors.length]} text-2xl z-0`
    
    // Distribute icons randomly across the entire viewport with some padding
    const padding = 100
    const startX = padding + Math.random() * (window.innerWidth - padding * 2)
    const startY = padding + Math.random() * (window.innerHeight - padding * 2)
    
    iconElement.style.left = `${startX}px`
    iconElement.style.top = `${startY}px`
    iconElement.style.transform = 'translate(-50%, -50%)'
    iconElement.style.opacity = '0'
    
    floatingContainer.value.appendChild(iconElement)
    
    // Fade in the icon with a delay
    setTimeout(() => {
      iconElement.style.transition = 'opacity 0.5s ease-in-out'
      iconElement.style.opacity = '1'
    }, index * 200)
    
    // Animate the icon after fade in
    setTimeout(() => {
      animateIcon(iconElement, index)
    }, (index * 200) + 500)
  })
}

const animateIcon = (element: HTMLElement, index: number) => {
  const duration = 20000 + (index * 2000) // 20-50 seconds
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % duration) / duration
    
    // Different movement patterns
    let x, y, rotation
    
    switch (index % 5) {
      case 0: // Horizontal float
        x = progress * (window.innerWidth + 100) - 50
        y = 100 + Math.sin(progress * Math.PI * 4) * 50
        rotation = progress * 360
        break
      case 1: // Diagonal movement
        x = progress * (window.innerWidth + 100) - 50
        y = progress * (window.innerHeight + 100) - 50
        rotation = progress * 720
        break
      case 2: // Vertical bounce
        x = (window.innerWidth * 0.2) + (index * 60)
        y = progress * (window.innerHeight + 100) - 50
        rotation = Math.sin(progress * Math.PI * 6) * 30
        break
      case 3: { // Circular motion
        const centerX = window.innerWidth * 0.7
        const centerY = window.innerHeight * 0.5
        const radius = 80 + (index * 10)
        x = centerX + Math.cos(progress * Math.PI * 4) * radius
        y = centerY + Math.sin(progress * Math.PI * 4) * radius
        rotation = progress * 360
        break
      }
      default: // Wave pattern
        x = progress * (window.innerWidth + 100) - 50
        y = (window.innerHeight * 0.6) + Math.sin(progress * Math.PI * 8) * 100
        rotation = progress * 180
        break
    }
    
    element.style.left = `${x}px`
    element.style.top = `${y}px`
    element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`
    
    requestAnimationFrame(animate)
  }
  
  // Start with random delay
  setTimeout(() => animate(), index * 1000)
}

// Team member data
const teamMembers = [
  {
    name: 'Lee Kancher',
    role: 'Founder & Creative Director',
    bio: 'Lee started Right Brain Group after years of consulting across industries where he saw the same pattern: good ideas were getting lost in bad systems. He wanted to build a studio where strategy and empathy could work side by side — a place where design isn\'t just how something looks, but how it works for the people who use it.',
    image: '/images/lee-kancher.webp',
    links: [
      { icon: 'i-lucide-linkedin', to: '#', label: 'LinkedIn' },
      { icon: 'i-lucide-twitter', to: '#', label: 'Twitter' },
      { icon: 'i-lucide-mail', to: '/contact', label: 'Contact' }
    ]
  },
  {
    name: 'Sean Moran',
    role: 'Technical Director',
    bio: 'Sean brings deep technical expertise and innovative problem-solving to every project. With a passion for clean code and scalable architecture, he ensures our solutions are not only creative but also robust and future-ready.',
    image: '/images/avatars/male-avatar-2.svg',
    links: [
      { icon: 'i-lucide-linkedin', to: '#', label: 'LinkedIn' },
      { icon: 'i-lucide-github', to: '#', label: 'GitHub' },
      { icon: 'i-lucide-mail', to: '/contact', label: 'Contact' }
    ]
  },
  {
    name: 'James Ross',
    role: 'Chief Financial Officer',
    bio: 'James oversees financial strategy and operations, ensuring sustainable growth while maintaining our commitment to quality and innovation. His strategic insight helps guide business decisions that support both our team and our clients.',
    image: '/images/avatars/male-avatar-1.svg',
    links: [
      { icon: 'i-lucide-linkedin', to: '#', label: 'LinkedIn' },
      { icon: 'i-lucide-calculator', to: '#', label: 'Finance' },
      { icon: 'i-lucide-mail', to: '/contact', label: 'Contact' }
    ]
  }
]

// FAQ data
const faqs = [
  {
    label: 'What makes Right Brain Group different from other agencies?',
    icon: 'i-lucide-circle-help',
    content: 'We\'re more than a creative agency—we\'re your business systems partner. By blending strategy, automation, design, and technology, we build holistic, scalable solutions that support every stage of your growth. Our approach is deeply human and data-informed.'
  },
  {
    label: 'How do you approach new projects?',
    icon: 'i-lucide-circle-help',
    content: 'Every project begins with understanding your biggest challenges and goals. We start with discovery to map your current systems, then design and implement solutions that reduce friction, improve efficiency, and align with your business objectives.'
  },
  {
    label: 'What industries do you work with?',
    icon: 'i-lucide-circle-help',
    content: 'We work best with service-based, growth-minded businesses—coaches, consultants, agencies, startups, and teams looking to scale sustainably with smarter systems. Our solutions are adaptable across various industries.'
  },
  {
    label: 'Do you provide ongoing support after project completion?',
    icon: 'i-lucide-circle-help',
    content: 'Absolutely. We don\'t disappear post-launch. We offer continued optimization, training, and support to ensure your systems evolve as your business grows. Think of us as your long-term systems partner.'
  },
  {
    label: 'What tools and platforms do you typically use?',
    icon: 'i-lucide-circle-help',
    content: 'We\'re tool-agnostic but experts in Notion, Make, AI workflows, and modern development stacks. We centralize operations in systems that are intuitive, powerful, and tailored to your unique business needs.'
  },
  {
    label: 'How long do projects typically take?',
    icon: 'i-lucide-circle-help',
    content: 'Timelines vary by scope. A targeted automation or Notion build might take 2–4 weeks. Full digital systems or rebrands typically take 6–12+ weeks. We work in agile sprints to stay efficient and transparent throughout the process.'
  },
  {
    label: 'Can you help with both strategy and implementation?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! We handle everything from initial strategy and planning to full implementation and optimization. Whether you need help defining your approach or executing an existing plan, we can support you at any stage.'
  },
  {
    label: 'What if I\'m not very technical?',
    icon: 'i-lucide-circle-help',
    content: 'Perfect! Our solutions are designed to be user-friendly and come with full documentation and training. Whether you\'re new to tools like Notion or already using them, we meet you where you are and scale with you.'
  }
]

// Company values
const values = [
  {
    title: 'Human-Centered Design',
    description: 'Every system we build starts with the question: "How can we make this more human?" We focus on clarity, usefulness, and beauty.',
    icon: 'i-lucide-heart'
  },
  {
    title: 'Systems Thinking',
    description: 'We believe technology should reduce complexity, not create it. Every solution is designed to empower its users and create meaningful interactions.',
    icon: 'i-lucide-brain-cog'
  },
  {
    title: 'Sustainable Growth',
    description: 'Our approach emphasizes sustainability, purpose, and scalable solutions that grow with your business over time.',
    icon: 'i-lucide-trending-up'
  },
  {
    title: 'Strategic Innovation',
    description: 'We merge creative intuition with intelligent systems design to bridge the gap between inspired ideas and scalable action.',
    icon: 'i-lucide-lightbulb'
  }
]

// Key capabilities
const capabilities = [
  'Business Process Optimization',
  'AI-Powered Workspaces',
  'SaaS UX Design', 
  'Strategic Branding',
  'Custom Applications',
  'Workflow Automation',
  'Digital Transformation',
  'Systems Integration'
]

// Selected testimonials for about page
const selectedTestimonials = [
  {
    quote: "Right Brain saw my vision for my site from day one and made it come to fruition. I love my finished product & I highly recommend RBG!",
    author: "Amanda Yoa",
    company: "Simply Aligned LLC",
    avatar: "/images/avatars/female-avatar-1.svg"
  },
  {
    quote: "Lee and his team not only designed my company's logo (nailed it!!!) but has also helped several of my clients express their unique value proposition. Creative and insightful. They 'get it'.",
    author: "Ed Doherty", 
    company: "One Degree Coaching",
    avatar: "/images/avatars/male-avatar-3.svg"
  },
  {
    quote: "Mind-blowing creativity combined with artistic ability took our ideas to a level that exceeded our expectations.",
    author: "Jeremy & Diana Kalen",
    company: "Center For Healing & Transformation", 
    avatar: "/images/avatars/male-avatar-3.svg"
  }
]
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Floating Science Icons Background -->
    <div ref="floatingContainer" class="fixed inset-0 pointer-events-none z-0" />
    <!-- Hero Section -->
    <UPageHero
      class="relative z-10"
      description="A human-centered studio blending creativity with technology to build future-ready systems, brands, and platforms. We help organizations evolve with intention, resilience, and humanity."
    >
      <template #title>
        <div class="flex flex-col items-center justify-center">
          <NuxtImg
            src="/images/dr-brain.webp"
            alt="Right Brain Group - Creative and analytical collaboration"
            width="260"
            height="260"
            class="mx-auto mb-6"
            style="max-width: 260px"
            format="webp"
            loading="lazy"
          />
          <span class="text-center">
            About Right Brain Group
          </span>
        </div>
      </template>

      <template #links>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton 
            to="/contact" 
            size="xl" 
            icon="i-lucide-arrow-right" 
            trailing
          >
            Get Started
          </UButton>
          <UButton 
            to="/work" 
            size="xl" 
            variant="subtle" 
            color="neutral"
          >
            View Our Work
          </UButton>
        </div>
      </template>
    </UPageHero>

    <!-- Mission & Philosophy Section -->
    <UPageSection 
      title="Our Mission & Philosophy" 
      description="We exist to help companies and creators bridge the gap between inspired ideas and scalable action."
      class="relative z-10"
    >
      <div class="grid gap-8 lg:grid-cols-2">
        <UCard class="p-8">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <UIcon name="i-lucide-target" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-xl font-semibold">Our Mission</h3>
            </div>
          </template>
          
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            At Right Brain Group, our mission is to merge creative intuition with intelligent systems design. We believe that sustainable growth stems from empathy, clarity, and strategic innovation. Whether we're guiding leadership teams through complex transformations or crafting simple, elegant user experiences, we lead with insight and deliver with precision.
          </p>
        </UCard>

        <UCard class="p-8">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <UIcon name="i-lucide-compass" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-xl font-semibold">Our Philosophy</h3>
            </div>
          </template>
          
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our work begins with a question: "How can we make this more human?" We focus on clarity, usefulness, and beauty. We believe technology should reduce complexity, not create it — and every system should empower its users. Rooted in systems thinking and design psychology, our philosophy emphasizes sustainability, purpose, and meaningful interaction.
          </p>
        </UCard>
      </div>
    </UPageSection>

    <!-- Values Section -->
    <UPageSection 
      title="Our Core Values" 
      description="These principles guide everything we do, from strategy to execution."
      class="relative z-10"
    >
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="value in values" :key="value.title" class="text-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
            <UIcon :name="value.icon" class="h-8 w-8 text-primary" />
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ value.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </UPageSection>

    <!-- Team Section -->
    <UPageSection 
      title="Meet the Team" 
      description="The passionate individuals behind Right Brain Group, each bringing unique expertise to help transform your business."
      class="relative z-10"
    >
      <div class="grid gap-12 lg:gap-16">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="member.name"
          class="max-w-4xl mx-auto"
        >
          <div 
            class="grid gap-8 lg:gap-12 items-center"
            :class="index % 2 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-5'"
          >
            <div 
              :class="index % 2 === 0 ? 'lg:col-span-2' : 'lg:col-span-2 lg:order-2'"
            >
              <div class="relative">
                <div class="aspect-square rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800">
                  <NuxtImg
                    :src="member.image"
                    :alt="member.name"
                    width="400"
                    height="400"
                    class="w-full h-full object-cover"
                    format="webp"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            
            <div 
              :class="index % 2 === 0 ? 'lg:col-span-3' : 'lg:col-span-3 lg:order-1'"
            >
              <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ member.name }}</h3>
                <p class="text-lg text-primary font-medium mb-4">{{ member.role }}</p>
                <blockquote class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-4 border-primary/20 pl-6">
                  "{{ member.bio }}"
                </blockquote>
              </div>
              
              <div class="flex gap-4">
                <UButton
                  v-for="link in member.links"
                  :key="link.label"
                  :icon="link.icon"
                  :to="link.to"
                  variant="subtle"
                  color="neutral"
                  size="sm"
                >
                  {{ link.label }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- Capabilities Section -->
    <UPageSection 
      title="What We Do" 
      description="We offer a suite of services that bring structure to creativity, combining strategic clarity with smart execution."
      class="relative z-10"
    >
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <div
          v-for="capability in capabilities"
          :key="capability"
          class="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
        >
          <UIcon name="i-lucide-check-circle" class="h-5 w-5 text-primary flex-shrink-0" />
          <span class="font-medium text-sm">{{ capability }}</span>
        </div>
      </div>

      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          From streamlining complex workflows to launching intuitive web platforms, our approach is deeply human and data-informed. Each service offering is designed to unlock your team's potential by reducing friction and enabling alignment between business goals and user needs.
        </p>
        
        <UButton to="/contact" size="xl" icon="i-lucide-arrow-right" trailing>
          Discuss Your Project
        </UButton>
      </div>
    </UPageSection>

    <!-- Testimonials Section -->
    <UPageSection 
      title="Trusted by Leaders" 
      description="See what our clients have to say about working with Right Brain Group."
      class="relative z-10"
    >
      <div class="grid gap-8 lg:grid-cols-3">
        <UCard v-for="testimonial in selectedTestimonials" :key="testimonial.author" class="p-6">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.author"
                width="48"
                height="48"
                class="w-12 h-12 rounded-full"
                loading="lazy"
              />
            </div>
            <div>
              <blockquote class="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                "{{ testimonial.quote }}"
              </blockquote>
              <div>
                <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ testimonial.author }}</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs">{{ testimonial.company }}</div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- FAQ Section -->
    <UPageSection 
      title="Frequently Asked Questions" 
      description="Common questions about working with Right Brain Group and our approach to business transformation."
      class="relative z-10"
    >
      <UPageAccordion
        :items="faqs"
        multiple
        class="max-w-4xl mx-auto"
      />
    </UPageSection>

    <!-- CTA Section -->
    <UPageSection class="relative z-10">
      <div class="text-center space-y-6">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Ready to Transform Your Business?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Let's work together to build systems that scale, brands that resonate, and experiences that delight.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton to="/contact" size="xl">
            Start Your Project
          </UButton>
          <UButton to="/work" variant="subtle" color="neutral" size="xl">
            View Our Work
          </UButton>
        </div>
      </div>
    </UPageSection>
  </div>
</template>

