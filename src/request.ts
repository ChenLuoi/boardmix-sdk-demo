import axios from "axios";
import {USER_TOKEN} from "./constant";

let accessToken = ""

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
        const res = await axios.post("/api/pix/files/create", {
            description: "File Description",
            folder_id: 291,
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
    }
}