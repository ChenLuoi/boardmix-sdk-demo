<script setup lang="ts">
import { onMounted, ref } from "vue";
import { sdkBoxHelper } from "./boardmix";
import { SDK_BASE } from "./constant";
import { ServerInstance } from "./server";

const isSdkPrepared = ref(false);

const iframeEle = ref({} as HTMLIFrameElement);
const isWorking = ref(false);
const fileKey = ref("");

onMounted(async () => {
  // sdkHelper绑定iframe
  sdkBoxHelper.bindIframe(iframeEle.value);
  // 其他介入方接口，请勿参考
  await ServerInstance.setServerType("client");
  // iframe页面准备好后的回调
  sdkBoxHelper.on("PAGE_PREPARED", () => {
    isSdkPrepared.value = true;
  });
  sdkBoxHelper.on("SHARE_WITH_CODE", (data) => {
    console.log(data);
  });
  refreshFileList();
});

function startFile(fileKey: string, role: "editor" | "viewer") {
  if (!isSdkPrepared.value) {
    alert("sdk页面未准备好");
    return;
  }
  isWorking.value = true;
  // 发送消息启动文件
  sdkBoxHelper.sendMessage("START_LOADING", {
    fileKey: fileKey,
    role,
  });
}

function exitFile() {
  // 发送消息退出文件
  if (isWorking.value) {
    sdkBoxHelper.sendMessage("STOP_LOADING");
    isWorking.value = false;
  }
}

function formatDate(date: Date, fmt = "yyyy-MM-dd hh:mm:ss") {
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? "" + o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

async function onCreateFile() {
  // 其他接入方创建文件接口，请勿参考
  const file = await ServerInstance.createFile(
    "文件-" + formatDate(new Date())
  );
  await refreshFileList();
  fileKey.value = file.fileKey;
  sdkBoxHelper.fileKey = file.fileKey;
  startFile(file.fileKey, "editor");
}

function reEnterFile() {
  // 重新进入文件
  sdkBoxHelper.fileKey = fileKey.value;
  startFile(fileKey.value, "editor");
}

async function deleteFile() {
  await ServerInstance.deleteFile(fileKey.value);
  fileKey.value = "";
  await refreshFileList();
}

const fileList = ref<FileItem[]>([]);

async function refreshFileList() {
  fileList.value = await ServerInstance.getFileList();
}

function onSelect(ev: Event) {
  exitFile();
  fileKey.value = (ev.target as HTMLSelectElement).value;
  reEnterFile();
}

const SDK_APP_PATH = `${SDK_BASE}/app/sdk`;
</script>

<template>
  <div class="container">
    <div class="action-group">
      <select
        v-model="fileKey"
        @change="onSelect">
        <option
          v-for="file in fileList"
          :key="file.fileKey"
          :value="file.fileKey"
        >
          {{ file.name }}
        </option>
      </select>
      <button
        v-if="!isWorking"
        @click="onCreateFile">创建文件</button>
      <template v-if="!isWorking && fileKey">
        <button @click="reEnterFile">再次进入</button>
        <button @click="deleteFile">删除文件</button>
      </template>
      <button
        v-if="isWorking"
        @click="exitFile">退出文件</button>
    </div>
    <iframe
      ref="iframeEle"
      :src="SDK_APP_PATH" />
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
