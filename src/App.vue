<script setup lang="ts">
import { onMounted, ref } from "vue";
import TheFile from "./component/TheFile.vue";
import TheEmbed from "./component/TheEmbed.vue";
const isEmbed = ref<boolean>(false);
if (location.pathname.includes("embed")) {
  isEmbed.value = true;
} else {
  isEmbed.value = false;
}
</script>
<template>
  <component :is="isEmbed ? TheEmbed : TheFile" />
</template>

<style>
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.container {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.action-group {
  width: 800px;
  border-radius: 8px;
  background: #ffffff80;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  transition: transform ease 0.2s;
  position: absolute;
}

.action-group--content {
  display: flex;
  padding: 6px;
  height: 200px;
}

.action-group--content > * {
  margin-left: 6px;
}

.action-group--button-group {
  display: flex;
  flex-direction: column;
}

.action-group--button-group button {
  margin-bottom: 8px;
}

.action-group--anchor {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
}

.action-group:hover {
  transform: translateX(-50%) translateY(0);
}
</style>
