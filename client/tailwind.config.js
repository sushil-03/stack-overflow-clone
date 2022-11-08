/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                black: "#191919",
                "lt-blue": "#0A95FF",
                "dk-blue": "#0074CC",
                "lt-gray": "#525960",
                "md-gray": "#6A737C",
            },
            boxShadow: {
                "3xl": " 0px 0px 4px 3px rgba(161,198,230,1)",
            },
            screens: {},
        },
    },
    plugins: [],
};
