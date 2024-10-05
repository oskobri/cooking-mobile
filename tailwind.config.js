/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,vue}",
    ],
    theme: {
        extend: {},
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

