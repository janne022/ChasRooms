import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@services": path.resolve(__dirname, "./src/services"),
        },
    },
    server: {
        port: 5173,
        strictPort: true,
        proxy: {
            // Proxy API calls to the app service
            "/api": {
                target: process.env.SERVER_HTTPS || process.env.SERVER_HTTP,
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
