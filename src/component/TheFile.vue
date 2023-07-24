<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CACHE_BASE, SDK_BASE } from "./../constant";
import { ServerInstance } from "./../server";
import FileList from "./../component/FileList.vue";
import { useFileStore } from "./../store/file";
import FeatureGroup from "./../component/FeatureGroup.vue";
import { FeatureKey, useFeatureStore } from "./../store/feature";
import UserList from "./../component/UserList.vue";
import { User, useUserStore } from "./../store/user";
import { useBoardmix } from "./../boardmix";
import { downloadFile, getImportFile } from "./../util/file";
import { useOpenApi } from "./../hooks/use-open-api";
import { fallbackCopyTextToClipboard } from "../util";

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

const { createText, replaceImage, classifyData, createChart } =
    useOpenApi(sdkBoxHelper);

onMounted(async () => {
    // sdkHelper绑定iframe
    sdkBoxHelper.bindIframe(iframeEle.value);
    // 其他介入方接口，请勿参考
    await ServerInstance.setServerType("client");
    // iframe页面准备好后的回调
    sdkBoxHelper.on("PAGE_PREPARED", () => {
        isSdkPrepared.value = true;
        console.log("PAGE_PREPARED");
        sdkBoxHelper.sendFeatureConfig({
            groupWork: "NORMAL",
            embedEnable: true,
            helpCenter: true,
            /**
             * 用户行为规范（外部实现）
             */
            userConduct: false,
            /**
             * 问题反馈（外部实现）
             */
            feedback: true,
            /**
             * 更新日志（可选外部实现）
             */
            /**
             * 快捷键浮窗
             */
            shortcutPanel: true,
            shortcutDoc: false,
            /**
             * 快捷键文档（可选外部实现）
             */
            /**
             * 下载客户端（外部实现）
             */
            downloadClient: false,
            /**
             * 举报文件（外部实现）
             */
            reportFile: false,
            /**
             * 操作指引（需要外部数据支持）
             */
            instructions: true,
        });
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
        sdkBoxHelper.sendMessage("OPEN_API_INJECT_UI", {
            tutorialList: [
                {
                    title: "test",
                    list: [
                        {
                            content: "....",
                            cover: "cccc",
                            title: "cccccc",
                        },
                    ],
                },
            ],
            floatToolbar: [
                {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                    key: "test",
                    type: "single",
                    action: "group",
                    tips: "test",
					supportElements: ['default'],
                    children: [
                        {
                            icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkuNSAxMC43NUM5LjkxNDIxIDEwLjc1IDEwLjI1IDExLjA4NTggMTAuMjUgMTEuNVYxNC44NzVDMTAuMjUgMTUuMjg5MiA5LjkxNDIxIDE1LjYyNSA5LjUgMTUuNjI1SDUuNzVDNS4zMzU3OSAxNS42MjUgNSAxNS4yODkyIDUgMTQuODc1QzUgMTQuNDYwOCA1LjMzNTc5IDE0LjEyNSA1Ljc1IDE0LjEyNUg4Ljc1VjExLjVDOC43NSAxMS4wODU4IDkuMDg1NzkgMTAuNzUgOS41IDEwLjc1WiIgZmlsbD0iIzI0MjQyNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNSA3Ljc1QzUgNy4zMzU3OSA1LjMzNTc5IDcgNS43NSA3SDkuNUM5LjkxNDIxIDcgMTAuMjUgNy4zMzU3OSAxMC4yNSA3Ljc1VjExLjVDMTAuMjUgMTEuOTE0MiA5LjkxNDIxIDEyLjI1IDkuNSAxMi4yNUg1Ljc1QzUuMzM1NzkgMTIuMjUgNSAxMS45MTQyIDUgMTEuNUM1IDExLjA4NTggNS4zMzU3OSAxMC43NSA1Ljc1IDEwLjc1SDguNzVWOC41SDUuNzVDNS4zMzU3OSA4LjUgNSA4LjE2NDIxIDUgNy43NVoiIGZpbGw9IiMyNDI0MjQiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExIDcuNzVDMTEgNy4zMzU3OSAxMS4zMzU4IDcgMTEuNzUgN0gxNEMxNS40NjQyIDcgMTYuNjI1IDguMTYwNzkgMTYuNjI1IDkuNjI1VjEzQzE2LjYyNSAxNC40NjQyIDE1LjQ2NDIgMTUuNjI1IDE0IDE1LjYyNUgxMS43NUMxMS4zMzU4IDE1LjYyNSAxMSAxNS4yODkyIDExIDE0Ljg3NVY3Ljc1Wk0xMi41IDguNVYxNC4xMjVIMTRDMTQuNjM1OCAxNC4xMjUgMTUuMTI1IDEzLjYzNTggMTUuMTI1IDEzVjkuNjI1QzE1LjEyNSA4Ljk4OTIxIDE0LjYzNTggOC41IDE0IDguNUgxMi41WiIgZmlsbD0iIzI0MjQyNCIvPjwvc3ZnPg==",
                            key: "aaa",
                            label: "我有图标了",
                            action: "event",
                        },
                        {
                            // icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                            key: "aaa11",
                            label: "我也没有图标，而且名字比上面的还要长很多哦",
                            action: "event",
                        },
                        {
                            // icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                            key: "aaa22",
                            label: "我还是没图标",
                            action: "event",
                        },
                        // {
                        //     icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                        //     key: "aaa33",
                        //     label: "aaa33",
                        //     action: "event",
                        // },
                    ],
                },
                {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                    key: "replaceImage",
                    type: "single",
                    action: "event",
                    tips: "替换图片",
                },
                {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                    key: "classify",
                    type: "multiple",
                    action: "event",
                    tips: "图元分类",
                },
                {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                    key: "createText",
                    type: "single",
                    action: "event",
                    tips: "插入文本",
                },
                {
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDIzXzEpIj4KCQk8cGF0aCBpZD0iRyIgZD0iTTI4LjMwMzUgMjguNjA5QzI2Ljk5MSAyOS45ODMgMjQuNzIxNCAzMC45ODc5IDIxLjk0NiAzMC45ODc5QzE2LjU0NTcgMzAuOTg3OSAxMi43MTA3IDI3LjA0MzYgMTIuNzEwNyAyMC4zNzg1QzEyLjcxMDcgMTMuNzQwOCAxNi42ODI0IDkuNzA3NjQgMjIuMTE2OSA5LjcwNzY0QzI0Ljk3NDQgOS43MDc2NCAyNi44NDc0IDEwLjk5OTYgMjguMDIzMiAxMi4yNTc0TDI2LjYyMTggMTMuOTM5MUMyNS41ODk2IDEyLjg0NTMgMjQuMjcwMyAxMS45NzcyIDIyLjE3MTYgMTEuOTc3MkMxOC4wNTY0IDExLjk3NzIgMTUuMzY5OSAxNS4xNjk2IDE1LjM2OTkgMjAuMjk2NUMxNS4zNjk5IDI1LjQ3MTMgMTcuODAzNSAyOC43MTg0IDIyLjE5OSAyOC43MTg0QzIzLjY4MjQgMjguNzE4NCAyNS4xMTExIDI4LjI3NCAyNS45MjQ2IDI3LjUxNTNMMjUuOTI0NiAyMi4xNDIyTDIxLjU4MzcgMjIuMTQyMkwyMS41ODM3IDE5Ljk4ODlMMjguMzAzNSAxOS45ODg5TDI4LjMwMzUgMjguNjA5WiIgZmlsbD0iIzAwMDAwMEZGIi8+Cgk8L2c+Cgk8ZGVmcz4KCQk8Y2xpcFBhdGggaWQ9ImNsaXAyM18xIj4KCQkJPHJlY3QgaWQ9IueUu+advyA2IiB3aWR0aD0iNDAuMDAwMDAwIiBoZWlnaHQ9IjQwLjAwMDAwMCIgZmlsbD0id2hpdGUiLz4KCQk8L2NsaXBQYXRoPgoJPC9kZWZzPgo8L3N2Zz4K",
                    key: "createChart",
                    type: "single",
                    action: "event",
                    tips: "插入图表",
                },
            ],
        });
    });
    sdkBoxHelper.on("SHARE_WITH_CODE", (data) => {
        console.log(data);
    });
    sdkBoxHelper.on("HELP_CENTER_ACTION", (data) => {
        console.log(data);
    });
    sdkBoxHelper.on("COPY_EMBED", (data) => {
        let res = `${location.href}embed?${
            data.roadMapNodeGuid
                ? "roadMapNodeGuid=" + data.roadMapNodeGuid + "&"
                : ""
        }fileKey=${data.fileKey}`;
        if (data.action === "code") {
            res = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" sandbox="allow-scripts allow-popups allow-forms allow-modals allow-same-origin" width="800" height="450" src="${res}" allowfullscreen></iframe>`;
        }

        fallbackCopyTextToClipboard(res);
    });
    sdkBoxHelper.on("OPEN_API_EVENT_CALLBACK", async (data) => {
        if (data.type === "boardv2") {
            switch (data.key) {
                case "replaceImage":
                    data.data.forEach((item) => {
                        replaceImage(item.imageGuid);
                    });
                    break;
                case "classify":
                    classifyData(data.data.map((item) => item.guid));
                    break;
                case "createText":
                    createText();
                    break;
                case "createChart":
                    createChart();
                    break;
            }
        }
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

async function startGroupWork() {
    ServerInstance.startGroupWork(fileKey.value);
}

async function stopGroupWork() {
    ServerInstance.stopGroupWork(fileKey.value);
}

async function onImport() {
    const file = await getImportFile(".cache");
    console.log(file.name);
    const cacheOrigin = file.name.slice(0, file.name.lastIndexOf("."));
    if (cacheOrigin !== CACHE_BASE && !confirm("服务地址不一致，是否继续")) {
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
</script>
<template>
    <div class="container">
        <div class="action-group">
            <div class="action-group--content">
                <FileList :file-key="fileKey" @on-change="loadFile" />
                <div class="action-group--button-group">
                    <button @click="reloadFile">进入文件</button>
                    <button @click="onCreateFile">创建文件</button>
                    <button v-if="fileKey" @click="deleteFile">删除文件</button>
                    <button v-if="isWorking" @click="exitFile">退出文件</button>
                </div>
                <UserList :active-user="userId" @on-change="onUserChange" />
                <FeatureGroup @on-change="reloadFile" />
                <div class="action-group--button-group">
                    <button @click="onExport">导出数据</button>
                    <button @click="onImport">导入数据</button>
                    <button @click="startGroupWork">开始分组讨论</button>
                    <button @click="stopGroupWork">结束分组讨论</button>
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
