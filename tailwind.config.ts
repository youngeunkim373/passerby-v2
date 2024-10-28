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
    },
    extend: {}
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
  'blue-dark';
