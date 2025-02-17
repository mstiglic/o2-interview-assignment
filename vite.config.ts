import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@stories': path.resolve(__dirname, './src/stories'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@styles': path.resolve(__dirname, './src/assets/styles'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
        },
    },
    test: {
        globals: true,        // Enables global test functions like `describe`, `test`
        environment: 'jsdom', // Simulates a browser environment for testing
        setupFiles: './src/setupTests.ts', // Runs before each test file
    },
});
