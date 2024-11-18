import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /bg-./,
    },
  ],
  theme: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',

      /* ---------- Custom theme colors----------- */ 
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      gray: {
        '50': '#f8fafc',
        '100': '#f1f5f9',
        '200': '#e2e8f0',
        '300': '#cbd5e1',
        '400': '#94a3b8',
        '500': '#64748b',
        '600': '#475569',
        '700': '#334155',
        '800': '#1e293b',
        '900': '#0f172a',
        '950': '#020617',
      },
      main: {
        pale: '#ebe1ff',
        light: '#c7abff',
        DEFAULT: '#7a37ff',
        dark: '#6428dd',
      },
      red: {
        pale: '#fff1f2',
        light: '#fda4af',
        DEFAULT: '#f43f5e',
        dark: '#e11d48',
      },
      blue: {
        pale: '#eff6ff',
        light: '#93c5fd',
        DEFAULT: '#3b82f6',
        dark: '#2563eb',
      },
      orange: {
        pale: '#fff7ed',
        light: '#fed7aa',
        DEFAULT: '#fb923c',
        dark: '#f97316',
      },
      green: {
        pale: '#f0fdf4',
        light: '#86efac',
        DEFAULT: '#16a34a',
        dark: '#15803d',
      },
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleUp: {
          '0%': { 
            transform: 'scale(.8) translateY(1000px)',
            opacity: '0',
          },
          '100%': { 
            transform: 'scale(1) translateY(0px)',
            opacity: '1',
          },
        },
        scaleDown: {
          '0%': {
            transform: 'scale(1) translateY(0px)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(.8) translateY(1000px)',
            opacity: '0',
          },
        },
        slideOutUp: {
          '0%': { 
            transform: 'translateY(0%)',
          },
          '100%': { 
            transform: 'translateY(-100%)',
          },
        },
        slideInDown: {
          '0%': { 
            transform: 'translateY(-100%)',
          },
          '100%': { 
            transform: 'translateY(0%)',
          },
        },
        slideOutLeft: {
          '0%': { 
            transform: 'translateX(0%)',
          },
          '100%': { 
            transform: 'translateX(-100%)',
          },
        },
        slideInRight: {
          '0%': { 
            transform: 'translateX(-100%)',
          },
          '100%': { 
            transform: 'translateX(0%)',
          },
        },
        slideOutRight: {
          '0%': { 
            transform: 'translateX(0%)',
          },
          '100%': { 
            transform: 'translateX(100%)',
          },
        },
        slideInLeft: {
          '0%': { 
            transform: 'translateX(100%)',
          },
          '100%': { 
            transform: 'translateX(0%)',
          },
        },
        moveUpFromBottom: {
          '0%': { 
            transform: 'translateY(-8px)',
          },
          '100%': { 
            transform: 'translateY(0)',
          },
        },
        moveDownToBottom: {
          '0%': { 
            transform: 'translateY(0)',
          },
          '100%': { 
            transform: 'translateY(-8px)',
          },
        },
        moveDownFromTop: {
          '0%': { 
            transform: 'translateY(8px)',
          },
          '100%': { 
            transform: 'translateY(0)',
          },
        },
        moveUpToTop: {
          '0%': { 
            transform: 'translateY(0)',
          },
          '100%': { 
            transform: 'translateY(8px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%':{
            backgroundPosition: '1000px 0',
          },
        },
        fullView: {
          '100%': {
            width: '100%',
          }
        },
      },
      animation: {
        'fade-in': 'fadeIn .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'fade-out': 'fadeOut .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'scale-up': 'scaleUp .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'scale-down': 'scaleDown .3s forwards',
        'slide-out-up': 'slideOutUp .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'slide-in-down': 'slideInDown .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'slide-out-left': 'slideOutLeft .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'slide-in-right': 'slideInRight .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'slide-out-right': 'slideOutRight .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'slide-in-left': 'slideInLeft .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'move-up-from-bottom': 'moveUpFromBottom .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'move-down-to-bottom': 'moveDownToBottom .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'move-down-from-top': 'moveDownFromTop .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'move-up-to-top': 'moveUpToTop .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        'shimmer': 'shimmer 3s infinite',
      },
    },
  },
  plugins: [],
};
export default config;

export type Colors = 
  'white' | 
  'black' | 
  'transparent' |
  'main' | 
  'main-pale' | 
  'main-light' | 
  'main-dark' | 
  'gray-50'| 
  'gray-100'| 
  'gray-200'| 
  'gray-300'|
  'gray-400' | 
  'gray-500'| 
  'gray-600'| 
  'gray-700'| 
  'gray-800'| 
  'gray-900'| 
  'gray-950' | 
  'red' | 
  'red-pale' | 
  'red-light' | 
  'red-dark' | 
  'orange' | 
  'orange-pale' | 
  'orange-light' | 
  'orange-dark' | 
  'blue' | 
  'blue-pale' | 
  'blue-light' | 
  'blue-dark' |
  'green' | 
  'green-pale' | 
  'green-light' | 
  'green-dark';
