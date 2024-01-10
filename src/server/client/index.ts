import { httpInstance } from "./http";
import { CLIENT_ID, CLIENT_SECRET } from "../../constant";
import { FileCache } from "./file-cache";

const tokenType = "Bearer";
let accessToken = "";

export const ClientApi: IServerApi = {
  async getFileList(): Promise<FileItem[]> {
    return FileCache.getFileList();
  },
  async createFile(name: string): Promise<FileItem> {
    const res = await httpInstance.post(
      "/openapi/v1/file",
      {},
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      }
    );
    const fileItem = {
      name,
      fileKey: res.data.data.file_key,
    };
    FileCache.addFile(fileItem);
    return fileItem;
  },
  async deleteFile(fileKey: string) {
    FileCache.removeFile(fileKey);
    await httpInstance.delete(`/openapi/v1/file/${fileKey}`, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });
  },
  async getFileToken(
    fileKey: string,
    isEditor: boolean,
    user?: { id: number; name: string }
  ): Promise<FileTokenInfo> {
    const formData = new FormData();
    formData.set("grant_type", "client_credentials");
    formData.set("file_key", fileKey);
    formData.set("scope", isEditor ? "file.edit file.view" : "file.view");
    formData.set("client_id", CLIENT_ID);
    formData.set("client_secret", CLIENT_SECRET);
    if (user) {
      formData.set("user_id", user.id.toString());
      formData.set("nick_name", user.name);
    }
    const res = await httpInstance.post("/oauth/token", formData);
    return res.data as {
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
    };
  },
  async init(): Promise<void> {
    const formData = new FormData();
    formData.set("grant_type", "client_credentials");
    formData.set("scope", "all_scopes");
    formData.set("client_id", CLIENT_ID);
    formData.set("client_secret", CLIENT_SECRET);
    const res = await httpInstance.post("/oauth/token", formData);
    const data = res.data as {
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
    };
    accessToken = data.access_token;
  },
  async updateFileName(fileKey: string, name: string) {
    FileCache.renameFile(fileKey, name);
  },
};
