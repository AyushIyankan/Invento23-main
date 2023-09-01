import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, PluginOption } from 'vite'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        visualizer({
            template: 'treemap',
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html',
        }) as PluginOption,
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString()
                    }
                },
            },
        },
    },
    // assetsInclude: [`**/*.webp`],
})
