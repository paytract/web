import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#014CD8", // Button background, active links
          light: "#2575FF", // Header background
          dark: "#001F63", // Used in header ellipses with opacity
        },
        text: {
          main: "#111544", // Default dark text (Labels, headings)
          muted: "#848688", // Placeholder text, secondary text
        },
        border: {
          light: "rgba(1, 76, 216, 0.1)", // Input borders
          divider: "#CACACA", // Divider lines (like in phone input)
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        // Note: Using a standard fallback for Metropolis unless you have the local font file
        metropolis: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        xxs: ["11px", "13px"], // Terms and conditions text
        xs: ["12px", "15px"], // Labels, standard small text
        sm: ["13px", "16px"], // Button text
        xl: ["20px", "24px"], // Header text
      },
      borderRadius: {
        sm: "2px", // Checkboxes
        md: "5px", // Buttons
        lg: "8px", // Input fields
        "2xl": "20px", // Header bottom radius
      },
    },
  },
  plugins: [],
};

export default config;
