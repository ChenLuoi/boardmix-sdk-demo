interface ActionToolbar {
    icon: string;
    label: string;
    action: "event" | "expand";
    key: string;
}

type TutorialItem = {
    content: string;
    cover: string;
    title: string;
};

type TutorialGroup = {
    title: string;
    list: TutorialItem[];
};

/**
 * 水印配置
 */
type WatermarkConfig = {
    show?: boolean; //是否显示
    entName?: string; //企业名称
    userName?: string; //用户名
    account?: string; //账号尾号
    customize?: string; //自定义文本内容
    fontSize?: number; //字体大小
    transparency?: number; //透明度 0-100
    spacing?: number; //间距 0-100
    angle?: number; //倾斜角度 0-100, 当为100时，角度为180
};

type InjectFloatToolChildItem = {
    label: string;
    icon?: string;
    key: string;
} & (
    | { action: "event" }
    | {
          action: "group";
          children: InjectFloatToolChildItem[];
      }
);
type InjectFloatToolItem = {
    icon: string;
    tips?: string;
    key: string;
    type: InjectFloatToolType;
} & (
    | { action: "event" }
    | {
          action: "group";
          children: InjectFloatToolChildItem[];
      }
);

type InjectFloatToolType = "single" | "multiple";

// 可展开的工具栏组
type ToolbarGroup =
    | {
          icon: string;
          label: string;
          key: string;
          action: "group";
          children: ActionToolbar[];
      }
    | ActionToolbar;

type ChartsData = {
    title?: string;
    itemType: CHARTS_TYPE;
    data: ChartsDataItem[];
    config: ChartsDataConfig;
};

type ChartsDataConfig = {
    showLabel: boolean;
    showValue: boolean;
    radius?: string | string[];
};

type ChartsDataItem = {
    label: string;
    value: number;
    color: number;
};

enum CHARTS_TYPE {
    LINE_CHART = 1, //折线图
    LINE_AREA_CHART = 2, //折线面积图
    HISTOGRAM = 3, //柱状图
    REVERSE_HISTOGRAM = 4, //条形图
    PIE_CHART = 5, //饼状图
    RING_CHART = 6, //环形图
}

type BaseOpenApiContainerInfo = {
    businessData: string;
    strokeColor: string;
    strokeWidth: number;
    fillColor: string;
    position?: {
        x: number;
        y: number;
    };
    contents: (
        | {
              type: "image";
              width: number;
              height: number;
              left: number;
              top: number;
              imageData: File | Blob;
          }
        | {
              type: "rect";
              width: number;
              height: number;
              left: number;
              top: number;
              strokeColor: string;
              strokeWidth: number;
              fillColor: string;
          }
        | {
              type: "text";
              width?: number;
              left: number;
              top: number;
              textInfo: {
                  textContent: string;
                  textForeground?: string;
                  textBackground?: string;
                  fontSize?: number;
                  "font-weight"?: string;
                  "line-height"?: number;
              }[];
          }
    )[];
};

interface GroupOpenApiContainerInfo<T> {
    type: "group";
    children: (T | GroupOpenApiContainerInfo<T>)[];
    position?: {
        x: number;
        y: number;
    };
    attributes: {
        columnNum: number; // 一行最多子节点数，无此字段时表示不换行
        horizontalGap: number;
        verticalGap: number;
        scaledWidth?: number; // 若子节点为资源组件，将其等比缩放至宽度为此值
        addFrame?: boolean; // 是否添加容器
        frameName?: string;
        framePadding?: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
    };
}

type GuidNode = {
    type: string;
    guid: string;
};

declare type SdkEventBoxToApp = {
    START_LOADING: {
        fileKey: string;
        role: "editor" | "viewer";
        token?: string;
        roadMapNodeGuid?: string;
    };
    STOP_LOADING: void;
    OPEN_API_INJECT_UI: {
        icon?: {
            headerBack?: string;
        };
        toolbar?: ToolbarGroup[];
        tutorialList?: TutorialGroup[]; //操作指引视频
        floatToolbar?: InjectFloatToolItem[];
    };
    OPEN_API_CREATE:
        | BaseOpenApiContainerInfo
        | GroupOpenApiContainerInfo<BaseOpenApiContainerInfo>;
    OPEN_API_CLASSIFY: GroupOpenApiContainerInfo<GuidNode>;
    OPEN_API_UPDATE: any;
    UPDATE_WATERMARK_CONFIG: WatermarkConfig; //设置水印配置, 传入参数类型 WatermarkConfig
    OPEN_API_CREATE_NATIVE_ELEMENT: NativeElementOptions;
};

type NativeElementOptions =
    | {
          type: "chart";
          position?: {
              x: number;
              y: number;
          };
          data: { formData: ChartsData; color?: number };
      }
    | {
          type: "text";
          position?: {
              x: number;
              y: number;
          };
          width: number;
          textInfo: any[];
      };

/**
 * Key: [paramType, returnType]
 */
declare type SdkPromiseEventAppToBox = {
    GET_ACCESS_TOKEN: [void, { token: string; expiresIn: number }];
    GET_USER_INFO: [void, { name: string; avatar: string; userId?: number }];
    GET_FILE_INFO: [
        void,
        {
            isEditor: boolean;
            name: string;
            fileKey: string;
            loginType?: TargetLoginType;
        }
    ];
    UPDATE_FILE_NAME: [{ name: string }, void];
    UPDATE_FILE_COVER: [{ data: Blob }, void];
    UPDATE_FILE_THUMBNAIL: [{ data: Blob }, void];
    GET_FILE_USERS: [
        void,
        {
            id: number;
            avatar: string;
            name: string;
            mobile?: string;
            email?: string;
        }[]
    ];
};

