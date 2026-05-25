import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F52BA",
          dark: "#1E3A8A"
        }
      }
    }
  },
  plugins: []
};

export default config;
