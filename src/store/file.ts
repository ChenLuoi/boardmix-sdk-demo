import { defineStore } from "pinia";
import { ServerInstance } from "../server";
import { ref } from "vue";
import { formatDate } from "../util/time";

export const useFileStore = defineStore("file", () => {
  const fileList = ref<FileItem[]>([]);
  const fileMap = ref<{ [fileKey: string]: FileItem }>({});

  async function refreshFileList() {
    fileList.value = await ServerInstance.getFileList();
    fileMap.value = {};
    fileList.value.forEach((file) => {
      fileMap.value[file.fileKey] = file;
    });
  }

  async function addFile() {
    const file = await ServerInstance.createFile(
      "文件-" + formatDate(new Date(), "MM-dd hh:mm:ss")
    );
    await refreshFileList();
    return file;
  }

  async function removeFile(fileKey: string) {
    await ServerInstance.deleteFile(fileKey);
    await refreshFileList();
  }

  return {
    fileMap,
    fileList,
    addFile,
    removeFile,
    refreshFileList,
  };
});
