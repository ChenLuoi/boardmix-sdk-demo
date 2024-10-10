import { CLIENT_ID, SDK_ORIGIN } from "./constant";
import { ServerInstance } from "./server";
import { useUserStore } from "./store/user";
import { computed, ref, toRaw } from "vue";
import { useFileStore } from "./store/file";
import { FeatureKey, useFeatureStore } from "./store/feature";
import { storeToRefs } from "pinia";
import { useInjectToolbar } from "./feature/inject-toolbar";
import { useInjectIcon } from "./feature/inject-icon";

export function useBoardmix() {
  const sdkBoxHelper = new (class SdkBoxHelper extends BoardMixSdk {
    public override async getAccessToken(): Promise<{
      token: string;
      expiresIn: number;
    }> {
      const data = await ServerInstance.getFileToken(
        fileKey.value,
        !!flags.value.canEdit,
        flags.value.authUser ? user.value : undefined
      );
      return {
        token: data.access_token,
        expiresIn: data.expires_in,
      };
    }

    // 需要返回当前文件信息
    protected override getFileInfo(): Promise<{
      name: string;
      fileKey: string;
      isEditor: boolean;
    }> {
      return Promise.resolve({
        name: file.value.name,
        fileKey: fileKey.value,
        isEditor: !!flags.value.canEdit,
      });
    }

    // 需要返回当前用户信息
    protected override async getUserInfo(): Promise<{
      name: string;
      avatar: string;
    }> {
      const userStore = useUserStore();
      return toRaw(userStore.userMap[userId.value]);
    }
  })(SDK_ORIGIN, {
    clientId: CLIENT_ID,
    backEnable: true, // 是否显示左上角的返回按钮
    onBack() {
      alert("返回页面");
    },
    nameEditable: false, // 是否支持在boardmix sdk中修改文件名称
    coverEnable: true, // 是否支持封面设置
    setCover: async (cover: Blob) => {
      console.log("set cover", cover);
    },
    thumbnailEnable: true, // 是否支持缩略图设置
    setThumbnail: async (thumb: Blob) => {
      console.log("set thumb", thumb);
    },
    shareEnable: false, // 是否支持显示分享按钮
    async getFileUser() {
      // 获取关联用户列表，不实现则永远返回空列表
      return [];
    },
  });

  const isWorking = ref(false);
  const fileKey = ref("");
  const userId = ref(NaN);

  const fileStore = useFileStore();
  const { flags } = storeToRefs(useFeatureStore());
  const file = computed(() => fileStore.fileMap[fileKey.value]);

  const userStore = useUserStore();
  const user = computed(() => userStore.userMap[userId.value]);

  function loadFile(_fileKey: string) {
    fileKey.value = _fileKey;
    reloadFile();
  }

  function exitFile() {
    sdkBoxHelper.sendMessage("STOP_LOADING");
    isWorking.value = false;
  }

  const injectList: [FeatureKey, IFeature][] = [];
  injectList.push(["injectToolbar", useInjectToolbar(sdkBoxHelper)]);
  injectList.push(["injectBackIcon", useInjectIcon(sdkBoxHelper)]);

  async function reloadFile() {
    if (isWorking.value) {
      exitFile();
    }
    if (!file.value || !user.value) {
      return;
    }
    injectList.forEach(([key, feature]) => {
      if (flags.value[key]) {
        feature.open();
      } else {
        feature.close();
      }
    });
    let token = undefined;
    if (flags.value.authUser) {
      token = (await sdkBoxHelper.getAccessToken()).token;
    }
    sdkBoxHelper.sendMessage("START_LOADING", {
      fileKey: fileKey.value,
      role: flags.value.canEdit ? "editor" : "viewer",
      token,
    });
    isWorking.value = true;
  }

  function openApiRequest<T extends keyof IOpenApi>(params: {
    funcName: T;
    options: Parameters<IOpenApi[T]>[0];
  }): Promise<ReturnType<IOpenApi[T]>> {
    return sdkBoxHelper.promisePostMessage("OPEN_API_EXECUTER", params);
  }

  return {
    isWorking,
    loadFile,
    reloadFile,
    exitFile,
    fileKey,
    userId,
    sdkBoxHelper,
    openApiRequest,
  };
}
