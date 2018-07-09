import { FunctionAction } from '../constants';
import { IExtensionCoordinator } from '../coordinator/extensionCoordinator';
import { IModal, ModalOptions, ModalResult } from '../modals/modal';
import { FollowModalOptions, FollowModalResult } from '../modals/follow-modal';
import { BitsConfirmationModalOptions, BitsConfirmationModalResult } from '../modals/bits-confirmation-modal';
export interface FollowStatusRequestMessage {
    readonly action: typeof FunctionAction.FollowStatusRequest;
    payload: {
        channel: string;
    };
}
export interface FollowFunctionMessage {
    readonly action: typeof FunctionAction.FollowAction;
    payload: {
        channel: string;
    };
}
export interface FollowStatusResponseMessage {
    readonly action: typeof FunctionAction.FollowStatusResponse;
    followResponse: {
        channel: string;
        isFollowed: boolean;
    };
}
export interface FollowCompleteMessage {
    readonly action: typeof FunctionAction.FollowComplete;
    channel: string | null;
    didFollow: boolean;
}
export interface UseBitsFunctionMessage {
    readonly action: typeof FunctionAction.UseBits;
    sku: string;
}
export interface UseBitsCompleteMessage {
    readonly action: typeof FunctionAction.UseBitsComplete;
    didConfirm: boolean;
    didUseBits: boolean;
}
export interface IdShareRequestMessage {
    readonly action: typeof FunctionAction.IdShareRequest;
}
export declare type IncomingFunctionMessage = FollowFunctionMessage | FollowStatusRequestMessage | UseBitsFunctionMessage;
export declare type OutgoingFunctionMessage = FollowCompleteMessage | FollowStatusResponseMessage | UseBitsCompleteMessage;
export interface ConfirmationRequest {
    readonly action: FunctionAction;
    options?: ModalOptions;
    resultCallback?: (result: ModalResult) => void;
    defaultResult?: ModalResult;
}
export interface FollowConfirmationRequest extends ConfirmationRequest {
    readonly action: FunctionAction.FollowAction;
    options: FollowModalOptions;
    resultCallback: (result: FollowModalResult) => void;
    defaultResult: FollowModalResult;
}
export interface UseBitsConfirmationRequest extends ConfirmationRequest {
    readonly action: FunctionAction.UseBits;
    options: BitsConfirmationModalOptions;
    resultCallback: (result: BitsConfirmationModalResult) => Promise<number | void>;
    defaultResult: BitsConfirmationModalResult;
}
export interface IdShareConfirmationRequest extends ConfirmationRequest {
    readonly action: FunctionAction.IdShareRequest;
}
export interface IFunctionManager {
    registerFunctionModal: (functionName: FunctionAction, modal: IModal) => void;
    unregisterFunctionModal: (functionName: FunctionAction) => void;
}
export declare class FunctionManager {
    private coordinator;
    private loginId;
    private emitConfirmationRequest;
    private functionActionMap;
    private functionModalMap;
    constructor(coordinator: IExtensionCoordinator, loginId: number | null, emitConfirmationRequest: (confirmationRequest: ConfirmationRequest) => void);
    registerFunctionModal: (functionName: FunctionAction, modal: IModal) => void;
    unregisterFunctionModal: (functionName: string) => void;
    private functionActionHandler;
    private requestConfirmation;
    private sendFunctionReply;
}
