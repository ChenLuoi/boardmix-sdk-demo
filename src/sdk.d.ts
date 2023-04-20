declare type SdkEventBoxToApp =
  | "INIT_CONFIG"
  | "START_LOADING"
  | "STOP_LOADING"
  | "SET_ACCESS_TOKEN"
  | "SET_USER_INFO";

type SdkAppEventParams = {
  PAGE_PREPARED: void;
  GET_ACCESS_TOKEN: void;
  GET_USER_INFO: void;
  GET_FILE_INFO: void;
  UPDATE_FILE_NAME: void;
  UPDATE_FILE_COVER: void;
  UPDATE_FILE_THUMBNAIL: void;
  BACK_TO_HOME: void;
  START_SHARE: void;
  REPORT_USER_ACTIVE: void;
  SHARE_WITH_CODE: { nodeId: string };
  REQUEST_LOGIN: void;
  GET_FILE_USERS: void;
};

declare type SdkEventAppToBox = keyof SdkAppEventParams;

declare abstract class SdkBase<T extends keyof SdkAppEventParams> {
  public on(event: T, handler: (params: SdkAppEventParams[T]) => void);

  public once(event: T, handler: (params: SdkAppEventParams[T]) => void);

  public off(event: T, handler: (params: SdkAppEventParams[T]) => void);

  public removeAllListener(event: T);

  public emit(event: T, params: SdkAppEventParams[T]);
}

declare abstract class BoardMixSdk extends SdkBase<SdkEventAppToBox> {
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
declare type TargetLoginType = 1 | 2; // 1 编辑， 2 查看
