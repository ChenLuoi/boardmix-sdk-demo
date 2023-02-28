declare type SdkEventBoxToApp = "INIT_CONFIG" | "START_LOADING" | "STOP_LOADING"
    | "SET_ACCESS_TOKEN" | "SET_USER_INFO";
declare type SdkEventAppToBox =
    "PAGE_PREPARED" // boardmix应用已准备完成，可以开始进行文件加载
    | "GET_ACCESS_TOKEN" // boardmix请求获取access_token
    | "GET_USER_INFO" // boardmix请求获取当前用户信息
    | "GET_FILE_INFO" // boardmix请求获取当前文件信息
    | "UPDATE_FILE_NAME" // boardmix侧用户修改了文件名称，发送事件请求更新
    | "UPDATE_FILE_COVER" // boardmix侧用户修改了文件封面，发送事件请求更新
    | "UPDATE_FILE_THUMBNAIL" // boardmix侧缩略图变更，发送事件请求更新
    | "BACK_TO_HOME" // boardmix侧用户点击返回，发送事件请求退出页面
    | "START_SHARE" // boardmix侧用户点击分享按钮，发送事件请求
    | "REPORT_USER_ACTIVE"
    | "SHARE_WITH_NODE" // boardmix侧用户分享指定图元，发送事件请求
    | "REQUEST_LOGIN" // 特定情况下，用户未登录访问，用户点击登录按钮
    | "GET_FILE_USERS" // 部分功能需要关联用户列表，boardmix发送事件请求对应数据
declare abstract class SdkBase {
    public on(event: string, handler: Func);

    public once(event: string, handler: Func);

    public off(event: string, handler: Func);

    public removeAllListener(event: string);

    public emit(event: string, ...args: any[]);
}

declare abstract class BoardMixSdk extends SdkBase {
    constructor(origin: string, option: SdkBoxOption);

    public bindIframe(iframeEle: HTMLIFrameElement): void;

    public loadFile(fileKey: string): void;

    public override sendMessage(
        key: SdkEventBoxToApp,
        value?: Obj,
        promiseId?: number,
        reply?: boolean
    ): void;

    protected abstract getAccessToken(): Promise<{
        token: string;
        expiresIn: number;
    }>;

    protected abstract getUserInfo(): Promise<{
        name: string;
        avatar: string;
    }>;

    protected abstract getFileInfo(): Promise<{
        name: string;
        fileKey: string;
        isEditor: boolean;
        loginType?: TargetLoginType;
    }>;
}

type OptionName =
    | {
    nameEditable: false;
}
    | {
    nameEditable: true;
    updateFileName: (name: string) => Promise<string>;
};
type OptionShare =
    | {
    shareEnable: false;
}
    | {
    shareEnable: true;
    onShare: () => void;
    onShareWithNode: (nodeId: string) => void;
};
type OptionBack =
    | {
    backEnable: false;
}
    | {
    backEnable: true;
    onBack: () => void;
};
type OptionCover =
    | { coverEnable: false }
    | { coverEnable: true; setCover: (cover: Blob) => Promise<void> };
type OptionThumbnail =
    | { thumbnailEnable: false }
    | { thumbnailEnable: true; setThumbnail: (cover: Blob) => Promise<void> };
type OptionFileUsers = {
    getFileUser?: () => Promise<
        {
            id: number;
            avatar: string;
            name: string;
            mobile?: string;
            email?: string;
        }[]
    >;
};
declare type SdkBoxOption = OptionName &
    OptionShare &
    OptionBack &
    OptionCover &
    OptionThumbnail &
    OptionFileUsers;
declare type TargetLoginType = 1 | 2 // 1 编辑， 2 查看