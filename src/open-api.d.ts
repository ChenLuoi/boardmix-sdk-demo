interface ImageInsertInfo {
  currentIndex: number;
  isCanDelete: boolean;
  totalList: {
    hash: string;
    mimeType: string;
    name: string;
  }[];
}

interface TableCellInfo {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
}

declare enum ArrowType {
  NONE = 1,
  TRIANGLE_STROKE,
  TRIANGLE_FILL,
  CIRCLE_STROKE,
  CIRCLE_FILL,
  DIAMOND_STROKE,
  DIAMOND_FILL,
  RIGHT,
  CONCAVE,
}

declare enum ConnLineTextAngleType {
  HORIZONTAL = 1,
  TANGENT_ANGLE = 2,
}

declare enum ConnLineTextBoxType {
  NONE,
  ROUND_BOX_WITH_COLOR,
}

declare enum FlexDirection {
  FD_None = 1,
  FD_Row = 2,
  FD_Column = 3,
}

declare enum JustifyContent { // 在主轴上的对齐方式
  JC_Start = 1,
  JC_End = 2,
  JC_Center = 3,
  JC_Between = 4,
  JC_Around = 5,
}

declare enum AlignItems { // 在交叉轴上的对齐方式
  AI_Start = 1,
  AI_End = 2,
  AI_Center = 3,
}

interface ContainerInfo {
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  paddingLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  mainAxisGap?: number;
}

/**软木板*/
declare enum CorkType {
  None = 0,
  CorkGrain = 1, //软木板纹理
  BlackboardShine = 2, //黑板反光
}

declare enum FoldPermissionType {
  None = 0,
  PublicFold = 1, //普通隐藏(所有人可隐藏显示)
  PrivateFold = 2, //仅我和文件所有者能隐藏显示
}

declare enum FrameType {
  FFT_custom = 1,
  FFT_A4 = 2,
  FFT_ratio_16_9 = 3,
  FFT_ratio_4_3 = 4,
  FFT_ratio_1_1 = 5,
  FFT_Phone = 6,
  FFT_Pad = 7,
  FFT_Web = 8,
  FFT_Selection = 9, //选区
  FFT_Cork = 10, //软木板
  FFT_ratio_3_4 = 11,
}

/**
 * 容器模型=>平板规格
 */
declare enum IPadType {
  IPT_None = 0,
  IPT_iPad_mini = 1,
  IPT_iPad_Pro11 = 2,
  IPT_iPad_Pro12_9 = 3,
  IPT_Surface_Pro8 = 4,
}

declare enum LockPermissionType {
  None = 0,
  PublicLock = 1, //普通锁定(所有人可锁定解锁)
  PrivateLock = 2, //仅我和文件所有者能锁定解锁
}

declare enum MMThemeType {
  // MM_BUSINESS_1 = 1,
  // MM_BUSINESS_2 = 2,
  // MM_CLASSIC_1 = 3,
  // MM_CLASSIC_2 = 4,
  // MM_PERSONALIZED_1 = 5,
  // MM_SIMPLE_1 = 6,
  MMTT_Classic_3 = 7,
  MMTT_Classic_4 = 8,
  MMTT_Rainbow_1 = 9,
  MMTT_Rainbow_2 = 10,

  MMTT_Rainbow_3 = 11,
  MMTT_Rainbow_4 = 12,
  MMTT_Rainbow_5 = 13,
  MMTT_Classic_5 = 14,
  MMTT_Classic_6 = 15,
  MMTT_Classic_7 = 16,
  MMTT_Rainbow_6 = 17,
  MMTT_Classic_8 = 18,
  MMTT_Rainbow_7 = 19,
}

declare enum MindMapCompactType {
  LARGER = 1, // 较大
  NORMAL = 2, // 正常
  HIGHLY_COMPACT = 3, //紧凑
}

declare enum MindMapLayoutType {
  HORIZONTAL = 1,
  VERTICAL = 2,
  TIMELINE_RIGHT = 3,
  TIMELINE_DOWN = 4,
  TREE_DOWN = 5,
}

declare enum ConnLineType {
  StraightLine = 1,
  Curve,
  RightAngle,
  FilletPlotLine,
}

declare enum MindMapLineType {
  CURVE = 1,
  POLYLINE = 2,
}

interface FillFormat {
  alpha?: number; // 0~255
  color?: number; // Number.parseInt('FFFFFFFF', 16)
  transparent?: boolean;
}

interface LineFormat extends FillFormat {
  lineWidth?: number;
  dashID?: number;
  lineArrowStart?: number;
  lineArrowEnd?: number;
}

