import { IModal, ModalResult } from './modal';
export declare class SimpleRequestModal implements IModal {
    private openCallback;
    readonly defaultResult: ModalResult;
    open(): void;
    close: () => void;
    onOpen: (openCallback: () => void) => void;
    onModalResult: (replyCallback: (message: {}) => void) => void;
    resultCallback: (result: null) => void;
}
