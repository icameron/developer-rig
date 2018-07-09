/// <reference types="eventemitter2" />
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import { ExtensionAnchor, ExternalExtensionState, ExtensionFeatures, ExtensionMode, ExtensionPlatform } from './constants';
import { ExtensionDisplayState, ExtensionObject } from './models';
import { IContextManager } from './context/contextManager';
import { Dobbin, IExtensionTracker } from './tracking/extensionTracker';
import { IExtensionCoordinator, ComponentExtensionPosition } from './coordinator/extensionCoordinator';
import { IFunctionManager } from './functionManager/functionManager';
import { PurchaseService } from './purchaseService';
import { IHelperPubsubAdapter } from './pubsub/helper-pubsub-adapter';
export interface IExtensionFrame {
    destroy(): void;
    linkIdentity(): void;
    unlinkIdentity(): void;
    /**
     * Used to track when a panel extension is scrolled on-screen.
     */
    visibilityChanged(): void;
    /**
     * Updates the extension visibility state.
     *
     * This triggers the `twitch-ext-visibility-changed` message to the extension helper if the visibility has changed.
     * Setting the frame to its current visibility does not emit an event.
     *
     * When the visibility is set to `true` the `twitch-ext-visibility-changed` message includes a new context.
     * When using the `postContext()` API a new context should be posted prior to setting the extension to visible
     * to ensure the extension is given an up-to-date context object.
     *
     * When an extension is not visible, the extension will not receive any `twitch-ext-visibility-changed` messages.
     *
     * **Important:** This method should not be called before the `extensionFrameLoaded` event
     * has been emitted. Any attempt to do so will be ignored.
     *
     * @param isVisible `false` if the extension is no longer visible, otherwise `true`.
     */
    setVisible(isVisible: boolean): void;
    setPosition(position: ComponentExtensionPosition): void;
}
export interface TrackingOptions {
    login: string | null;
    channel: string;
    device_id: string;
    platform: string;
    player_type: string;
}
export interface InitialPurchasePayload {
    action: string;
    payload: {
        sku: string;
    };
}
export interface DisplayExtensionProduct {
    description: string;
    developerName: string;
    displayPrice: string;
    extensionName: string;
    shortDescription: string;
    sku: string;
    title: string;
}
export declare type onBeginPurchaseType = (options: DisplayExtensionProduct, makePurchase: () => Promise<void>) => void;
export interface ExtensionFrameOptions {
    anchor: ExtensionAnchor;
    dobbin: Dobbin;
    iframeClassName: string;
    mode: ExtensionMode;
    parentElement: HTMLElement;
    language?: string;
    locale?: string;
    platform: ExtensionPlatform;
    extension: ExtensionObject;
    loginId: number | null;
    channelId: number;
    trackingProperties: TrackingOptions;
    getDisplayState?: () => ExtensionDisplayState;
    extensionCoordinator?: IExtensionCoordinator;
    contextManager?: IContextManager;
    extensionTracker?: IExtensionTracker;
    purchaseService?: PurchaseService;
    onBeginPurchase?: onBeginPurchaseType;
    functionManager?: IFunctionManager;
    helperPubsubAdapter?: IHelperPubsubAdapter;
    features?: Partial<ExtensionFeatures>;
}
export interface ExtensionInitOptions {
    anchor: ExtensionAnchor;
    language: string;
    mode: ExtensionMode;
    state: ExternalExtensionState;
    platform: ExtensionPlatform;
}
export declare class ExtensionFrame extends EventEmitter implements IExtensionFrame {
    params: ExtensionFrameOptions;
    private extensionProductsCache?;
    private extensionBitsProductsCache?;
    private extension;
    private helperPubsubAdapter;
    private lastSequenceInfoMap;
    private handleUserAction;
    readonly tracker: IExtensionTracker;
    private readonly contextManager;
    private readonly coordinator;
    private readonly extensionOptions;
    private readonly functionManager;
    private readonly language;
    private readonly locale;
    private readonly purchaseService;
    private readonly canRequestIdLink;
    private hasSentViewEvent;
    private hasBootstrapped;
    private hasLoaded;
    private iframe;
    private eventListeners;
    private throttleDblClick;
    private onBeginPurchase?;
    private isVisible;
    constructor(params: ExtensionFrameOptions);
    destroy: () => void;
    linkIdentity: () => void;
    unlinkIdentity: () => void;
    visibilityChanged: () => void;
    setVisible: (isVisible: boolean) => void;
    setPosition: (position: ComponentExtensionPosition) => void;
    private buildTracker;
    private buildContextManager;
    private buildCoordinator;
    private buildFunctionManager;
    private buildPurchaseService;
    private getExtensionHeight;
    private getDefaultAnchorAttributes;
    private getAnchorAttributes;
    private applyAnchorAttributes;
    private createViewerSandboxAttrs();
    private getConfigWhitelist();
    private applyViewerSandboxAttrs(iframe);
    private applyConfigSandboxAttrs(iframe);
    private createSupervisorIFrame;
    private initSupervisedExtension;
    private getExtensionAuth;
    private onLongtask;
    private onMouseEnter;
    private handleToken;
    private shouldReloadExtension;
    private onExtensionLoaded;
    private onExtensionUserAction;
    private onExtensionPubSubRecived;
    private trackSequence(topic, target, sequenceStart, sequenceNumber);
    private onExtensionNetworkTraffic;
    private emitConfirmationRequest;
    private sendAuthUpdate;
    private sendBootstrap;
    /**
     * Identity link is enabled for the all of the following are satisfied
     * 1. user is logged in
     * 2. user is not the broadcaster
     * 3. user has already linked with the extension OR the extension requests identity linking
     */
    private sendIdentityLinkUpdate;
    private beginPurchase;
    private onContextUpdate;
    private setupListeners;
    private reloadExtension;
    private unsetupListeners;
    private registerFunctionModals;
    private unregisterFunctionModals;
    private handlePurchaseCompleted;
    private showBitsBalance;
    private showUseBitsSuccess;
    private handleBitsTransactionCompleted;
    private readonly extensionProducts;
    private readonly extensionBitsProducts;
    private formatExtensionProductForDisplay(extensionProductPayload);
    private sendExtensionProductPrices();
    private sendExtensionBitsProductPrices();
    private sendExtensionDisplayState();
    private bindHelperPubsub();
}
