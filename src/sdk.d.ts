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

declare type SdkEventBoxToApp = {
  START_LOADING: {
    fileKey: string;
    role: "editor" | "viewer";
    token?: string;
  };
  STOP_LOADING: void;
  OPEN_API_INJECT_UI: {
    icon?: {
      headerBack?: string;
    };
    toolbar?: ToolbarGroup[];
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
  OPEN_LINK: void;
  LOADING_FILE_START: void;
  LOADING_FILE_SUCCESS: void;
  LOADING_FILE_FAIL: void;
  OPEN_API_EVENT_CALLBACK: {
    type: "board";
    key: string;
    guid: string;
    businessData: string;
  } & {
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

declare abstract class SdkBase<T, K extends keyof T> {
  public on(event: K, handler: (params: T[K]) => void);

  public once(event: K, handler: (params: T[K]) => void);

  public off(event: K, handler: (params: T[K]) => void);

  public removeAllListener(event: K);

  public emit(event: K, params: T[K]);
}

declare abstract class BoardMixSdk extends SdkBase<SdkEventAppToBox> {
  constructor(origin: string, option: SdkBoxOption);

  public bindIframe(iframeEle: HTMLIFrameElement): void;

  public loadFile(fileKey: string): void;

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
