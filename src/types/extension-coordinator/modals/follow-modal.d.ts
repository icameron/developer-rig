import { IModal } from './modal';
import { FollowFunctionMessage } from '../functionManager/functionManager';
import { IExtensionTracker } from '../tracking/extensionTracker';
export interface FollowModalOptions {
    channel: string | null;
    channelId: number;
    isFollowing: boolean;
    isLoggedIn: boolean;
}
export interface FollowModalResult {
    didFollow: boolean;
    notifications: boolean;
}
export declare class FollowModal implements IModal {
    private loginId;
    private tracker;
    private channel;
    private channelId;
    private openCallback;
    private replyCallback;
    private failReason;
    constructor(loginId: number | null, tracker: IExtensionTracker);
    readonly defaultResult: FollowModalResult;
    open(message: FollowFunctionMessage): void;
    close: () => void;
    onModalResult: (replyCallback: (result: FollowModalResult) => void) => void;
    onOpen: (openCallback: (options: FollowModalOptions) => void) => void;
    resultCallback: (result: FollowModalResult) => void;
    private follow;
}
