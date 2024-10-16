/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,vue}",
    ],
    theme: {
        extend: {
            padding: {
                'safe-bottom': 'env(safe-area-inset-bottom)',
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                garden: {
                    ...require("daisyui/src/theming/themes")["garden"],
                    "base-100": "#fff",
                }
            }],
    }
}

