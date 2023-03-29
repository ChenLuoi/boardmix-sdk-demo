import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const SERVER_ORIGIN = "https://pre.pixso.cn";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8000,
        proxy: {
            "/api": {
                target: SERVER_ORIGIN,
                changeOrigin: true
            },
            "/openapi": {
                target: SERVER_ORIGIN,
                changeOrigin: true
            }
        }
    },
    plugins: [vue()]
})
