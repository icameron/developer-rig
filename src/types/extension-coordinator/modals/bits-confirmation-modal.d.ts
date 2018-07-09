import { IModal } from './modal';
import { BitsProductsResponse } from '../api/bits';
import { IExtensionTracker, ExtensionUseBitsTrackingProperties } from '../tracking/extensionTracker';
import { UseBitsFunctionMessage } from '../functionManager/functionManager';
import { IPubsub } from '../pubsub/pubsub';
import { Extension } from '../models';
export interface BitsConfirmationModalOptions {
    payload?: {
        channelId: string;
        clientId: string;
        userId: string | null;
        isLoggedIn: boolean;
        sku: string;
        bitsRequired: number | undefined;
        transactionId: string;
        extensionItemLabel: string;
        extensionName: string;
        bitsBalance: number;
        track: (eventName: string, props: ExtensionUseBitsTrackingProperties) => void;
    };
    error?: Error;
}
export interface OpenBitsConfirmationModalOptions {
    channelId: string;
    sku: string;
    bitsRequired: number | undefined;
    transactionId: string;
    extensionItemLabel: string;
    bitsBalance: number;
}
export interface BitsConfirmationModalResult {
    didConfirm: boolean;
    didUseBits: boolean;
    bitsBalance?: number;
}
export declare class BitsConfirmationModal implements IModal {
    private loginId;
    private tracker;
    private pubsub;
    private onSuccess;
    private extension;
    private extensionBitsProducts;
    private useBitsInProgress;
    private channelId;
    private openCallback;
    private replyCallback;
    private failReason;
    private extensionItemLabel;
    private sku;
    private bitsBalance;
    private bitsRequired;
    private token;
    private transactionId;
    constructor(loginId: string | null, tracker: IExtensionTracker, pubsub: IPubsub, onSuccess: (bitsBalance: number) => void, extension: Extension, extensionBitsProducts: Promise<BitsProductsResponse>);
    readonly defaultResult: BitsConfirmationModalResult;
    open(payload: UseBitsFunctionMessage): void;
    close: (didConfirm?: boolean) => void;
    onModalResult: (replyCallback: (result: BitsConfirmationModalResult) => void) => void;
    onOpen: (openCallback: (options: BitsConfirmationModalOptions) => void) => void;
    resultCallback: (result: BitsConfirmationModalResult) => Promise<number | void>;
    private useBitsPromptRequired;
    private openBitsConfirmationModal;
    private unsubscribeCallback;
    private useBitsInExtension;
    private handleUseBitsError;
    private track;
    private onBitsBalanceUpdate(userId);
    private offBitsBalanceUpdate(userId);
}
