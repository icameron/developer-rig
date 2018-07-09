import { ExtensionActivationConfig } from '../models/extension';
export interface ActivationMessage {
    extensionId: string;
    extensionVersion: string;
    maxDelayMS: number;
    status: 'activate' | 'anchor_changed' | 'deactivate' | 'mass_deactivate' | 'uninstall';
    activationConfig?: ExtensionActivationConfig;
}
export interface ExtensionPurchaseMessage {
    msg: {
        asin: string;
        content_type: string;
        sku: string;
        twitch_user_id: string;
        vendor_code: string;
    };
    time: string;
    type: string;
}
export interface ExtensionBitsTransactionMessage {
    transaction_id: string;
    time: string;
    sku: string;
    user_id: string;
    display_name: string;
    channel_id: string;
    transactionReceipt: string;
}
export interface ExtensionChannelTopicMessage {
    content_type: string;
    content: string[];
    sequence: {
        number: number;
        start: string;
    };
}
export interface BitsBalanceUpdateMessage {
    type: string;
    data: BitsBalanceUpdate;
    version: string;
    message_type: BitsUpdateType.Balance;
    message_id: string;
}
export declare enum BitsUpdateType {
    Badge = "badge_update",
    Balance = "balance_update",
}
export interface BitsBalanceUpdate {
    user_id: string;
    balance: number;
    channel_total?: number;
}
export interface BroadcastSettingsUpdateMessage {
    channel_id: string;
    old_game: string;
    game: string;
}
export declare type PubsubMessage = (ActivationMessage | ExtensionPurchaseMessage | ExtensionBitsTransactionMessage | ExtensionChannelTopicMessage | BitsBalanceUpdateMessage | BroadcastSettingsUpdateMessage);
