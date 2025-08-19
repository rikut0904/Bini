/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                matcha: "#A7D3A6", // 基調
                sakura: "#F4A7B9", // アクセント
                kinari: "#FFF8F0"  // サブ
            },
            borderRadius: {
                xl: "12px",
                "2xl": "16px"
            },
            boxShadow: {
                soft: "0 6px 18px rgba(0,0,0,0.06)"
            }
        }
    },
    plugins: []
};

export default config;
