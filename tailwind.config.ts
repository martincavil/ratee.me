import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#F5F3F0',
        'bg-secondary': '#FAFAF8',

        // Text colors
        content: {
          primary: '#1D1D1E',
          secondary: '#666666',
          tertiary: '#999999',
        },

        // Accent (Emerald Green)
        accent: {
          50: '#F0FDFA',
          100: '#D1F5E8',
          200: '#A2E8D5',
          300: '#6EDCC6',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022c1d',
          DEFAULT: '#10B981',
          light: '#D1F5E8',
          dark: '#047857',
        },

        // Keep existing semantic colors but update primary
        primary: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },

        // Borders
        border: '#E5E7EB',

        // Functional colors
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
        },
      },

      fontFamily: {
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
