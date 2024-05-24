import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from "path";

export default defineConfig({
    server: {
        port: 2024
    },
    plugins: [
        react({
            devTarget: "es2022"
        }),
        createHtmlPlugin({
            entry: resolve(__dirname, 'public', 'bundle.js'),
            template: resolve(__dirname, 'public', 'index.html'),
            inject: {
                data: {
                    title: 'index',
                    injectScript: `<script src="./inject.js"></script>`,
                },
            }
        }),
    ],
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'public', 'index.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@components': resolve(__dirname, './client/components'),
            '@enums': resolve(__dirname, './client/enums'),
            '@types': resolve(__dirname, './client/types'),
            '@utils': resolve(__dirname, './client/utils'),
        },
    },
})