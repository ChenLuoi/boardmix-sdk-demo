<template>
  <div class="file-list">
    <div
      v-for="file in fileStore.fileList"
      :key="file.fileKey"
      :class="{
        'file-list--item': true,
        'file-list--item__active': fileKey === file.fileKey,
      }"
      @click="onSelect(file.fileKey)"
    >
      {{ file.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from "../store/file";

defineProps<{
  fileKey: string;
}>();

const emit = defineEmits<{
  (e: "on-change", fileKey: string): void;
}>();

const fileStore = useFileStore();

function onSelect(fileKey: string) {
  emit("on-change", fileKey);
}
</script>

<style>
.file-list {
  width: 240px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}

.file-list--item {
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.file-list--item__active {
  background: rgba(0, 77, 255, 0.07) !important;
}

.file-list--item:hover {
  background: rgba(18, 17, 42, 0.05);
}
</style>