interface MMBranchInfo {
  branchFormatChangeFlags: number;
  toSuperLineFormat: LineFormat;
}

interface MindMapInfo {
  leftSubStartIndex?: number;
  mmLayoutType?: MindMapLayoutType;
  mmConnLineType?: MindMapLineType;
  themeType?: MMThemeType;
  branchInfo?: MMBranchInfo;
}
declare enum ObjectType {
  NONE = 1,
  CANVAS,
  GROUP,
  FRAME,
  TEXT,
  SHAPE,
  MULSELECT,
  GUIDE,
  MMSHAPE,
  MMCONNECTOR,
  IMAGE,
  CONNECTLINE,
  Pencil = 13,
  Sticky = 14,
  FileImage = 15,
  EEDITABLE_FILE = 16,
  TABLE = 17,
  TABLE_CELL = 18,
  SEAL = 19,
  /**
   * @deprecated
   *
   * DOC_BLOCK 已改为 LAYOUT_BLOCKS
   */
  DOC_BLOCK = 20,
  ICONFONT = 21,
  POLYGON = 22,
  EMOJI = 23,
  ELEMENT_NODE = 24,
  CARD_BLOCKS = 25,
  SUMMARY_TYPE = 33,
  IFRAME = 37,
  EMBEDDED_IFRAME = 29,
  STICKER = 28,
  SWIM_LANE = 30,
  CARD_SET = 34,
  SVG_SHAPE = 35,
  ORG_SHAPE = 36,
  VIDEO = 39,
  AUDIO = 40,
  CHARTS = 42,
  ANNOTATION = 43,
  OPENAPI_CUSTOM_ELEMENT = 44,
  LATEX = 45,
  TAPE = 46,
  PPT_FRAME = 47,
  PPT = 48,
  LAYOUT_BLOCKS = 49,
  TITLE_STICKER = 50,
}

/**
 * 容器模型=>手机规格
 */
declare enum PhoneType {
  PT_None = 0,
  PT_iPhone_14 = 1,
  PT_iPhone_14Pro = 2,
  PT_iPhone_14Plus = 3,
  PT_iPhone_14ProMax = 4,
  PT_iPhone_13ProMax = 5,
  PT_iPhone_13_13Pro = 6,
  PT_iPhone_13mini = 7,
  PT_iPhone_SE = 8,
  PT_iPhone_8Plus = 9,
  PT_iPhone_8 = 10,
  PT_Android_Small = 11,
  PT_Android_Large = 12,
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

declare enum StickyType {
  ST_Square = 1,
  ST_Rectangle = 2,
}

interface TextStyle {
  splitPos?: number;
  foreground?: number;
  background?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  throughline?: boolean;
  fontSize?: number;
  ffontSize?: number;
}

declare enum AlignType {
  Left = 1,
  Right = 2,
  Center = 3,
}

declare enum VerticalAlignType {
  VAT_Up = 1,
  VAT_Down = 2,
  VAT_Center = 3,
}

interface FontName {
  family?: string;
}

declare enum TextBulletType {
  TBT_NONE = 1,
  TBT_NUMBER = 2,
  TBT_BULLET = 3,
  TBT_TASK = 4,
  TBT_CODE_NUMBER = 6,
}

declare enum PartHeaderType {
  PHS_None = 1,
  // PHS_Header_H = 2,
  PHS_Header_H1 = 3,
  PHS_Header_H2 = 4,
  PHS_Header_H3 = 5,
}

interface TextParagraphStyle {
  indentation?: number;
  bullet?: TextBulletType;
  // spacing: TextSpacing;
  partHeader?: PartHeaderType;
}

declare enum TextInitType {
  TIT_Normal = 1,
  TIT_Notation = 2,
  TIT_Reference = 3,
  TIT_CodeBlock = 4,
}

interface TextInfo {
  // byte[] content = 1;
  styles?: TextStyle[];
  aliginTypes?: AlignType;
  vAlignTypes?: VerticalAlignType;
  fontName?: FontName;
  hintFlag?: boolean;
  paragraphStyles?: TextParagraphStyle[];
  codeLanguage?: string;
  initType?: TextInitType;
  isAdaptFontSize?: boolean;
}

/**
 * 容器模型=>web规格
 */
declare enum WebType {
  WT_None = 0,
  WT_Desktop = 1,
  WT_Macbook_Air = 2,
  WT_Macbook_Pro14 = 3,
  WT_Macbook_Pro16 = 4,
  WT_Surface_Book = 5,
  WT_TV = 6,
  WT_FHD = 7,
}

declare enum ObjectAlignType {
  ALIGN_LEFT = 1,
  ALIGN_HORIZONTAL = 2,
  ALIGN_RIGHT = 3,
  ALIGN_TOP = 4,
  ALIGN_VERTICAL = 5,
  ALIGN_BOTTOM = 6,
  ALIGN_DISTRIBUTE_HORIZONTALLY = 7,
  ALIGN_DISTRIBUTE_VERTICALLY = 8,
}

declare enum SwitchShapeType {
  NONE = 0,
  BASIC_SHAPE = 1,
  FLOW_CHART_SHAPE = 2,
  UML_SHAPE = 3,
  BPMN_SHAPE = 4,
  ER_SHAPE = 5,
  DF_SHAPE = 6,
  NETWORK_SHAPE = 7,
  CISCO_SHAPE = 8,
  SCIENCE_SHAPE = 12,
}

declare enum ObjectChildType {
  None,
}

declare enum BasicShapeType {
  BST_Rect = 1,
  BST_RoundRect = 2,
  BST_Diamond = 3,
  BST_Ellipse = 4,
  BST_Triangle = 5,
  BST_BS_Star = 6,
  BST_Parallelogram = 7,
  BST_FCS_Trapezoid = 8,
  BST_FCS_Hexagon = 9,
  BST_FCS_Semicircle = 10,
  BST_FCS_DocInput = 11,
  BST_BS_Rect = 12,
  BST_BS_RoundRect = 13,
  BST_BS_Ellipse = 14,
  BST_BS_Diamond = 15,
  BST_BS_Parallelogram = 16,
  BST_BS_Triangle = 17,
  BST_BS_LeftArrow = 18,
  BST_BS_RightArrow = 19,
  BST_BS_RoundRectBubble = 20,
  BST_BS_EllipseBubble = 21,
  BST_BS_LeftBrackets = 22,
  BST_BS_RightBrackets = 23,
  BST_BS_Annotation = 24,

