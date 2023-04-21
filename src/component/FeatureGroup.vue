<template>
  <div class="feature-group">
    <div
      v-for="feature in featureList"
      :key="feature.key"
      class="feature-group--item"
    >
      <input
        type="checkbox"
        :name="feature.name"
        :checked="featureStore.flags[feature.key]"
        @change="onChange($event, feature.key)"
      />
      <span>{{ feature.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FeatureKey, useFeatureStore } from "../store/feature";

const emit = defineEmits<{
  (e: "on-change");
}>();

const featureStore = useFeatureStore();

const featureList: { key: FeatureKey; name: string }[] = [
  {
    key: "authUser",
    name: "授权用户",
  },
  {
    key: "guestMode",
    name: "匿名模式",
  },
  {
    key: "injectBackIcon",
    name: "注入返回图标",
  },
  {
    key: "injectToolbar",
    name: "注入工具栏",
  },
  {
    key: "canEdit",
    name: "是否编辑",
  },
];

function onChange(event: InputEvent, key: FeatureKey) {
  featureStore.update(
    key,
    !!(event.target as unknown as { checked: boolean } | undefined)?.checked
  );
  emit("on-change");
}
</script>

<style>
.feature-group--item {
  display: flex;
}
</style>
