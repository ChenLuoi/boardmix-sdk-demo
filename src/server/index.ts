import { PixsoApi } from "./pixso";
import { ClientApi } from "./client";

export const ServerInstance = new (class Server implements IServerApi {
  private readonly apiMap = {
    pixso: PixsoApi,
    client: ClientApi,
  };

  private type: "pixso" | "client" = "client";

  public async setServerType(type: "pixso" | "client") {
    this.type = type;
    await this.init();
  }

  public init() {
    return this.apiMap[this.type].init();
  }

  public getFileList(): Promise<FileItem[]> {
    return this.apiMap[this.type].getFileList();
  }

  public createFile(name: string): Promise<FileItem> {
    return this.apiMap[this.type].createFile(name);
  }

  public getFileToken(
    fileKey: string,
    user?: {
      id: number;
      name: string;
    }
  ): Promise<FileTokenInfo> {
    return this.apiMap[this.type].getFileToken(fileKey, user);
  }

  public deleteFile(fileKey: string): Promise<void> {
    return this.apiMap[this.type].deleteFile(fileKey);
  }
})();