  BST_FCS_FlowChartRect = 25,
  BST_FCS_FlowChartRoundRect = 26,
  BST_FCS_Determine = 27,
  BST_FCS_Data = 28,
  BST_FCS_BeginRoundRect = 29,
  BST_FCS_BeginEllipse = 30,
  BST_FCS_BeginCircle = 31,
  BST_FCS_BevelRect = 32,
  BST_FCS_DataBase = 33,
  BST_FCS_DataSave = 34,
  BST_FCS_SubRoutine = 35,
  BST_FCS_PreProgram = 36,
  BST_FCS_InternalStorage = 37,
  BST_FCS_DirectData = 38,
  BST_FCS_PerforatedTape = 39,
  BST_FCS_ControlTransfer = 40,
  BST_FCS_FlowChartAnnotation = 41,
  BST_FCS_Delay = 42,
  BST_FCS_SequentialData = 43,
  BST_FCS_ManualInput = 44,
  BST_FCS_PunchedCard = 45,
  BST_FCS_ShowContents = 46,
  BST_FCS_ManualOperation = 47,
  BST_FCS_PerPare = 48,
  BST_FCS_Parallel = 49,
  BST_FCS_CycleLimit = 50,
  BST_FCS_CrossPageReference = 51,

  BST_BS_ChevronArrow = 52,
  BST_BS_SignalInArrow = 53,
  BST_BS_Arc = 54,
  BST_UML_UseCase = 55,
  BST_UML_Classifier = 56,
  BST_UML_Class = 57,
  BST_UML_Interface = 58,
  BST_UML_Container = 59,
  BST_UML_Note = 60,
  BST_UML_Component = 61,
  BST_UML_Template = 62,
  BST_UML_ComponentBox = 63,
  BST_UML_Gateway = 64,
  BST_UML_State = 65,
  BST_UML_OffPageLink = 66,
  BST_UML_SendSignal = 67,
  BST_UML_ReceiveSignal = 68,
  BST_UML_Activation = 69,
  BST_UML_Start = 70,
  BST_UML_End = 71,
  BST_UML_FlowFinal = 72,
  BST_UML_HistoryPseundostate = 73,
  BST_UML_Deletion = 74,
  // BST_UML_Pin = 75,
  BST_UML_PinRight = 76,
  BST_UML_PinLeft = 77,
  BST_UML_Assembly = 78,
  BST_UML_ProvidedInterface = 79,
  BST_UML_RequiredInterface = 80,
  BST_UML_HorizontalFork = 81,
  BST_UML_VerticalFork = 82,
  BST_UML_Package = 83,
  BST_UML_Frame = 84,
  BST_UML_Container2 = 85,
  BST_UML_Collaboration = 86,
  BST_UML_Actor = 87,
  BST_UML_Node = 88,
  BST_UML_Enter = 132,
  BST_UML_Callout = 133,
  BST_UML_UseCaseWithExpanR = 141,
  BST_UML_UseCaseWithExpanE = 142,
  BST_UML_SystemContainer = 143,
  BST_UML_Spot = 164,
  BST_UML_SequenceObject = 144,
  BST_UML_ActivateInterrupt = 145,
  BST_UML_AlternativeFragments = 150,
  BST_UML_ActorLifeLine = 156,
  BST_UML_ENTITY = 146,
  BST_UML_BOUNDARY = 147,
  BST_UML_CONTROL = 148,
  BST_UML_CONSTRANT = 149,
  BST_UML_SIMPLECLASS = 157,
  BST_UML_Multiple = 151,
  BST_UML_DataType = 158,
  BST_UML_Profile = 154,
  BST_UML_Model = 152,
  BST_UML_PackagingContainer = 155,
  BST_UML_Object = 168,
  BST_UML_Association = 153,
  BST_UML_Activity = 159,
  BST_UML_State1 = 160,
  BST_UML_State2 = 161,
  BST_UML_Suspend = 162,
  BST_UML_ReceiveEvents = 163,
  BST_UML_InitialNode = 165,
  BST_UML_FinalNode = 166,
  BST_UML_ForkNode = 167,

