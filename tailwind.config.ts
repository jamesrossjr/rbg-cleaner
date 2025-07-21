/**
 * Tailwind Configuration for RBG Nuxt SaaS
 * - Aligned with Nuxt UI Pro structure
 * - Custom properties sourced from main.css via :root
 * - Theme tokens map to app.config.ts for full design system integration
 */

import type { Config } from 'tailwindcss'

const _config: Config = {
  darkMode: 'class',
  content: {
    files: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      './content/**/*.{md,json,yml,yaml}'
    ]
  },
  // @ts-expect-error - safelist is supported by Nuxt Tailwind module but not in base Tailwind Config type
  // 🛡️ Safelist for dynamic or CMS-driven classes to prevent purge issues
  safelist: [
    'bg-secondary',
    'bg-secondary-500',
    'bg-accent',
    'hover:bg-primary-600',
    'hover:bg-secondary-600',
    'hover:bg-accent',
    'text-secondary',
    'text-accent',
    'dark:bg-secondary',
    'dark:text-secondary',
    'dark:text-accent',
    'animated-border',
    'bg-[--star-color]',
    'text-green-700', 'dark:text-green-300',
    'text-blue-700', 'dark:text-blue-300',
    'text-yellow-700', 'dark:text-yellow-300',
    'text-purple-700', 'dark:text-purple-300',
    'text-pink-700', 'dark:text-pink-300',
    {
      pattern: /^(?:bg|text)-gray-(?:50|100|200|300|400|500|600|700|800|850|900|950)$/,
      variants: ['dark']
    },
    {
      pattern: /^(?:bg|text)-primary(?:-(?:50|100|200|300|400|500|600|700|800|900))?$/,
      variants: ['dark']
    }
  ],
  theme: {
    extend: {
      
      // 🎨 Custom brand colors (used throughout app & buttons)
      colors: {
        primary: {
          50: '#fffdf2',
          100: '#fff7cc',
          200: '#ffef99',
          300: '#ffe566',
          400: '#fbd62d',
          500: '#fdb814',
          600: '#d6a20f',
          700: '#a2780b',
          800: '#6d4e07',
          900: '#3a2b03',
        },
        accent: {
          DEFAULT: '#fc7032',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        foreground: 'var(--color-foreground)',
        background: 'var(--color-background)',
        gray: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#999999',
          500: '#8a8a8a',
          600: '#666666',
          700: '#444444',
          800: '#2a2a2a',
          850: '#1c1c1c',
          900: '#161616',
          950: '#101010',
        },
        'text-dimmed': 'var(--ui-text-dimmed)'
      },
      // 📐 Design system radius tokens synced from main.css
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)'
      },
      // 📏 Spacing scale synced from main.css
      spacing: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        5: 'var(--spacing-5)',
        8: 'var(--spacing-8)',
        13: 'var(--spacing-13)',
        21: '5.25rem',
        34: '8.5rem',
        55: '13.75rem',
        89: '22.25rem'
      },
      // 🔤 Font families (fallback-safe)
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        prenton: ['Prenton', 'sans-serif']
      },
      // 🎞️ Custom keyframe animations (for gradients)
      keyframes: {
        'gradient-slow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        border: {
          to: {
            '--border-angle': '360deg',
          },
        }
      },
      // 🚀 Animation utilities
      animation: {
        'gradient-slow': 'gradient-slow 30s ease infinite',
        'border': 'border 6s linear infinite',
      },
      // 📐 Background utilities for animated gradients
      backgroundSize: {
        '200': '200% 200%',
        '400': '400% 400%',
      },
      backgroundPosition: {
        '25-50': '25% 50%'
      },
      
    }
  },

  plugins: [],
} satisfies Config as typeof _config
export default _config