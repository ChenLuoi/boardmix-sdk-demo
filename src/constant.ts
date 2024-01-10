export const SDK_ORIGIN = import.meta.env.VITE_SDK_ORIGIN; // sdk环境地址
export const SDK_BASE = `${SDK_ORIGIN}${import.meta.env.VITE_SDK_BASE}`;
export const SDK_SERVER_API_BASE = `${location.origin}${
  import.meta.env.VITE_SDK_BASE
}`;
export const PIXSO_TOKEN = import.meta.env.VITE_PIXSO_TOKEN;
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const url = new URL(SDK_ORIGIN);
export const CACHE_BASE = url.hostname;