  BST_BPMN_Task = 89,
  BST_BPMN_Transaction = 90,
  BST_BPMN_EventSubProcess = 91,
  BST_BPMN_CallActivity = 92,
  BST_BPMN_Event = 93,
  BST_BPMN_IntermediateEvent = 94,
  BST_BPMN_EndEvent = 95,
  BST_BPMN_Choreography = 96,
  BST_BPMN_Conversation = 97,
  BST_BPMN_Gateway = 98,
  BST_BPMN_DataObject = 99,
  BST_BPMN_DataSave = 100,
  BST_BPMN_PoolBlackBox = 101,
  BST_BPMN_Annotation = 102,
  BST_BPMN_Group = 103,
  BST_BS_DownBrackets = 104,
  BST_BS_UpBrackets = 105,
  BST_BS_DoubleSideArrow = 106,
  BST_BS_TopArrow = 107,
  BST_BS_FreeRoundRect = 108,
  BST_UML_ObjectLifeLine = 109,
  BST_BS_LeftSignalInArrow = 110,
  BST_BS_LeftChevronArrow = 111,
  BST_FCS_LeftAnnotation = 112,

  //实体关系图(E-R图)
  BST_ER_Entity = 113,
  BST_ER_DerivedProperties = 114,
  BST_ER_KeyValueProperty = 115,
  BST_ER_MultivaluedAttribute = 116,
  BST_ER_WeakEntity = 117,
  BST_ER_Relation = 118,
  BST_ER_WeakTies = 119,
  BST_ER_Generalize = 120,
  BST_ER_GeneralizeAll = 121,

  //数据流图
  BST_DF_ExternalEntity1 = 122,
  BST_DF_ExternalEntity2 = 123,
  BST_DF_Process = 124,
  BST_DF_DataStore1 = 125,
  BST_DF_Process2 = 126,
  BST_DF_DataStore2 = 127,
  BST_DF_Process3 = 128,
  BST_DF_DataStore3 = 129,

  BST_FCS_DoubleCircle = 137, // 双圆形
  BST_FCS_ParallelogramAlt = 138, // 平行四边形
  BST_FCS_Asymmetric = 139, // 非对称图形

  BST_SE_LeftBrace = 171,
  BST_SE_RightBrace = 172,
  BST_SE_LeftSBrackets = 173,
  BST_SE_RightSBrackets = 174,
  BST_SE_LeftParentheses = 175,
  BST_SE_RightParentheses = 176,

  BASIC_SHAPE_SEMI_CIRCULAR = 169, // 基础图形-半圆
  BASIC_SHAPE_OVAL = 170, // 基础图形-椭圆
}

// c++ 定义的泳道相关枚举
declare const enum ETableFormat {
  eTF_Default = 0,
  eTF_SwimDefault1 = 1, // 水平泳道
  eTF_SwimDefault2 = 2, // 垂直泳道
  eTF_Horizontal_Swimlane = 3, // 水平泳道1
  eTF_Vertical_Swimlane = 4, // 垂直泳道1
  eTF_Matrix = 5, // 矩阵
}

declare enum Tool {
  NONE = 0,
  SELECT,
  HAND,
  VECTOR_PENCIL,
  ERASER,
  TYPE,

