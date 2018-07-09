import { PubsubEnvironments } from 'pubsub-js-client';
import { PubsubMessage } from './models';
export declare type MessageCallback = (payload: PubsubMessage | string) => void;
export declare type UnsubscribeCallback = () => void;
export interface SubscribeOptions {
    topic: string;
    success: () => void;
    failure: (error: string) => void;
    message: MessageCallback;
    token?: string;
}
export interface IPubsub {
    setEnvironment(environment: PubsubEnvironments): void;
    subscribe(options: SubscribeOptions): () => void;
}
export declare class Pubsub implements IPubsub {
    private driver;
    setEnvironment(environment: PubsubEnvironments): void;
    subscribe(options: SubscribeOptions): UnsubscribeCallback;
    private unsubscribe(topic, callback);
    private createSubscribeCallback(callback);
}
