import { defineStore } from "pinia";
import { ref } from "vue";
import { CACHE_BASE } from "../constant";

export type FeatureKey =
  | "injectToolbar"
  | "injectBackIcon"
  | "guestMode"
  | "canEdit"
  | "authUser";
export const FLAG_CACHE_KEY = `${CACHE_BASE}-flags`;

export const useFeatureStore = defineStore("feature", () => {
  const flags = ref<{ [key in FeatureKey]?: boolean }>({});

  function init() {
    const str = localStorage.getItem(FLAG_CACHE_KEY);
    if (str) {
      const _flags = JSON.parse(str);
      if (typeof _flags === "object") {
        flags.value = _flags;
      }
    }
  }

  function update(key: FeatureKey, val: boolean) {
    flags.value[key] = val;
    localStorage.setItem(FLAG_CACHE_KEY, JSON.stringify(flags.value));
  }

  return {
    flags,
    init,
    update,
  };
});
