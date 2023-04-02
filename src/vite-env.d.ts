/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_SDK_ORIGIN: string;
  readonly VITE_USER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