type SdkPromiseEventAppToBoxParamDef<
    T extends keyof SdkPromiseEventAppToBox = keyof SdkPromiseEventAppToBox
> = {
    [key: T]: SdkPromiseEventAppToBox[T][0];
};

declare type SdkEventAppToBox = {
    PAGE_PREPARED: void;
    BACK_TO_HOME: void;
    START_SHARE: void;
    REPORT_USER_ACTIVE: void;
    SHARE_WITH_CODE: { nodeId: string };
    REQUEST_LOGIN: void;
    OPEN_LINK: { url: string };
    LOADING_FILE_START: void;
    LOADING_FILE_SUCCESS: void;
    LOADING_FILE_FAIL: void;
    OPEN_API_EVENT_CALLBACK:
        | {
              type: "board";
              key: string;
              guid: string;
              businessData: string;
          }
        | {
              type: "toolbar";
              groupKey: string;
              key: string;
              position: {
                  left: number;
                  top: number;
                  centerY: number;
              };
          }
        | {
              type: "boardv2";
              key: string;
              data: { businessData: string; guid: string; imageGuid: string }[];
          };
    OPEN_API_TOOLBAR_CLOSE: {
        key: string;
    };
    WINDOW_KEY_DOWN: Pick<
        KeyboardEvent,
        | "type"
        | "code"
        | "altKey"
        | "composed"
        | "ctrlKey"
        | "detail"
        | "keyCode"
        | "isComposing"
        | "key"
        | "metaKey"
        | "shiftKey"
        | "which"
    >;
    COPY_EMBED: {
        roadMapNodeGuid?: string;
        fileKey: string;
        action: "code" | "link";
    };
    HELP_CENTER_ACTION: {
        action:
            | "USER_CONDUCT" //用户行为规范
            | "DOWN_CLIENT" //下载客户端
            | "CHANGELOG" //更新日志
            | "FEEDBACK" //问题反馈
            | "SHORTCUT"; //快捷键文档
    };
} & SdkPromiseEventAppToBoxParamDef;

declare abstract class SdkBase<T> {
    public on<K extends keyof T = keyof T>(
        event: K,
        handler: (params: T[K]) => void
    );

    public once<K extends keyof T = keyof T>(
        event: K,
        handler: (params: T[K]) => void
    );

    public off<K extends keyof T = keyof T>(
        event: K,
        handler: (params: T[K]) => void
    );

    public removeAllListener<K extends keyof T = keyof T>(event: K);

    public emit<K extends keyof T = keyof T>(event: K, params: T[K]);
}

declare abstract class BoardMixSdk extends SdkBase<SdkEventAppToBox> {
    constructor(origin: string, option: SdkBoxOption);

    public bindIframe(iframeEle: HTMLIFrameElement): void;
    //功能配置
    public sendFeatureConfig(config: Partial<FeatureConfig>): void;
    public override sendMessage<T extends keyof SdkEventBoxToApp>(
        key: T,
        value?: SdkEventBoxToApp[T],
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
        userId?: number;
    }>;

    protected abstract getFileInfo(): Promise<{
        name: string;
        fileKey: string;
        isEditor: boolean;
        loginType?: TargetLoginType;
    }>;
}

type OptionBase = {
    clientId?: string;
};

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
declare type SdkBoxOption = OptionBase &
    OptionName &
    OptionShare &
    OptionBack &
    OptionCover &
    OptionThumbnail &
    OptionFileUsers;
declare type TargetLoginType = 1 | 2; // 1 编辑， 2 查看

declare type FeatureConfig = {
    groupWork: false | "NORMAL" | "CONTROLLED";
    /**
     * 是否开启导出功能
     */
    export: boolean;
    /**
     * 是否开启第三方嵌入功能（UI内部实现，复制功能外部实现）
     */
    embedEnable: boolean;
    /**
     * 帮助中心
     */
    helpCenter: boolean;
    /**
     * 用户行为规范（外部实现）
     */
    userConduct: boolean;
    /**
     * 问题反馈（外部实现）
     */
    feedback: boolean;
    /**
     * 更新日志（可选外部实现）
     */
    changelog: FeatureOperation;
    /**
     * 快捷键浮窗
     */
    shortcutPanel: boolean;
    /**
     * 快捷键文档（可选外部实现）
     */
    shortcutDoc: FeatureOperation;
    /**
     * 下载客户端（外部实现）
     */
    downloadClient: boolean;
    /**
     * 举报文件（外部实现）
     */
    reportFile: boolean;
    /**
     * 操作指引（需要外部数据支持）
     */
    instructions: boolean;
};

declare type HelpCenterConfig = {
    /**
     * 用户行为规范
     */
    userConduct?: boolean;
    /**
     * 问题反馈
     */
    feedback?: boolean;
    /**
     * 更新日志
     */
    changelog?: boolean;
    /**
     * 快捷键
     */
    shortcut?: boolean;
    /**
     * 操作指引
     */
    instructions?: boolean;
    /**
     * 下载客户端
     */
    downloadClient?: boolean;
    /**
     * 举报文件
     */
    reportFile?: boolean;
};
