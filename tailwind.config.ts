import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        brand: {
          "25": "hsl(var(--brand-25))",
          "50": "hsl(var(--brand-50))",
          "100": "hsl(var(--brand-100))",
          "200": "hsl(var(--brand-200))",
          "300": "hsl(var(--brand-300))",
          "400": "hsl(var(--brand-400))",
          "500": "hsl(var(--brand-500))",
          "600": "hsl(var(--brand-600))",
          "700": "hsl(var(--brand-700))",
          "800": "hsl(var(--brand-800))",
          "900": "hsl(var(--brand-900))",
          "950": "hsl(var(--brand-950))",
        },
        discord: {
          "brand-color": "hsl(var(--discord-brand-color))",
          background: "hsl(var(--discord-background))",
          gray: "hsl(var(--discord-gray))",
          text: "hsl(var(--discord-text))",
          timestamp: "hsl(var(--discord-timestamp))",
          "secondary-color": "hsl(var(--discord-secondary-color))",
          "green-color": "hsl(var(--discord-green-color))",
          "third-color": "hsl(var(--discord-third-color))",
          "fourth-color": "hsl(var(--discord-fourth-color))",
          "fifth-color": "hsl(var(--discord-fifth-color))",
          "sixth-color": "hsl(var(--discord-sixth-color))",
          "seventh-color": "hsl(var(--discord-seventh-color))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config

// #F8F9FD => hsl(228, 46%, 98%)
// #F0F4FA => hsl(220, 44%, 96%)
// #E1E9F6 => hsl(218, 50%, 93%)
// #C3D3ED => hsl(215, 54%, 84%)
// #A5BDE4 => hsl(213, 56%, 75%)
// #87A7DB => hsl(211, 57%, 66%)
// #6991D2 => hsl(210, 58%, 61%)
// #4B76C9 => hsl(209, 59%, 58%)
// #3659B1 => hsl(226, 55%, 44%)
// #284189 => hsl(226, 55%, 35%)
// #1B2A61 => hsl(226, 55%, 25%)
// #111A3E => hsl(226, 55%, 16%)
