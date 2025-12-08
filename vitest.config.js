import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,      // Vitest API をグローバルで利用可能にする (例: describe, it, expect)
        environment: 'jsdom',
        setupFiles: ['./vitest-setup.js'],
    },
})