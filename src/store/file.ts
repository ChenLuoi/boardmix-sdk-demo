import { defineStore } from "pinia";
import { ServerInstance } from "../server";
import { ref } from "vue";
import { formatDate } from "../util/time";
import { FILE_STORAGE_KEY } from "../server/client/file-cache";

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
    try {
      await ServerInstance.deleteFile(fileKey);
    } finally {
      await refreshFileList();
    }
  }

  function mergeData(files: FileItem[], override = false) {
    if (override) {
      fileList.value.length = 0;
      fileMap.value = {};
    }
    files.forEach((file) => {
      if (!fileMap.value[file.fileKey]) {
        fileList.value.push(file);
        fileMap.value[file.fileKey] = file;
      }
    });
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(fileList.value));
  }

  return {
    fileMap,
    fileList,
    addFile,
    removeFile,
    refreshFileList,
    mergeData,
  };
});
