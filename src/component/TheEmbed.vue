<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SDK_BASE } from "./../constant";
import { ServerInstance } from "./../server";
import { useFileStore } from "./../store/file";
import { useFeatureStore } from "./../store/feature";
import { useUserStore } from "./../store/user";
import { useBoardmix } from "./../boardmix";
import { storeToRefs } from "pinia";
import { getQueryString } from "../util";

const fileKey = getQueryString("fileKey");
const roadMapNodeGuid = getQueryString("roadMapNodeGuid");

const { flags } = storeToRefs(useFeatureStore());
const isSdkPrepared = ref(false);

const iframeEle = ref({} as HTMLIFrameElement);

const fileStore = useFileStore();
const { refreshFileList } = fileStore;

const featureStore = useFeatureStore();
const { init: initFeature } = featureStore;

const userStore = useUserStore();
const { updateUsers } = userStore;

const { sdkBoxHelper, loadFile, userId } = useBoardmix();

onMounted(async () => {
  // sdkHelper绑定iframe
  sdkBoxHelper.bindIframe(iframeEle.value);
  // 其他介入方接口，请勿参考
  await ServerInstance.setServerType("client");
  initFeature();
  updateUsers();
  await refreshFileList();
  userId.value = userStore.users[0]?.id ?? NaN;
  // iframe页面准备好后的回调
  sdkBoxHelper.on("PAGE_PREPARED", () => {
    isSdkPrepared.value = true;
    console.log("PAGE_PREPARED");
    sdkBoxHelper.sendMessage("UPDATE_WATERMARK_CONFIG", {
      show: true,
      fontSize: 14,
      transparency: 25,
      angle: 25,
      spacing: 25,
      entName: "BoardMix Test",
      userName: "test",
      account: "123456789",
      customize: "自定义文字",
    });
    flags.value.authUser = false;
    featureStore.flags.canEdit = false;
    loadFile(fileKey as string, roadMapNodeGuid as string);
  });
});

const SDK_APP_PATH = `${SDK_BASE}/app/sdk/embed`;
</script>
<template>
  <div class="container">
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
