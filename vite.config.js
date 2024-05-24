import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    server: {
        port: 2024
    },
    plugins: [
        react({
            devTarget: "es2022"
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/*',
                    dest: 'assets'
                },
            ]
        }),
    ],
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    root: './',
    publicDir: 'static',
    build: {
        outDir: 'public',
        rollupOptions: {
            input: '/index.html',
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
                entryFileNames: 'scripts/[name].[hash].js',
                chunkFileNames: 'scripts/[name].[hash].js',
            },
        },
    },
    resolve: {
        alias: {
            '@assets': resolve(__dirname, './assets'),
            '@components': resolve(__dirname, './client/components'),
            '@enums': resolve(__dirname, './client/enums'),
            '@types': resolve(__dirname, './client/types'),
            '@utils': resolve(__dirname, './client/utils'),
        },
    },
})