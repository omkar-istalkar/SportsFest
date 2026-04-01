/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ REQUIRED for your toggle

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // 🔥 EXISTING (kept as it is)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",

        glass: "hsl(var(--glass))",
        "glass-border": "hsl(var(--glass-border))",

        // 🚀 NEW (for your UI)
        neon: {
          purple: "#7c3aed",
          cyan: "#06b6d4",
          pink: "#ec4899",
        },

        gradient: {
          start: "#ff8a00",
          end: "#e52e71",
        },

        glassWhite: "rgba(255,255,255,0.3)",
        glassDark: "rgba(255,255,255,0.1)",

        sidebar: {
          background: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",

          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",

          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",

          border: "hsl(var(--sidebar-border))",
        },
      },

      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },

      borderRadius: {
        xl: "var(--radius)",
      },

      // 🔥 BACKGROUND GRADIENTS (matches your aurora UI)
      backgroundImage: {
        aurora: `
          radial-gradient(circle at 20% 20%, #7c3aed, transparent 40%),
          radial-gradient(circle at 80% 30%, #06b6d4, transparent 40%),
          radial-gradient(circle at 50% 80%, #ec4899, transparent 40%)
        `,
      },

      // 🔥 ANIMATIONS (future-ready for your UI)
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",
      },

      boxShadow: {
        glow: "0 0 20px rgba(0,200,255,0.5)",
      },
    },
  },

  plugins: [],
};