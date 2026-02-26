/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#FAF8F5',
                primary: '#0D0D12',
                accent: '#C9A84C',
                textDark: '#2A2A35',
                slate: '#2A2A35',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                drama: ['Playfair Display', 'serif'],
                serif: ['Playfair Display', 'serif'],
                data: ['JetBrains Mono', 'monospace'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
