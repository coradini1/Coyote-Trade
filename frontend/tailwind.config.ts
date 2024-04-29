import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    
    extend: {
      colors: {
        lavender: {
          DEFAULT: "hsl(231, 97%, 72%)",
          50: 'hsl(220, 100%, 96%)',
          100: 'hsl(223, 100%, 94%)',
          200: 'hsl(224, 100%, 89%)',
          300: 'hsl(225, 100%, 82%)',
          400: 'hsl(231, 97%, 72%)',
          500: 'hsl(235, 91%, 67%)',
          600: 'hsl(240, 82%, 59%)',
          700: 'hsl(241, 63%, 51%)',
          800: 'hsl(240, 59%, 41%)',
          900: 'hsl(239, 52%, 34%)',
          950: 'hsl(240, 51%, 20%)',
        },
        text: {
          DEFAULT: "hsl(234, 16%, 35%)",
          50: 'hsl(225, 25%, 97%)',
          100: 'hsl(220, 24%, 93%)',
          200: 'hsl(220, 23%, 87%)',
          300: 'hsl(222, 24%, 78%)',
          400: 'hsl(223, 23%, 68%)',
          500: 'hsl(226, 23%, 60%)',
          600: 'hsl(230, 21%, 53%)',
          700: 'hsl(234, 19%, 48%)',
          800: 'hsl(235, 18%, 40%)',
          900: 'hsl(234, 16%, 35%)',
          950: 'hsl(236, 14%, 21%)',
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        textBase: "hsl(var(--text-base))",
        base: "hsl(var(--base))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
