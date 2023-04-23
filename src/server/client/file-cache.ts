import { CACHE_BASE } from "../../constant";

export const FILE_STORAGE_KEY = `${CACHE_BASE}-files`;

export const FileCache = {
  addFile(file: FileItem) {
    const files = this.getFileList();
    files.push(file);
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(files));
  },
  removeFile(fileKey: string) {
    const files = this.getFileList();
    const index = files.findIndex((file) => file.fileKey === fileKey);
    if (index > -1) {
      files.splice(index, 1);
      localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(files));
    }
  },
  getFileList() {
    let files: FileItem[] = [];
    try {
      const str = localStorage.getItem(FILE_STORAGE_KEY);
      if (str) {
        const _files = JSON.parse(str);
        if (
          Array.isArray(_files) &&
          _files.every((file) => file.fileKey && file.name)
        ) {
          files = _files;
        }
      }
    } catch (e) {
      console.log("fail to get files from localStorage");
    }
    return files;
  },
};
