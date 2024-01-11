<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CACHE_BASE, SDK_BASE } from "./constant";
import { ServerInstance } from "./server";
import FileList from "./component/FileList.vue";
import { useFileStore } from "./store/file";
import FeatureGroup from "./component/FeatureGroup.vue";
import { FeatureKey, useFeatureStore } from "./store/feature";
import UserList from "./component/UserList.vue";
import { User, useUserStore } from "./store/user";
import { useBoardmix } from "./boardmix";
import { downloadFile, getImportFile } from "./util/file";
import { formatDate } from "./util/time";

const isSdkPrepared = ref(false);

const iframeEle = ref({} as HTMLIFrameElement);

const fileStore = useFileStore();
const { addFile, removeFile, refreshFileList } = fileStore;

const featureStore = useFeatureStore();
const { init: initFeature } = featureStore;

const userStore = useUserStore();
const { updateUsers } = userStore;

const {
  fileKey,
  userId,
  sdkBoxHelper,
  loadFile,
  reloadFile,
  exitFile,
  isWorking,
} = useBoardmix();

onMounted(async () => {
  // sdkHelper绑定iframe
  sdkBoxHelper.bindIframe(iframeEle.value);
  // 其他介入方接口，请勿参考
  await ServerInstance.setServerType("client");
  // iframe页面准备好后的回调
  sdkBoxHelper.on("PAGE_PREPARED", () => {
    isSdkPrepared.value = true;
    sdkBoxHelper.sendMessage("SET_FEATURE_CONFIG", {
      helpCenter: true,
    });
  });
  sdkBoxHelper.on("SHARE_WITH_CODE", (data) => {
    console.log(data);
  });
  initFeature();
  updateUsers();
  await refreshFileList();
  fileKey.value = fileStore.fileList[0]?.fileKey ?? "";
  userId.value = userStore.users[0]?.id ?? NaN;
});

async function onCreateFile() {
  const file = await addFile();
  fileKey.value = file.fileKey;
  loadFile(file.fileKey);
}

async function renameFile() {
  const newName = "文件-" + formatDate(new Date(), "MM-dd hh:mm:ss");
  await fileStore.updateFileName(fileKey.value, newName);
  if (isWorking) {
    sdkBoxHelper.sendMessage("UPDATE_FILE_NAME", { name: newName });
  }
}

async function deleteFile() {
  await removeFile(fileKey.value);
  fileKey.value = "";
}

const SDK_APP_PATH = `${SDK_BASE}/app/sdk`;

function onUserChange(_userId: number) {
  userId.value = _userId;
  reloadFile();
}

function onExport() {
  const cache = {
    files: fileStore.fileList,
    users: userStore.users,
    flags: featureStore.flags,
  };
  downloadFile(new Blob([JSON.stringify(cache)]), `${CACHE_BASE}.cache`);
}

async function onImport() {
  const file = await getImportFile(".cache");
  console.log(file.name);
  const cacheOrigin = file.name.slice(0, file.name.lastIndexOf("."));
  const next =
    cacheOrigin !== CACHE_BASE && confirm("服务地址不一致，是否继续");
  if (!next) {
    return;
  }
  const content = await file.text();
  const cache = JSON.parse(content) as {
    files?: FileItem[];
    users?: User[];
    flags?: { [key in FeatureKey]?: boolean };
  };
  if (cache.flags) {
    featureStore.mergeData(cache.flags);
  }
  if (cache.users) {
    userStore.mergeData(cache.users);
  }
  if (cache.files) {
    fileStore.mergeData(cache.files);
  }
}

function onAirdrop() {
  sdkBoxHelper.sendMessage("TRIGGER_ACTION", { action: "airdrop" });
}

function onHistory() {
  sdkBoxHelper.sendMessage("TRIGGER_ACTION", { action: "open-history" });
}
</script>
<template>
  <div class="container">
    <div class="action-group">
      <div class="action-group--content">
        <FileList :file-key="fileKey" @on-change="loadFile" />
        <div class="action-group--button-group">
          <button @click="reloadFile">进入文件</button>
          <button @click="onCreateFile">创建文件</button>
          <button v-if="fileKey" @click="renameFile">重命名文件</button>
          <button v-if="fileKey" @click="deleteFile">删除文件</button>
          <button v-if="isWorking" @click="exitFile">退出文件</button>
        </div>
        <UserList :active-user="userId" @on-change="onUserChange" />
        <FeatureGroup @on-change="reloadFile" />
        <div class="action-group--button-group">
          <button @click="onExport">导出数据</button>
          <button @click="onImport">导入数据</button>
          <button @click="onAirdrop">唤起扫码</button>
          <button @click="onHistory">历史版本</button>
        </div>
      </div>
      <div class="action-group--anchor">此处下拉</div>
    </div>
    <iframe ref="iframeEle" :src="SDK_APP_PATH" />
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
