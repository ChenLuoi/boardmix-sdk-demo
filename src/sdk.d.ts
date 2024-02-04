interface ActionToolbar {
  icon: string;
  label: string;
  action: "event" | "expand";
  key: string;
}

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

type InjectFloatToolItem = {
  icon: string;
  tips?: string;
  key: string;
  type: "single" | "multiple";
  supportElements?: string[];
} & (
  | { action: "event" | Func }
  | {
      action: "group";
      children: InjectFloatToolChildItem[];
    }
);

type CustomElement = {
  icon: string;
  name: string;
  key: string;
};

type AiUpgradeUI = {
  upgradeText: string;
  upgradeIcon: string;
  pointText: string;
  pointTips: string;
  pointIcon: string;
};

type FeatureOperation = 0 | 1 | 2;

interface FeatureConfig {
  export: boolean;
  exportBdx: boolean;
  embedEnable: boolean;
  groupWork: false | "NORMAL" | "CONTROLLED";
  helpCenter: boolean;
  userConduct: boolean;
  feedback: boolean;
  changelog: FeatureOperation;
  shortcutPanel: boolean;
  shortcutDoc: FeatureOperation;
  downloadClient: boolean;
  reportFile: boolean;
  instructions: boolean;
  presentationMode: "normal" | "force";
  videoConferencing: boolean;
}

declare type SdkEventBoxToApp = {
  START_LOADING: {
    fileKey: string;
    role: "editor" | "viewer";
    token?: string;
    isSimple?: boolean; // 是否JD临时屏蔽版本
    thumbConfig?: {
      mode?: "debounce" | "throttle";
      // debounce 最后一次修改{interval}时间后，提交缩略图，中间每次修改都会导致计时重置
      // throttle 首次修改后{interval}时间后，提交缩略图，中间每次修改都会被忽略
      interval?: number; // 等待时间，单位毫秒
      emitOnStart?: true; // 是否在文件打开时提交一次缩略图
    };
  };
  STOP_LOADING: void;
  OPEN_API_INJECT_UI: {
    icon?: {
      headerBack?: string;
    };
    toolbar?: ToolbarGroup[];
    tutorialList?: {
      title: string;
      list: {
        content: string;
        cover: string;
        title: string;
      }[];
    }[];
    floatToolbar?: InjectFloatToolItem[];
    leftHeader?: CustomElement[];
    customElements?: CustomElement[];
    aiUpgradeUI?: AiUpgradeUI | boolean;
    loadingVersion?: "v1";
    // 注入外部字体
    appendFonts?: {
      name: string; // 字体的展示名称，当不存在icon时，预览会直接展示name的文本
      fontFamily: string; // 字体名font-family
      data: string | Uint8Array; // 字体数据，支持url或二进制流，当为url的时候，需要接入方处理资源跨域
      icon?: string; // 字体预览图片，支持base64图片或者url，当为url的时候，需要接入方处理资源跨域
    }[];
  };
  OPEN_API_CREATE: {
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
  SET_FEATURE_CONFIG: Partial<FeatureConfig>;
  UPDATE_FILE_NAME: { name: string };
  TRIGGER_ACTION: {
    action: "airdrop" | "open-history";
  };
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
