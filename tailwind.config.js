/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'lub-orange': '#f37021',
                'lub-blue': '#1e293b',
            }
        },
    },
    plugins: [],
}