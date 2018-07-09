import { FollowModalOptions, FollowModalResult } from './follow-modal';
import { BitsConfirmationModalOptions, BitsConfirmationModalResult } from './bits-confirmation-modal';
export declare type ModalOptions = FollowModalOptions | BitsConfirmationModalOptions;
export declare type ModalResult = FollowModalResult | BitsConfirmationModalResult | null;
export interface IModal {
    open: (message?: {}) => void;
    close: () => void;
    onOpen: (openCallback: (options?: ModalOptions) => void) => void;
    onModalResult: (replyCallback: (message: {}) => void) => void;
    resultCallback: (result: ModalResult) => void;
    defaultResult: ModalResult;
}
