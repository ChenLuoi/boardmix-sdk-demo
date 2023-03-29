import axios from "axios";
import {USER_TOKEN} from "./constant";

let accessToken = ""
let myFolderId = 0;

// 其他接入方的接口，请勿参考
export const Api = {
    async getAccessToken() {
        const res = await axios.put("/api/user/user/refresh_token", undefined, {
            headers: {
                authorization: `Bearer ${USER_TOKEN}`
            }
        })
        accessToken = res.data.data.access_token
    },
    async createFile() {
        if (!myFolderId) {
            myFolderId = (await this.getMyFolder())?.id || 0;
        }
        const res = await axios.post("/api/pix/files/create", {
            description: "File Description",
            folder_id: myFolderId,
            name: "白板文件",
            type: 20
        }, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return res.data.data as {
            file_key: string;
            name: string;
        }
    },
    async getFileToken(fileKey: string) {
        const res = await axios.get(`/api/pix/files/board/token?file_key=${fileKey}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return res.data.data as {
            access_token: string;
            expires_in: number;
            scope: ("file.edit" | "file.view")[]
        }
    },
    async getTeamList() {
        const res = await axios.get("/api/pix/teams", {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return res.data.data as {
            avatar_key: string;
            avatar_status: "pass";
            created_at: string;
            creator_id: number;
            description: string;
            id: number;
            name: "",
            space_id: number
        }[];
    },
    async getMyTeam() {
        const teams = await this.getTeamList();
        return teams.find(team => team.name === "");
    },
    async getFolderList() {
        const res = await axios.get("/api/pix/folders/list", {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return res.data.data as {
            team_id: number;
            type: number;
            name: string;
            id: number;
        }[]
    },
    async getMyFolder() {
        const [myTeam, folders] = await Promise.all([
            this.getMyTeam(),
            this.getFolderList()
        ]);
        if (myTeam) {
            return folders.find(folder => folder.team_id === myTeam.id);
        }
        return undefined;
    }
}
