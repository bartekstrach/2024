import { defineConfig } from 'vite';
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
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    root: process.cwd(), // Use the current working directory as root
    publicDir: 'static',
    build: {
        outDir: 'public',
        rollupOptions: {
            input: 'index.html', // Relative path to the project root
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
                entryFileNames: 'scripts/[name].[hash].js',
                chunkFileNames: 'scripts/[name].[hash].js',
            },
        },
    },
    resolve: {
        alias: {
            '@assets': resolve(process.cwd(), 'assets'), // Use resolve with current working directory
            '@components': resolve(process.cwd(), 'src/components'),
            '@enums': resolve(process.cwd(), 'src/enums'),
            '@types': resolve(process.cwd(), 'src/types'),
            '@utils': resolve(process.cwd(), 'src/utils'),
        },
    },
});