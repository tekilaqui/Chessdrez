import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Listen on all network interfaces
        port: 5173,      // Default Vite port
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    },
    worker: {
        format: 'es',
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    }
});
