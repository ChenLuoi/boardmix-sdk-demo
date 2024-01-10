import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteHtmlVariables } from "./plugin/vite-html-variables";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd());
  const baseProxy = {
    "/api": {
      target: env.VITE_PIXSO_ORIGIN,
      changeOrigin: true,
    },
    "/openapi": {
      target: env.VITE_PIXSO_ORIGIN,
      changeOrigin: true,
    },
  };
  baseProxy[env.VITE_SDK_BASE || "/oauth"] = {
    target: env.VITE_SDK_ORIGIN,
    changeOrigin: true,
  };

  return {
    server: {
      port: 23333,
      proxy: baseProxy,
    },
    plugins: [
      vue(),
      viteHtmlVariables({
        $SDK_ORIGIN: env.VITE_SDK_ORIGIN,
        $SDK_BASE: env.VITE_SDK_BASE,
      }),
    ],
  };
});
