import {SDK_ORIGIN} from "./constant";
import {Api} from "./request";

export class SdkBoxHelper extends BoardMixSdk {
// 调用接入方后端提供的接口获取access_token
    protected override async getAccessToken(): Promise<{
        token: string;
        expiresIn: number
    }> {
        const data = await Api.getFileToken(this.fileKey);
        return {
            token: data.access_token,
            expiresIn: data.expires_in
        }
    }

    // 需要返回当前文件信息
    protected override getFileInfo(): Promise<{
        name: string;
        fileKey: string;
        isEditor: boolean;
    }> {
        return Promise.resolve({
            name: "文件",
            fileKey: this.fileKey,
            isEditor: true
        });
    }

    // 需要返回当前用户信息
    protected override async getUserInfo(): Promise<{
        name: string;
        avatar: string;
    }> {
        return {
            name: "User",
            avatar: "",
        };
    }

    public fileKey = "";
}

export const sdkBoxHelper = new SdkBoxHelper(SDK_ORIGIN, {
    backEnable: true, // 是否显示左上角的返回按钮
    onBack() {
        alert("返回页面")
    },
    nameEditable: false, // 是否支持在boardmix sdk中修改文件名称
    coverEnable: true, // 是否支持封面设置
    setCover: async (cover: Blob) => {
        console.log("set cover", cover);
    },
    thumbnailEnable: true, // 是否支持缩略图设置
    setThumbnail: async (thumb: Blob) => {
        console.log("set thumb", thumb)
    },
    shareEnable: false, // 是否支持显示分享按钮
    async getFileUser() { // 获取关联用户列表，不实现则永远返回空列表
        return []
    }
});
