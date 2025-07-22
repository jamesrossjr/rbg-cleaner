export default defineAppConfig({
  prefetchLinks: false,
  ui: {
    // @ts-expect-error - CSS variables are supported in Nuxt UI Pro
    css: {
      variables: {
        '--ui-text-dimmed': '#666666'
      }
    },
    strategy: 'class',           // 🌙 Enable dark mode via class strategy
    primary: 'primary',          // 🎨 Nuxt UI Pro: use our custom primary color
    gray: 'gray',               // 🪨 Use Tailwind’s stone scale for neutral grays
    components: {
      UPageSection: {
        defaultProps: {
          ui: {
            container: 'px-5 sm:px-8 lg:px-13 py-6 sm:py-10 lg:py-12'
          }
        }
      },
      UCard: {
        defaultProps: {
          ui: {
            body: 'card-surface p-6 flex flex-col gap-4'
          }
        }
      }
    },

    tokens: {
      // 🎨 Colors
      colors: {
        primary: {                // Primary Color Palette
          50:  '#fffdf2',
          100: '#fff7cc',
          200: '#ffef99',
          300: '#ffe566',
          400: '#fbd62d',
          500: '#fdb814',        // Base
          600: '#d6a20f',
          700: '#a2780b',
          800: '#6d4e07',
          900: '#3a2b03'
        },
        secondary: {              // Secondary Color Palette
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#17283b',        // Base
          600: '#0e1a2a',
          700: '#0b1a25',
          800: '#091620',
          900: '#060f1a'
        },
        gray: {
          50:  '#f9f9f9',
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
          950: '#101010'
        },
        text: {
          base: 'var(--color-foreground)',
          highlighted: 'var(--color-foreground)',
          dimmed: 'var(--color-foreground)'
        },
      },

      // 🖋️ Fonts
      font: {
        sans:    'Prenton, sans-serif',
        display: 'Prenton, sans-serif',
        body:    'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
      },

      // 🟦 Radius
      radius: {
        sm:    '0.25rem',
        md:    '0.375rem',
        lg:    '0.5rem',
        xl:    '0.75rem',
        '2xl': '1rem',
        full:  '9999px'
      }
    }
  },
  uiPro: {
    contentSearch: {
      // @ts-expect-error - Modal configuration is supported in Nuxt UI Pro
      modal: {
        class: 'text-primary sm:max-w-3xl sm:h-[28rem]'
      },
      input: {
        class: 'text-primary focus-within:ring-primary focus-within:border-primary'      
      }
    }
  }
}) 
