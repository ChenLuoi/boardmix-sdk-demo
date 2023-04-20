import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteHtmlVariables } from "./plugin/vite-html-variables";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd());
  return {
    server: {
      port: 28000,
      proxy: {
        "/api": {
          target: env.VITE_PIXSO_ORIGIN,
          changeOrigin: true,
        },
        "/openapi": {
          target: env.VITE_PIXSO_ORIGIN,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      vue(),
      viteHtmlVariables({
        $SDK_ORIGIN: env.VITE_SDK_ORIGIN,
      }),
    ],
  };
});