  SHAPE_RECTANGLE,
  SHAPE_ROUDRECT,
  SHAPE_ARC,
  SHAPE_ELLIPSE,
  SHAPE_TRIANGLE,
  SHAPE_STAR,

  SHAPE_LEFT_BRACKETS,
  SHAPE_RIGHT_ARROW,
  SHAPE_ANNOTATION,
  FLOWCHART_ROUNDRECT,
  FLOWCHART_DETERMINE,
  FLOWCHART_TRAPEZOID,
  FLOWCHART_DATABASE,
  FLOWCHART_INTERNAL_STORAGE,
  FLOWCHART_DOC_INPUT,
  FLOWCHART_BEVEL_RECT,
  FLOWCHART_SEMICIRCLE,
  FLOWCHART_RECT,
  // FLOWCHART_CROSSPAGEREFERENCE,

  SHAPE_LIBRARY,

  LINE_NOARROW,
  LINE_STRAIGHT,
  LINE_CURVE,
  LINE_POLYLINE,
  LINE_FILLET,
  COMMENT,
  NOTE,
  FRAME,
  FRAME_A4,
  FRAME_16_9,
  FRAME_4_3,
  FRAME_1_1,
  FRAME_PHONE,
  FRAME_PAD,
  FRAME_WEB,
  FRAME_ROW,
  FRAME_COLUMN,
  MMSHAPE,
  TABLE,

