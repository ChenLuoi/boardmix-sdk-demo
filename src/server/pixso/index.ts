import axios from "axios";
import { PIXSO_TOKEN } from "../../constant";

let accessToken = "";
let myFolderId = 0;

const InnerApi = {
  async _getTeamList() {
    const res = await axios.get("/api/pix/teams", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data as {
      avatar_key: string;
      avatar_status: "pass";
      created_at: string;
      creator_id: number;
      description: string;
      id: number;
      name: "";
      space_id: number;
    }[];
  },
  async _getMyTeam() {
    const teams = await this._getTeamList();
    return teams.find((team) => team.name === "");
  },
  async _getFolderList() {
    const res = await axios.get("/api/pix/folders/list", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data as {
      team_id: number;
      type: number;
      name: string;
      id: number;
    }[];
  },
  async _getMyFolder() {
    const [myTeam, folders] = await Promise.all([
      this._getMyTeam(),
      this._getFolderList(),
    ]);
    if (myTeam) {
      return folders.find((folder) => folder.team_id === myTeam.id);
    }
    return undefined;
  },
};

export const PixsoApi: IServerApi = {
  async init() {
    const res = await axios.put("/api/user/user/refresh_token", undefined, {
      headers: {
        authorization: `Bearer ${PIXSO_TOKEN}`,
      },
    });
    accessToken = res.data.data.access_token;
  },
  async createFile(name: string) {
    if (!myFolderId) {
      myFolderId = (await InnerApi._getMyFolder())?.id || 0;
    }
    const res = await axios.post(
      "/api/pix/files/create",
      {
        description: "File Description",
        folder_id: myFolderId,
        name: name || `白板文件-` + Date.now(),
        type: 20,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = res.data.data as {
      file_key: string;
      name: string;
    };
    return {
      fileKey: data.file_key,
      name: data.name,
    };
  },
  async getFileToken(fileKey: string) {
    const res = await axios.get(
      `/api/pix/files/board/token?file_key=${fileKey}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data.data as {
      access_token: string;
      expires_in: number;
      scope: string;
    };
  },
  async getFileList() {
    if (!myFolderId) {
      myFolderId = (await InnerApi._getMyFolder())?.id || 0;
    }
    const res = await axios.get("/api/pix/folders/files", {
      params: {
        folder_id: myFolderId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return (
      res.data.data as {
        file_key: string;
        name: string;
        type: number;
      }[]
    )
      .filter((file) => file.type === 20)
      .map((file) => ({
        fileKey: file.file_key,
        name: file.name,
      }));
  },
  async deleteFile(fileKey: string): Promise<void> {
    // TODO
  },
  async updateFileName(fileKey: string, name: string) {
    // TODO
  },
};
