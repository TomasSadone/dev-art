import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: 'https://TomasSadone.github.io/dev-art/',
    resolve: {
        alias: {
            components: '/src/components',
            utils: '/src/utils',
            types: '/src/types',
            styles: '/src/styles',
            constants: '/src/constants',
            hooks: '/src/hooks',
        },
    },
});
