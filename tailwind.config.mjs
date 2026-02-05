/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx,mdx}",
        "./pages/**/*.{js,jsx,ts,tsx,mdx}",
        "./finder/**/*.{js,jsx,ts,tsx,mdx}",
        "./components/**/*.{js,jsx,ts,tsx,mdx}",
        "./src/**/*.{js,jsx,ts,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                "2xl": "1440px", // <— das ist dein Ziel
            },
        },
        extend: {
            colors: {
                testpink: "#ff00aa",
            },
        },
    },
    plugins: [],
};

export default config;
