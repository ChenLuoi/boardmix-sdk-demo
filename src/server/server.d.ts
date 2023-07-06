interface FileItem {
  fileKey: string;
  name: string;
}

interface FileTokenInfo {
  access_token: string;
  expires_in: number;
  scope: string;
}

interface IServerApi {
  init(): Promise<void>;

  createFile(name: string): Promise<FileItem>;

  deleteFile(fileKey: string): Promise<void>;

  getFileList(): Promise<FileItem[]>;

  getFileToken(
    fileKey: string,
    user?: {
      id: number;
      name: string;
    }
  ): Promise<FileTokenInfo>;
  startGroupWork(fileKey: string): Promise<void>;
  stopGroupWork(fileKey: string): Promise<void>;
}
