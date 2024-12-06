import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)", 
        pagebg: "#F9FAFF",
        darkbg: "#141619",
        bordercolor: "#DEE0E5",
        textbase:"#14151A",
        textsecondary:'rgba(15, 19, 36, 0.6)',
        'border-action-normal': '#DEE0E3',
        'button-primary': '#14151A',
        'button-primary-hover': '#1F2128',
        'success-border': '#BAE5C5',
        'success-bg': '#EDFAF0',
        'error-border': '#F2BCB2',
        'error-bg': '#FCEDEA',
        'error-ring': '#E6483D'
      },
      fontFamily: {
        'inter': ['var(--font-inter)'],
        'public-sans': ['var(--font-public-sans)']
      },
      spacing: {
        'login-container': '440px',
        'input-padding': '10px',
        'notification-width': '400px',
      },
      boxShadow: {
        'button': '0px 1px 2px 0px rgba(20,21,26,0.05)',
        'notification': '0px 10px 16px -3px rgba(20,21,26,0.05), 0px 3px 10px -2px rgba(20,21,26,0.02)',
      },
      fontSize: {
        'notification': ['14px', '20px'],
      },
      letterSpacing: {
        'notification': '-0.07px',
        'title': '-0.16px',
        'heading': '-0.016em',
        'subheading': '-0.01em',
      },
    },
  },
  plugins: [],
};
export default config;
