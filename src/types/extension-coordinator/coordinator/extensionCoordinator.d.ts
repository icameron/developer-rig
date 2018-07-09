/// <reference types="eventemitter2" />
import { ExtensionAction, SupervisorAction, ExtensionFeatures } from '../constants';
import { ComponentExtensionPosition } from '../models';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import { Context } from '../context/contextManager';
import { Token } from '../tokens/token';
import { OutgoingFunctionMessage } from '../functionManager/functionManager';
import { ExtensionProductsResponse } from '../api/extensions';
import { BitsProduct } from '../api/bits';
export { ComponentExtensionPosition } from '../models';
export declare enum Initiator {
    CurrentUser = "current_user",
    Other = "other",
}
export interface ContextMessage {
    readonly action: ExtensionAction.TwitchExtContext;
    context: Context;
    updatedFields: Array<string>;
}
export interface ExtensionAuth {
    channelId: string;
    clientId: string;
    token: Token['token'];
    userId: string;
}
export interface ExtensionAuthMessage {
    readonly action: ExtensionAction.TwitchExtAuth;
    auth: ExtensionAuth;
}
export interface ExtensionBootstrapMessage {
    readonly action: ExtensionAction.TwitchExtBootstrap;
    auth: ExtensionAuth;
    features: ExtensionFeatures;
}
export interface ExtensionProductPricePayload {
    displayPrice: string;
}
export interface ExtensionProductPricesPayload {
    [index: string]: ExtensionProductPricePayload;
}
export interface ExtensionProductPricesMessage {
    readonly action: ExtensionAction.TwitchExtProductPrices;
    prices: ExtensionProductPricesPayload;
}
export interface ErrorMessage {
    readonly action: ExtensionAction.TwitchExtError;
    message: string;
}
export interface RefreshMessage {
    readonly action: ExtensionAction.TwitchExtReload;
}
export interface SupervisorInitMessage {
    readonly action: typeof SupervisorAction.SupervisorInit;
    options: SupervisorInitOptions;
}
export interface ReloadEntitlementsMessage {
    readonly action: ExtensionAction.TwitchExtReloadEntitlements;
}
export interface VisibilityChangedMessage {
    readonly action: ExtensionAction.TwitchExtVisibilityChanged;
    isVisible: boolean;
    context: Context | null;
}
export interface PositionChangedMessage {
    readonly action: ExtensionAction.TwitchExtPositionChanged;
    position: ComponentExtensionPosition;
}
export interface ExtensionBitsProducts {
    readonly action: typeof ExtensionAction.TwitchExtBitsProducts;
    products: BitsProduct[];
}
export interface ExtensionBitsTransactionComplete {
    readonly action: typeof ExtensionAction.TwitchExtBitsTransactionComplete;
    product: BitsProduct;
    transactionId: string;
    userId: string;
    displayName: string;
    initiator: Initiator;
    transactionReceipt: string;
}
export interface ForwardHelperPubsubMessage {
    readonly action: ExtensionAction.TwitchExtPubsubMessage;
    payload: {
        target: string;
        contentType: string;
        content: string[];
    };
}
export interface ForwardHelperPubsubBindFailureMessage {
    readonly action: ExtensionAction.TwitchExtPubsubBindFailure;
    payload: {
        target: string;
        error: string;
    };
}
export declare type OutboundMessage = ContextMessage | ExtensionAuthMessage | ExtensionBootstrapMessage | ExtensionProductPricesMessage | ErrorMessage | RefreshMessage | OutgoingFunctionMessage | ReloadEntitlementsMessage | SupervisorInitMessage | VisibilityChangedMessage | ExtensionBitsProducts | ExtensionBitsTransactionComplete | PositionChangedMessage | ForwardHelperPubsubMessage | ForwardHelperPubsubBindFailureMessage;
export interface TwitchExtLoadedMessage {
    readonly action: ExtensionAction.TwitchExtLoaded;
}
export interface TwitchExtLongtaskMessage {
    readonly action: ExtensionAction.TwitchExtBootstrap;
    payload: {
        longtask_duration: number;
    };
}
export interface TwitchExtUserActionMessage {
    readonly action: ExtensionAction.TwitchExtUserAction;
    payload: {
        type: 'click' | 'dblclick' | 'mousemove' | 'focusin';
        clientX: number;
        clientY: number;
    };
}
export interface TwitchExtNetworkTimingMessage {
    readonly action: ExtensionAction.TwitchExtNetworkTiming;
    payload: {
        duration: number;
        endTime: number;
        startTime: number;
        url: string;
    };
}
export interface SupervisorReadyMessage {
    readonly action: SupervisorAction.SupervisorReady;
}
export interface TwitchExtBeginPurchase {
    readonly action: ExtensionAction.TwitchExtBeginPurchase;
    payload: {
        sku: string;
    };
}
export interface TwitchExtUseBits {
    readonly action: ExtensionAction.TwitchExtUseBits;
    sku: string;
}
export interface TwitchExtBitsOnHover {
    readonly action: ExtensionAction.TwitchExtBitsOnHover;
}
export interface TwitchExtPubSubMessage {
    readonly action: ExtensionAction.TwitchExtPubSubReceived;
    payload: {
        target: string;
        topic: string;
        sequenceNumber: number;
        sequenceStart: string;
    };
}
export interface TwitchExtPubsubListenMessage {
    readonly action: ExtensionAction.TwitchExtPubsubListen;
    target: string;
}
export interface TwitchExtPubsubUnlistenMessage {
    readonly action: ExtensionAction.TwitchExtPubsubUnlisten;
    target: string;
}
export declare type InboundMessage = TwitchExtLoadedMessage | TwitchExtLongtaskMessage | TwitchExtUserActionMessage | TwitchExtNetworkTimingMessage | TwitchExtBeginPurchase | SupervisorReadyMessage | TwitchExtUseBits | TwitchExtBitsOnHover | TwitchExtPubSubMessage | TwitchExtPubsubListenMessage | TwitchExtPubsubUnlistenMessage;
export interface IExtensionCoordinator {
    destroy(): void;
    sendExtensionAuth(auth: ExtensionAuthMessage['auth']): void;
    sendExtensionBootstrap(auth: ExtensionAuthMessage['auth']): void;
    sendContext(context: ContextMessage['context'], updatedFields: ContextMessage['updatedFields']): void;
    sendExtensionReloadMessage(): void;
    sendExtensionProductPricesMessage(payload: ExtensionProductsResponse): void;
    sendSupervisorInit(initOptions: SupervisorInitOptions): void;
    sendFunctionReply(reply: OutgoingFunctionMessage): void;
    sendExtensionReloadEntitlementsMessage(): void;
    sendVisibilityChanged(isVisible: VisibilityChangedMessage['isVisible'], context: VisibilityChangedMessage['context']): void;
    sendPositionChange(position: ComponentExtensionPosition): void;
    sendBitsProductsMessage(products: BitsProduct[]): void;
    sendBitsTransactionCompleteMessage(completeMessage: ExtensionBitsTransactionComplete): void;
    sendHelperPubsubMessage(target: string, contentType: string, content: string[]): void;
    sendHelperPubsubBindFailure(target: string, error: string): void;
    on(event: string | string[], listener: Function): EventEmitter;
    off(event: string, listener: Function): EventEmitter;
    emit(event: string | string[], {}: {}): boolean;
}
export declare class ExtensionCoordinator extends EventEmitter implements IExtensionCoordinator {
    private iframe;
    private featureOverrides;
    constructor(iframe: HTMLIFrameElement, featureOverrides?: Partial<ExtensionFeatures>);
    destroy: () => void;
    sendContext: (context: Context, updatedFields: string[]) => void;
    sendExtensionAuth: (auth: ExtensionAuth) => void;
    sendExtensionBootstrap: (auth: ExtensionAuth) => void;
    sendExtensionReloadMessage(): void;
    sendExtensionProductPricesMessage(payload: ExtensionProductsResponse): void;
    sendSupervisorInit: (initOptions: SupervisorInitOptions) => void;
    sendFunctionReply: (reply: OutgoingFunctionMessage) => void;
    sendExtensionReloadEntitlementsMessage: () => void;
    sendVisibilityChanged: (isVisible: boolean, context: Context | null) => void;
    sendPositionChange: (position: ComponentExtensionPosition) => void;
    sendBitsProductsMessage: (products: BitsProduct[]) => void;
    sendBitsTransactionCompleteMessage: (completeMessage: ExtensionBitsTransactionComplete) => void;
    sendHelperPubsubMessage: (target: string, contentType: string, content: string[]) => void;
    sendHelperPubsubBindFailure: (target: string, error: string) => void;
    private handleMessage;
    private handleExtensionAction;
    private sendMessage;
}