  OPE_SWIMLANE_TOOL,
  DOC_BLOCKS,
  LASER_POINTER,
  ICONFONT,
  OPE_POLYGON_TOOL,
  EMOJI,
  OPE_ELEMENTNODE_TOOL,
  OPE_SELECTELEMENTNODE_TOOL,
  OPE_IFRAMECARD_TOOL,
  OPE_FORMATBRUSH_TOOL,
  OPE_EMBEDDEDIFRAME_TOOL,
  PARALLELOGRAM,
  RESOURSE,
  CARD = 58,
  CARD_BOARD = 63,
  PENCIL_BRUSH = 66,
  PEN_BRUSH = 67,
  MAKER_BRUSH = 68,
  LINE_VARIABLEWIDTH = 69,
  LASSO = 70,
  FILL_PEN = 71,
  CRAYON = 72,
  FRAME_SELECTION = 73,
  OPE_FRAME_CORK_TOOL = 74,
  TAPE = 75,
  CODE = 76,
  FRAME_3_4 = 77,
  DASHED_PENCIL = 99,
  OPE_LAYOUTBLOCKS_TOOL = 100,
  SEAL_INTERACT = 144,
  EMOJI_INTERACT = 145,
  ICONFONT_PANEL = 990,
  EMOJI_PANEL = 991,
  RESOURSE_PANEL = 992,
  STICKER_PANEL = 993,
  PEXELS_PANEL = 994,
  BRAND_PANEL = 995,
  EDRAW_MAX = 997,
  TEMPLATE = 998,
  UPLOAD = 999,
  UPLOAD_SVG = 1000,
  UPLOAD_IMAGE = 1001,
  UPLOAD_FILE = 1002,
  UPLOAD_MINDMAP = 1004,
  UPLOAD_VIDEO = 1005,
  UPLOAD_AUDIO = 1006,
  AI_CREATE = 1007,
  CHARTS = 1008,
  INBOX = 1009,
  LATEX = 1010,
  APP_CENTER = 1011,
  CUSTOM = 2001,
  CUSTOM2 = 2002,
  AI_IMAGE = 2003,
  PPT = 2004,
  ONE_DRIVE = 2005,
  GOOGLE_DRIVE = 2006,
  SWIM_VERTICAL_LANE = 2007,
  SWIM_HORIZONTAL_LANE = 2008,
}

// c++ 定义的工具相关枚举
declare const enum EToolType {
  LevelLineTool = 30, // 水平线
  VerticalLineTool = 31, // 垂直线
  AssociationLineTool = 7,
  GeneralizationLineTool = 8,
  IncludeLineTool = 9,
  ExtendLineTool = 10,
  IncludeExtendLineTool = 16,
  SelfcallLineTool = 11,
  Excess1LineTool = 12,
  AsynmessageLineTool = 13,
  SelfempowerLineTool = 17,
  GenrightLineTool = 18,
  RealizationLineTool = 19,
  AggregationLineTool = 20,
  CompositionLineTool = 21,
  DependencyLineTool = 22,
  AssociationtxtLineTool = 14,
  LinkLineTool = 23,
  ControlflowLineTool = 15,
  ControlflowrightLineTool = 24,
}

// 所有子元素类型汇总
type AllObjectChildType =
  | ObjectChildType
  | BasicShapeType
  | ConnLineType
  | ETableFormat
  | EToolType;
declare enum PaintType {
  SOLID = 0,
  GRADIENT_LINEAR = 1,
  GRADIENT_RADIAL = 2,
  GRADIENT_ANGULAR = 3,
  GRADIENT_DIAMOND = 4,
  IMAGE = 5,
  EMOJI = 6,
}

interface Vector {
  x: number;
  y: number;
}

interface Guid {
  sessionID: number; //文档sessionID, 用户每次加入会话，服务器返回的唯一会话ID
  localID: number; //本地形状ID，每次会话从0开始，每新增一个形状加1
}
interface ColorRGBA {
  r: number;
  g: number;
  b: number;
  a?: number; //0-255
}

type TextAlign = "left" | "center" | "right";
type VerticalAlign = "top" | "middle" | "bottom";
declare enum BorderStyle {
  LINE = 1,
  DOT_LINE,
  SEG_LINE,
}

interface ObjectStyleOptions {
  textColor?: ColorRGBA;
  fontSize?: number;
  fontFamily?: string;
  textHAlign?: TextAlign;
  textVAlign?: VerticalAlign;
  fillColor?: ColorRGBA;
  fillOpacity?: number; //0-255
  strokeStyle?: BorderStyle;
  strokeOpacity?: number; //0-255
  strokeWidth?: number;
  strokeColor?: ColorRGBA;
}

interface ObjectOptions {
  shapeType?: ObjectType;
  childType?: AllObjectChildType;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  content?: string;
  style?: ObjectStyleOptions;
}

interface FillPaint {
  color: ColorRGBA;
  opacity?: number; //0-255
  transparent?: boolean;
  type?: PaintType;
}

interface ObjectRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

type CreateObjectOptions = Omit<ObjectOptions, "shapeType" | "childType">;

type FrameOptions = CreateObjectOptions & {
  childType?: number;
  protoFrameType?: number;
  layout?: number;
  style?: {
    strokeWidth?: number;
  };
  fDir?: number;
};

type StickyOptions = CreateObjectOptions & {
  childType?: number;
  style?: {
    fillColor?: ColorRGBA;
  };
};

type MMOptions = CreateObjectOptions & {
  themeType?: MMThemeType;
  layoutType?: MindMapLayoutType;
  compactType?: MindMapCompactType;
};

type TableOptions = CreateObjectOptions & {
  cols: number;
  rows: number;
  style?: {
    strokeColor?: ColorRGBA;
  };
};

/**
 * 二维矩阵
 */
type Mat = {
  M00: number;
  M01: number;
  M02: number;
  M10: number;
  M11: number;
  M12: number;
  M20: number;
  M21: number;
  M22: number;
};

interface StrokeInfo {
  arrowEnd?: ArrowType;
  arrowStart?: ArrowType;
  dashPattern?: number;
  strokePaints?: FillPaint;
  strokeWidth?: number;
}

interface StyleProps {
  arrowEnd: ArrowType;
  arrowStart: ArrowType;
  dashPattern: number;
  fillPaints: FillPaint[];
  strokePaints: FillPaint[];
  strokeWidth: number;
}

interface IOpenApi {
  getView(): ObjectRect;
  setView(options: ObjectRect): void;
  getZoom(): { zoom: number };
  /**
   * 设置缩放比
   * @param zoom 0-4
   */
  setZoom(zoom: number): void;
  zoomTo(options: { guids: Guid[] }): void;
  createFrame(options: FrameOptions): FrameObjectProps;
  createSticky(options: StickyOptions): StickyObjectProps;
  createShape(options: CreateObjectOptions): ShapeObjectProps;
  createText(options: CreateObjectOptions): TextObjectProps;
  createMM(options: MMOptions): MMObjectProps;
  createTable(options: TableOptions): TableObjectProps;
  createConnector(options: CreateObjectOptions): ConnectorObjectProps;
  createIframe(options: CreateObjectOptions): IframeObjectProps;
  bringToFront(guid: Guid): void;
  remove(guid: Guid): void;
  sendToBack(guid: Guid): void;
  getById(guid: Guid): BaseObjectProps;
  getSelect(): { guids: Guid[]; mulID: Guid };
  select(options?: { guids?: Guid[]; types?: number[] }): {
    guids: Guid[];
    mulID: Guid;
  };
  filterByType(options: {
    guids: Guid[];
    types: number[];
    childTypes: number[];
  }): {
    guids: Guid[];
  };
  deselect(options: { guids: Guid[]; types: number[] }): { guids: Guid[] };
  move(options: {
    sessionID: number;
    localID: number;
    x: number;
    y: number;
  }): void;
  moveTo(options: {
    sessionID: number;
    localID: number;
    x: number;
    y: number;
  }): void;
  setEffectVisible(options: {
    sessionID: number;
    localID: number;
    haveShadow: boolean;
  }): void;
  getStyle(guid: Guid): StyleProps;
  getObjectType(guid: Guid): { type: number };
  resize(options: {
    sessionID: number;
    localID: number;
    width: number;
    height: number;
  }): void;
  getWidth(guid: Guid): { width: number };
  setWidth(guid: Guid, width: number): void;
  getHeight(guid: Guid): { height: number };
  setHeight(guid: Guid, height: number): void;
  getRotation(guid: Guid): { rotation: number };
  setRotation(guid: Guid, angle: number): void;
  getRadius(guid: Guid): { radius: number };
  setRadius(guid: Guid, radius: number): void;
  getParentId(guid: Guid): Guid;
  getChildId(guid: Guid, recurse: boolean): Guid[];
  isLocked(guid: Guid): { locked: boolean };
  isVisible(guid: Guid): { visible: boolean };
  getPosition(guid: Guid): Vector;
  setLocked(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  setFold(options: {
    id: Guid;
    fold: boolean;
    foldType?: number;
    foldUserID?: string;
  }): void;
  getFold(): { fold: boolean };
  getTransform(): { mat: Mat };
  lineStart(guid: Guid): { guid: Guid; x: number; y: number };
  lineEnd(guid: Guid): { guid: Guid; x: number; y: number };
  frameAddItem(options: { frameId: Guid; guids: Guid[] }): void;
  frameRemoveItem(options: { frameId: Guid; guids: Guid[] }): void;
  frameShowContent(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  frameTitle(guid: Guid): { title: string };
  MMAddSub(options: { superID: Guid; subIDs: Guid[] }): void;
  MMLayout(options: {
    sessionID: number;
    localID: number;
    layout: number;
  }): void;
  setTextForeground(options: { guid: Guid; color: ColorRGBA }): void;
  setTextBackground(options: { guid: Guid; color: ColorRGBA }): void;
  setTextBold(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  setTextItalic(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  setTextUnderline(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  setTextThroughLine(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  setTextPartHeader(options: {
    sessionID: number;
    localID: number;
    param: number;
  }): void;
  setTextContent(options: {
    sessionID: number;
    localID: number;
    param: string;
  }): void;
  setTextVAlign(options: {
    sessionID: number;
    localID: number;
    param: number;
  }): void;
  setTextHAlign(options: {
    sessionID: number;
    localID: number;
    param: number;
  }): void;
  setTextFamily(options: {
    sessionID: number;
    localID: number;
    param: string;
  }): void;
  getFillStyle(guid: Guid): { fillPaints: FillPaint[] };
  getOpacity(guid: Guid): { opacity: boolean };
  setFillStyle(options: FillPaint & { id: Guid }): void;
  setFillOpacity(options: {
    sessionID: number;
    localID: number;
    opacity: number;
  }): void;
  setFillType(options: {
    sessionID: number;
    localID: number;
    type: number;
  }): void;
  setFillTransparent(options: {
    sessionID: number;
    localID: number;
    flag: boolean;
  }): void;
  setFillColor(options: { id: Guid; color: ColorRGBA }): void;
  getStrokeStyle(guid: Guid): StrokeInfo;
  setStrokeStyle(options: StrokeInfo & { id: Guid }): void;
  setDashArray(options: { id: Guid; dashArray: number[] }): void;
  setArrowStart(options: {
    sessionID: number;
    localID: number;
    arrowStart: ArrowType;
  }): void;
  setArrowEnd(options: {
    sessionID: number;
    localID: number;
    arrowEnd: ArrowType;
  }): void;
  setDashPattern(options: {
    sessionID: number;
    localID: number;
    dashPattern: number;
  }): void;
  setStrokeWidth(options: {
    sessionID: number;
    localID: number;
    width: number;
  }): void;
  setStrokeColor(options: { id: Guid; color: ColorRGBA }): void;
  setStrokeOpacity(options: {
    sessionID: number;
    localID: number;
    opacity: number;
  }): void;
}
interface BaseObjectProps {
  angle: number;
  arrowEnd: ArrowType;
  arrowStart: ArrowType;
  canAddBindFile: boolean;
  canAddBindHyperLink: boolean;
  centerX: number;
  centerY: number;
  customType: string;
  dashPattern: number;
  fillPaints: FillPaint[];
  foldType: FoldPermissionType;
  foldUserID: string;
  folded: boolean;
  guid: Guid;
  height: number;
  imageInsertInfo: ImageInsertInfo;
  imageNum: number;
  increment: boolean;
  isBindElementNode: boolean;
  isHaveCorner: boolean;
  itemAlign: ObjectAlignType;
  lockType: LockPermissionType;
  lockUserID: string;
  locked: boolean;
  minLimitHeight: number;
  minLimitWidth: number;
  objChildType: AllObjectChildType;
  objectType: ObjectType;
  shadowStatus: boolean;
  strokePaints: FillPaint[];
  strokeWidth: number;
  width: number;
  x: number;
  y: number;
  yMax: number;
  yMin: number;
}

interface MMObjectProps extends BaseObjectProps {
  isExistNotation: boolean;
  isShowVerticalAlign: boolean;
  name: string;
  shapeType: SwitchShapeType;
  textInfo: TextInfo;
  MMDefaultFillStatus: boolean;
  MMDefaultStrokeStatus: boolean;
  MMDefaultToSuperStatus: boolean;
  MMTreeHeight: number;
  isExistAnnotation: boolean;
  mindMapInfo: MindMapInfo;
  shapeGenerateType: number; //new
  showResetFormatButton: boolean; //new
  toSuperLineColor: number;
}

interface FrameObjectProps extends BaseObjectProps {
  containerInfo: ContainerInfo;
  cornerRadius: number;
  frameType: FrameType;
  isDisplayOutFrame: boolean;
  isExistNotation: boolean;
  isShowDevice: boolean;
  isShowVerticalAlign: boolean;
  name: string;
  protoFrameType?: PhoneType | IPadType | WebType | CorkType;
  textInfo: TextInfo;
  shapeType: SwitchShapeType;
}

interface StickyObjectProps extends BaseObjectProps {
  isExistNotation: boolean;
  isShowVerticalAlign: boolean;
  name: string;
  shapeType: SwitchShapeType;
  textInfo: TextInfo;
  hideSign: boolean;
  isActivatedSticky: boolean;
  isActivatedStickyTime: boolean;
  isActivatedStickyUser: boolean;
  isHideNameMenu: boolean;
  isUsedStickyUser: boolean; //new
  selectedStickyTime: number;
  stickyType: StickyType;
}

interface ShapeObjectProps extends BaseObjectProps {
  cornerRadius: number;
  isExistNotation: boolean;
  isShowVerticalAlign: boolean;
  name: string;
  shapeType: SwitchShapeType;
  textInfo: TextInfo;
}

interface TextObjectProps extends BaseObjectProps {
  isExistNotation: boolean;
  isShowVerticalAlign: boolean;
  name: string;
  shapeType: SwitchShapeType;
  textInfo: TextInfo;
}

interface TableObjectProps extends BaseObjectProps {
  isExistNotation: boolean;
  isShowVerticalAlign: boolean;
  name: string;
  shapeType: SwitchShapeType;
  textInfo: TextInfo;
  isTableAdjustTextHeight: boolean;
  tableCellInfo: TableCellInfo;
}

interface ConnectorObjectProps extends BaseObjectProps {
  canInsertItem: boolean;
  canInsertText: boolean;
  isBasicConnectLine: boolean;
  isShowJumpLine: boolean;
  textAngleType: ConnLineTextAngleType;
  textBoxType: ConnLineTextBoxType;
}

interface IframeObjectProps extends BaseObjectProps {
  iFrameType: string;
  isExistNotation: boolean;
  isHaveImage: boolean;
  isShowBorder: boolean;
  isShowDescribe: boolean;
  isShowImage: boolean;
  isShowTitle: boolean;
  isShowVerticalAlign: boolean;
  isSplitScreen: boolean;
  lockAspectRatio: boolean;
  name: string;
  shapeType: SwitchShapeType;
  strokeWeight: number;
  textInfo: TextInfo;
}
