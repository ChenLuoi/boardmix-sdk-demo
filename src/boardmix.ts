import { CLIENT_ID, SDK_ORIGIN } from "./constant";
import { ServerInstance } from "./server";
import { useUserStore } from "./store/user";
import { computed, ref, toRaw } from "vue";
import { useFileStore } from "./store/file";
import { useFeatureStore } from "./store/feature";
import { storeToRefs } from "pinia";

export function useBoardmix() {
  const sdkBoxHelper = new (class SdkBoxHelper extends BoardMixSdk {
    protected override async getAccessToken(): Promise<{
      token: string;
      expiresIn: number;
    }> {
      const data = await ServerInstance.getFileToken(fileKey.value);
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

  function injectUi() {
    sdkBoxHelper.sendMessage(
      "OPEN_API_INJECT_UI",
      Object.assign(
        {},
        {
          toolbar: flags.value.injectToolbar
            ? [
                {
                  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjg3NTIgMTEuNDg3MUMxMS4yNjU5IDEwLjE4NDUgMTEuNjQwNCA4Ljg2NTY3IDExLjk4MjQgNy40OTc5NkgxMi4wNjM4QzEyLjQyMiA4Ljg0OTM5IDEyLjc4MDIgMTAuMTg0NSAxMy4xODcyIDExLjQ4NzFMMTMuNjU5NCAxMy4wOTlIMTAuMzg2N0wxMC44NzUyIDExLjQ4NzFaTTcgMThIOC45MjEzTDkuOTQ3MDggMTQuNTgwN0gxNC4xMTUzTDE1LjEyNDggMThIMTcuMTI3NUwxMy4xNTQ3IDZIMTAuOTcyOUw3IDE4WiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=",
                  label: "扩展功能",
                  action: "group",
                  key: "remind-insert-group",
                  children: [
                    {
                      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHk9IjExIiB3aWR0aD0iMjQiIGhlaWdodD0iMiIgcng9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KICAgIDxyZWN0IHg9IjExIiB3aWR0aD0iMiIgaGVpZ2h0PSIyNCIgcng9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KPC9zdmc+",
                      label: "插入内容",
                      action: "expand",
                      key: "remind-insert-content",
                    },
                    {
                      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9InBhdGgtMS1pbnNpZGUtMV80MTU2XzI4NjY1OCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjQgMTZDMjQuMjc2MSAxNiAyNC41MDE1IDE2LjIyNDEgMjQuNDg1MyAxNi40OTk3QzI0LjM5IDE4LjExOCAyMy44MzM1IDE5LjY3OTEgMjIuODc2NiAyMC45OTYyQzIxLjgyMTYgMjIuNDQ4NCAyMC4zMzM4IDIzLjUyOTMgMTguNjI2NiAyNC4wODRDMTYuOTE5NSAyNC42Mzg3IDE1LjA4MDUgMjQuNjM4NyAxMy4zNzM0IDI0LjA4NEMxMS42NjYyIDIzLjUyOTMgMTAuMTc4NCAyMi40NDg0IDkuMTIzMzYgMjAuOTk2MkM4LjA2ODI3IDE5LjU0NCA3LjUgMTcuNzk1IDcuNSAxNkM3LjUgMTQuMjA1IDguMDY4MjcgMTIuNDU2IDkuMTIzMzYgMTEuMDAzOEMxMC4xNzg0IDkuNTUxNjIgMTEuNjY2MiA4LjQ3MDcxIDEzLjM3MzQgNy45MTYwMkMxNC45MjE3IDcuNDEyOTUgMTYuNTc4NCA3LjM2NjEzIDE4LjE0NjggNy43NzU1OEMxOC40MTQgNy44NDUzMiAxOC41NTc1IDguMTI4OTIgMTguNDcyMSA4LjM5MTU1TDE2Ljk0MjUgMTMuMDk5M0MxNi44NTcyIDEzLjM2MTkgMTYuNTc0NiAxMy41MDAzIDE2LjMwMDQgMTMuNDY3OEMxNS45MzYxIDEzLjQyNDUgMTUuNTY0NyAxMy40NjAyIDE1LjIxMiAxMy41NzQ4QzE0LjY5OTkgMTMuNzQxMiAxNC4yNTM1IDE0LjA2NTUgMTMuOTM3IDE0LjUwMTFDMTMuNjIwNSAxNC45MzY4IDEzLjQ1IDE1LjQ2MTUgMTMuNDUgMTZDMTMuNDUgMTYuNTM4NSAxMy42MjA1IDE3LjA2MzIgMTMuOTM3IDE3LjQ5ODlDMTQuMjUzNSAxNy45MzQ1IDE0LjY5OTkgMTguMjU4OCAxNS4yMTIgMTguNDI1MkMxNS43MjQyIDE4LjU5MTYgMTYuMjc1OCAxOC41OTE2IDE2Ljc4OCAxOC40MjUyQzE3LjMwMDEgMTguMjU4OCAxNy43NDY1IDE3LjkzNDUgMTguMDYzIDE3LjQ5ODlDMTguMjgwOSAxNy4xOTg5IDE4LjQyOTcgMTYuODU2NyAxOC41MDExIDE2LjQ5NjhDMTguNTU0OSAxNi4yMjYgMTguNzczOSAxNiAxOS4wNSAxNkgyNFoiLz4KPC9tYXNrPgo8cGF0aCBkPSJNMjQgMTZDMjQuMjc2MSAxNiAyNC41MDE1IDE2LjIyNDEgMjQuNDg1MyAxNi40OTk3QzI0LjM5IDE4LjExOCAyMy44MzM1IDE5LjY3OTEgMjIuODc2NiAyMC45OTYyQzIxLjgyMTYgMjIuNDQ4NCAyMC4zMzM4IDIzLjUyOTMgMTguNjI2NiAyNC4wODRDMTYuOTE5NSAyNC42Mzg3IDE1LjA4MDUgMjQuNjM4NyAxMy4zNzM0IDI0LjA4NEMxMS42NjYyIDIzLjUyOTMgMTAuMTc4NCAyMi40NDg0IDkuMTIzMzYgMjAuOTk2MkM4LjA2ODI3IDE5LjU0NCA3LjUgMTcuNzk1IDcuNSAxNkM3LjUgMTQuMjA1IDguMDY4MjcgMTIuNDU2IDkuMTIzMzYgMTEuMDAzOEMxMC4xNzg0IDkuNTUxNjIgMTEuNjY2MiA4LjQ3MDcxIDEzLjM3MzQgNy45MTYwMkMxNC45MjE3IDcuNDEyOTUgMTYuNTc4NCA3LjM2NjEzIDE4LjE0NjggNy43NzU1OEMxOC40MTQgNy44NDUzMiAxOC41NTc1IDguMTI4OTIgMTguNDcyMSA4LjM5MTU1TDE2Ljk0MjUgMTMuMDk5M0MxNi44NTcyIDEzLjM2MTkgMTYuNTc0NiAxMy41MDAzIDE2LjMwMDQgMTMuNDY3OEMxNS45MzYxIDEzLjQyNDUgMTUuNTY0NyAxMy40NjAyIDE1LjIxMiAxMy41NzQ4QzE0LjY5OTkgMTMuNzQxMiAxNC4yNTM1IDE0LjA2NTUgMTMuOTM3IDE0LjUwMTFDMTMuNjIwNSAxNC45MzY4IDEzLjQ1IDE1LjQ2MTUgMTMuNDUgMTZDMTMuNDUgMTYuNTM4NSAxMy42MjA1IDE3LjA2MzIgMTMuOTM3IDE3LjQ5ODlDMTQuMjUzNSAxNy45MzQ1IDE0LjY5OTkgMTguMjU4OCAxNS4yMTIgMTguNDI1MkMxNS43MjQyIDE4LjU5MTYgMTYuMjc1OCAxOC41OTE2IDE2Ljc4OCAxOC40MjUyQzE3LjMwMDEgMTguMjU4OCAxNy43NDY1IDE3LjkzNDUgMTguMDYzIDE3LjQ5ODlDMTguMjgwOSAxNy4xOTg5IDE4LjQyOTcgMTYuODU2NyAxOC41MDExIDE2LjQ5NjhDMTguNTU0OSAxNi4yMjYgMTguNzczOSAxNiAxOS4wNSAxNkgyNFoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgbWFzaz0idXJsKCNwYXRoLTEtaW5zaWRlLTFfNDE1Nl8yODY2NTgpIi8+Cjwvc3ZnPgo=",
                      label: "插入图片",
                      action: "event",
                      key: "remind-insert-picture",
                    },
                  ],
                },
                {
                  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHk9IjExIiB3aWR0aD0iMjQiIGhlaWdodD0iMiIgcng9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KICAgIDxyZWN0IHg9IjExIiB3aWR0aD0iMiIgaGVpZ2h0PSIyNCIgcng9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KPC9zdmc+",
                  label: "直接插入",
                  action: "expand",
                  key: "remind-insert-content-err",
                },
              ]
            : [],
        },
        flags.value.injectBackIcon
          ? {
              icon: {
                headerBack:
                  "data:image/png;base64,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",
              },
            }
          : {}
      )
    );
  }

  function reloadFile() {
    if (isWorking.value) {
      exitFile();
    }
    if (!file.value || !user.value) {
      return;
    }
    injectUi();
    sdkBoxHelper.sendMessage("START_LOADING", {
      fileKey: fileKey.value,
      role: flags.value.canEdit ? "editor" : "viewer",
    });
    isWorking.value = true;
  }

  return {
    isWorking,
    loadFile,
    reloadFile,
    exitFile,
    fileKey,
    userId,
    sdkBoxHelper,
  };
}
