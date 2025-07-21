// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 🌐 Modules
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    ['nuxt-schema-org', {
      host: 'https://rightbraingroup.com',
      defaultLanguage: 'en-US'
    }]
  ],

  css: ['@/assets/css/main.css'],
  
  runtimeConfig: {
    public: {
      NUXT_UI_PRO_LICENSE: process.env.NUXT_UI_PRO_LICENSE
    }
  },

  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE as string
  },

  // 🚦 Route Rules
  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false },
  },
  
  // 🚀 Build & Compatibility
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-07-11',
  experimental: {
    viewTransition: true
  },

  // ⚙️ Nitro Config (for prerendering + SSG optimization)
  nitro: {
    prerender: {
      routes: ['/', '/about', '/docs', '/contact', '/pricing', '/terms-of-service', '/blog'],
      crawlLinks: true,
      failOnError: false,
      ignore: [
        '/dashboard',
        '/dashboard/inbox',
        '/dashboard/settings',
        '/dashboard/settings/members',
        '/dashboard/customers',
        '/dashboard/settings/security',
        '/dashboard/settings/notifications'
      ]
    }
  },
  
  // Meta / Favicon etc for Devices (IOS & Android)
  app: {
    pageTransition: {
      name: 'page',
      mode: 'in-out'
    },
    head: {
      title: 'Right Brain Group',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Business systems for creative minds. Process, automation, and clarity for founders and teams.' },
        { name: 'theme-color', content: '#f9b712' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon-512x512.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Dark mode favicons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-dark-192x192.png', media: '(prefers-color-scheme: dark)' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon-dark-512x512.png', media: '(prefers-color-scheme: dark)' },

        // Safari pinned tab
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#f9b712' },

        // Apple Splash Screens
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-640x1136.png',
          media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-750x1334.png',
          media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1125x2436.png',
          media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1242x2688.png',
          media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-828x1792.png',
          media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1170x2532.png',
          media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1284x2778.png',
          media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-2048x2732.png',
          media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1668x2388.png',
          media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1536x2048.png',
          media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/splashscreens/splash-1290x2796.png?v=2',
          media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)'
        }
      ]
    }
  },

  typescript: {
    strict: false,
    shim: true,
  },

  colorMode: {
    preference: 'system', // Use system preference on first visit
    fallback: 'light', // Fallback to light mode if no system setting
    classSuffix: '' // Use 'dark' and 'light' classes with no suffix
  }
})