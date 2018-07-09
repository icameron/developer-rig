import { ExtensionAnchor, ExtensionMode, ExtensionState, ExtensionActivationStatus, ExtensionPlatform } from '../constants';
export declare enum ExtensionViewType {
    Component = "component",
    Config = "config",
    Hidden = "hidden",
    LiveConfig = "liveConfig",
    Mobile = "mobile",
    Panel = "panel",
    VideoOverlay = "videoOverlay",
}
export declare type ExtensionView = {
    viewerUrl: string;
};
export declare type ComponentView = ExtensionView & {
    aspectHeight: number;
    aspectWidth: number;
    zoom: boolean;
    zoomPixels: number;
};
export declare type ConfigView = ExtensionView;
export declare type HiddenView = ExtensionView;
export declare type LiveConfigView = ExtensionView;
export declare type MobileView = ExtensionView;
export declare type PanelView = ExtensionView & {
    height: number;
};
export declare type VideoOverlayView = ExtensionView;
export declare type ExtensionViews = {
    [ExtensionViewType.Component]?: ComponentView;
    [ExtensionViewType.Config]?: ConfigView;
    [ExtensionViewType.Hidden]?: HiddenView;
    [ExtensionViewType.LiveConfig]?: LiveConfigView;
    [ExtensionViewType.Mobile]?: MobileView;
    [ExtensionViewType.Panel]?: PanelView;
    [ExtensionViewType.VideoOverlay]?: VideoOverlayView;
};
export interface ExtensionIcons {
    square24?: string;
    square100: string;
    discoverySplash?: string;
}
export interface ExtensionObject {
    authorName: string;
    bitsEnabled: boolean;
    clientId: string;
    description: string;
    iconUrl: string;
    iconUrls: ExtensionIcons;
    id: string;
    name: string;
    requestIdentityLink: boolean;
    sku: string;
    summary: string;
    token: string;
    version: string;
    views: ExtensionViews;
    vendorCode: string;
    state: ExtensionState;
    whitelistedConfigUrls: Array<string>;
    whitelistedPanelUrls: Array<string>;
}
export interface ExtensionActivationConfig {
    anchor: ExtensionAnchor;
    slot: string;
    state: ExtensionActivationStatus;
    x?: number;
    y?: number;
}
export interface ExtensionInstallation {
    id: string;
    extension: ExtensionObject;
    activationConfig: ExtensionActivationConfig;
}
export interface ComponentExtensionPosition {
    x: number;
    y: number;
}
export interface ComponentDisplayState {
    anchor: ExtensionAnchor.Component;
    position: ComponentExtensionPosition;
    isVisible: boolean;
}
export interface OverlayDisplayState {
    anchor: ExtensionAnchor.Overlay;
    isVisible: boolean;
}
export declare type ExtensionDisplayState = ComponentDisplayState | OverlayDisplayState;
export declare class Extension {
    private extension;
    constructor(extension: ExtensionObject);
    readonly clientId: string;
    readonly bitsEnabled: boolean;
    readonly description: string;
    readonly id: string;
    readonly name: string;
    readonly requestIdentityLink: boolean;
    readonly sku: string;
    readonly summary: string;
    readonly token: string;
    readonly version: string;
    readonly views: ExtensionViews;
    readonly vendorCode: string;
    readonly state: ExtensionState;
    readonly whitelistedConfigUrls: string[];
    readonly whitelistedPanelUrls: string[];
    readonly asObject: ExtensionObject;
    readonly panelHeight: number | undefined;
    readonly isMonetized: boolean;
    getViewerUrlForContext(platform: ExtensionPlatform, mode: ExtensionMode, anchor: ExtensionAnchor): string;
    private getViewerUrlForWeb(mode, anchor);
    private getViewerUrlForMobile(mode);
    private getViewerUrlForAnchor(anchor);
}
