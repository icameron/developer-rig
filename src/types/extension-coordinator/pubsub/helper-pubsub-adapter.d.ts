import { IPubsub } from './pubsub';
import { IExtensionTracker } from '../tracking/extensionTracker';
import { ExtensionAuth, IExtensionCoordinator } from '../coordinator/extensionCoordinator';
export interface IHelperPubsubAdapter {
    destroy: () => void;
    listen: (target: string) => void;
    unlisten: (target: string) => void;
    updateAuthData: (authData: ExtensionAuth) => void;
}
export declare class HelperPubsubAdapter {
    private coordinator;
    private tracker;
    private authData;
    private pubsub;
    private unsubscribeMap;
    private lastSequenceInfoMap;
    constructor(coordinator: IExtensionCoordinator, tracker: IExtensionTracker, authData?: ExtensionAuth | undefined, pubsub?: IPubsub);
    destroy(): void;
    listen(target: string): void;
    unlisten(target: string): void;
    updateAuthData(authData: ExtensionAuth): void;
    private onHelperListenMessage;
    private onHelperUnlistenMessage;
    private onSubscribeSuccess;
    private createSubscribeFailureCallbackForTarget;
    private createCallbackForTarget;
    private isExtensionTarget(target);
    private convertToTopic(target);
    private trackSequence(topic, target, sequenceStart, sequenceNumber);
}
