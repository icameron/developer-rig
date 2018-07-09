/// <reference types="eventemitter2" />
import { ExtensionActivationConfig } from './models/extension';
import { IPubsub } from './pubsub/pubsub';
import { ExtensionPurchaseMessage, ExtensionBitsTransactionMessage } from './pubsub/models';
import { ExtensionsByChannelResponse } from './api/extensions';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import { Context } from './context/contextManager';
export interface ControlHandlers {
    onShouldFetchExtensions: () => void;
    onDestroyExtension: (extensionId: string) => void;
    onActivationChanged?: (extensionId: string, activationConfig: ExtensionActivationConfig) => void;
}
export interface EnvironmentOptions {
    authToken?: string;
    env?: string;
    apiUrl?: string;
}
export declare type onPurchaseCompletedCallback = (payload: ExtensionPurchaseMessage) => void;
export declare type onBitsTransactionCompletedCallback = (payload: ExtensionBitsTransactionMessage) => void;
export declare const EVENT_PLAYER_CONTEXT_UPDATE = "playercontext";
export declare const EVENT_CONTEXT_UPDATE = "contextupdate";
export declare const BITS_TRANSACTION_PREFIX = "bits-ext-v1-transaction";
export declare const BITS_TRANSACTION_SINGLE_USER_PREFIX = "bits-ext-v1-user-transaction";
export declare class ExtensionService extends EventEmitter {
    player?: Player;
    private pubsub;
    private currentChannelId;
    private playerWindow;
    private currentControlHandlers;
    private broadcastSettingsUnsubscribe?;
    private currentChannelUnsubscribe;
    private currentExtensionUnsubscribes;
    private hasPurchaseCompletedSubscriptionList;
    private hasBitsTransactionCompletedSubscriptionList;
    constructor(pubsub?: IPubsub);
    getInstalledExtensions(channelId: string): Promise<ExtensionsByChannelResponse>;
    registerExtensionInstallations(extensionInstallationResponse: ExtensionsByChannelResponse): ExtensionsByChannelResponse;
    setEnvironmentOptions(options: EnvironmentOptions): void;
    /**
     * Called when a channel is loaded in order to subscribe to channel specific topics
     */
    subscribeToExtensionControl(channelId: string, controlHandlers: ControlHandlers): void;
    /**
     * Called when a channel is unloaded in order to unsubscribe from channel specific topics
     */
    unsubscribeFromExtensionControl(channelId: string): void;
    /**
     * Sets the public player property on the service so that contextManager can ask for
     * the information it needs and sets up listeners on the proper events from player.
     * We don't listen to theatre mode and fullscreen directly because displayResolution
     * will cause PLAYER_STATS_UPDATE to fire and those stats will be bundled with the
     * resolution change.
     */
    registerPlayer(player: Player): void;
    /**
     * Disables stats if necessary and removes event listeners from the player. This is
     * typically called when a player is destroyed (inside player-ui) or a player is unmounted
     * from a page (twilight/web-client). It's completely possible in the latter cases
     * that the player never completely mounted onto the page so we need to make sure it's
     * been set before we try calling methods on it.
     */
    unregisterPlayer(): void;
    setPlayerWindow(playerWindow: Window): void;
    postContext(context: Partial<Context>): void;
    listenForContext(): void;
    onPurchaseCompleted(loginId: number, callback: onPurchaseCompletedCallback): void;
    onBitsTransactionCompleted(channelId: number, clientId: string, userId: number | null, callback: onBitsTransactionCompletedCallback): void;
    private onPlayerContextUpdate;
    private onTwilightContextUpdate;
    private onSubscribeFailure(error);
    private onSubscribeSuccess();
    private onExtensionControlMessage;
    private onExtensionMassControlMessage;
    private onBroadcastSettingsUpdateMessage;
    private getPubsubEnvironment(clientEnvironment);
    private subscribeToMassExtensionControl(extensionId);
}
export declare const extensionService: ExtensionService;
