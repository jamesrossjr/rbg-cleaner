<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'About - Right Brain Group',
  description: 'Learn about the mission, vision, and team behind Right Brain Group. Discover how we combine creativity and systems thinking to build future-ready solutions.',
})
</script>

<template>
  <UPage class="max-w-7xl mx-auto p-8">
    <UPageHeader
      title="About Right Brain Group"
      description="A human-centered studio blending creativity with technology to build future-ready systems, brands, and platforms."
    />

    <div class="my-10 rounded-lg overflow-hidden shadow-md ring-1 ring-gray-200 dark:ring-gray-800">
      <ImagePlaceholder
        alt="Creative and analytical collaboration"
        format="webp"
      />
    </div>

    <UPageBody>
      <UContainer class="!px-0">
        <section class="space-y-8">
        <!-- Mission Statement -->
        <UCard class="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4">
          <template #header>
            <h2 class="text-xl font-semibold">Our Mission</h2>
          </template>
          <p>
            At Right Brain Group, our mission is to merge creative intuition with intelligent systems design. We believe that sustainable growth stems from empathy, clarity, and strategic innovation. Our studio exists to help companies and creators bridge the gap between inspired ideas and scalable action. Whether we're guiding leadership teams through complex transformations or crafting simple, elegant user experiences, we lead with insight and deliver with precision. In a world shaped by change, we help organizations evolve with intention, resilience, and humanity.
          </p>
        </UCard>

        <!-- Capabilities Overview -->
        <UCard class="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4">
          <template #header>
            <h2 class="text-xl font-semibold">What We Do</h2>
          </template>
          <p>
            We offer a suite of services that bring structure to creativity, combining strategic clarity with smart execution. From streamlining complex workflows to launching intuitive web platforms, our approach is deeply human and data-informed. Each service offering is designed to unlock your team’s potential by reducing friction and enabling alignment between business goals and user needs.
          </p>
          <ul class="list-disc list-inside space-y-2 mt-2">
            <li><strong>Business Process Optimization</strong> — Streamline operations for clarity and scale.</li>
            <li><strong>AI-Powered Workspaces</strong> — Use Notion and automation tools to create intelligent systems.</li>
            <li><strong>SaaS UX Design</strong> — Build customer-facing platforms that feel as good as they work.</li>
            <li><strong>Strategic Branding</strong> — Clarify your voice and communicate with impact.</li>
            <li><strong>Custom Applications</strong> — Develop tailored software to power your vision.</li>
          </ul>
        </UCard>

        <!-- Philosophy -->
        <UCard class="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4">
          <template #header>
            <h2 class="text-xl font-semibold">Our Philosophy</h2>
          </template>
          <p>
            Our work begins with a question: “How can we make this more human?” Whether we’re building a digital product or designing a decision-making framework, we focus on clarity, usefulness, and beauty. We believe technology should reduce complexity, not create it — and every system should empower its users. Rooted in systems thinking and design psychology, our philosophy emphasizes sustainability, purpose, and meaningful interaction.
          </p>
        </UCard>

        <!-- Leadership Note -->
        <UCard class="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4">
          <template #header>
            <h2 class="text-xl font-semibold">A Note from Our Founder</h2>
          </template>
          <p>
            “I started Right Brain Group after years of consulting across industries where I saw the same pattern: good ideas were getting lost in bad systems. I wanted to build a studio where strategy and empathy could work side by side — a place where design isn’t just how something looks, but how it works for the people who use it. We’re not just building tools — we’re helping people lead better, think clearer, and act with intention.”
          </p>
        </UCard>

        <!-- Call to Action -->
        <UCard class="bg-primary text-white text-center py-10 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Let’s Build the Future of Work — Together</h2>
          <UButton to="/contact" size="xl" class="text-light" variant="soft">
            Connect with Our Team
          </UButton>
        </UCard>
        </section>
      </UContainer>
    </UPageBody>
  </UPage>
</template>