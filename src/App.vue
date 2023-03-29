<script setup lang="ts">
import {onMounted, ref} from "vue";
import {sdkBoxHelper} from "./boardmix";
import {Api} from "./request";

const isSdkPrepared = ref(false);

const iframeEle = ref({} as HTMLIFrameElement);
const isWorking = ref(false);
const fileKey = ref("");

onMounted(async () => {
  // sdkHelper绑定iframe
  sdkBoxHelper.bindIframe(iframeEle.value)
  // 其他介入方接口，请勿参考
  await Api.getAccessToken();
  // iframe页面准备好后的回调
  sdkBoxHelper.on("PAGE_PREPARED", () => {
    isSdkPrepared.value = true;
  })
})

function startFile(fileKey: string, role: "editor" | "viewer") {
  if (!isSdkPrepared.value) {
    alert("sdk页面未准备好");
    return;
  }
  isWorking.value = true;
  // 发送消息启动文件
  sdkBoxHelper.sendMessage("START_LOADING", {
    fileKey: fileKey,
    role
  })
}

function exitFile() {
  // 发送消息退出文件
  sdkBoxHelper.sendMessage("STOP_LOADING");
  isWorking.value = false;
}

async function onCreateFile() {
  // 其他接入方创建文件接口，请勿参考
  const file = await Api.createFile();
  fileKey.value = file.file_key;
  sdkBoxHelper.fileKey = file.file_key;
  startFile(file.file_key, "editor");
}

function reEnterFile() {
  // 重新进入文件
  sdkBoxHelper.fileKey = fileKey.value;
  startFile(fileKey.value, "editor");
}
</script>

<template>
  <div class="container">
    <div class="action-group">
      <button v-if="!isWorking" @click="onCreateFile">创建文件</button>
      <button v-if="!isWorking && fileKey" @click="reEnterFile">再次进入</button>
      <button v-if="isWorking" @click="exitFile">退出文件</button>
    </div>
    <iframe ref="iframeEle" src="https://sdk-pre.boardmix.cn/app/sdk"/>
  </div>
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
