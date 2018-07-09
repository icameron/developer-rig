import { ExtensionAnchor, ExtensionMode } from '../constants';
import { Extension } from '../models';
export interface Dobbin {
    trackEvent(eventName: string, properties: object, services: Array<'spade' | 'mixpanel'>): void;
}
export interface RequiredTrackingProperties {
    login: string | null;
    login_id: number | null;
    channel: string;
    channel_id: number;
    device_id: string;
    platform: string;
    player_type: string;
    locale: string;
}
export interface CommonTrackingProperties {
    user_agent: string;
    url: string;
    host: string;
    domain: string;
    referrer_url: string;
    referrer_host: string;
    extension_id: Extension['clientId'];
    extension_version: Extension['version'];
    extension_anchor: ExtensionAnchor;
    extension_mode: ExtensionMode;
}
export interface ExtensionPubSubMissedProperties {
    target: string;
    topic: string;
    last_missed_sequence_number: string;
    first_missed_sequence_number: string;
    missed: string;
    sequence_start: string;
}
export interface ExtensionPubSubProperties {
    target: string;
    topic: string;
    sequence_number: string;
    sequence_start: string;
}
export declare enum ExtensionFollowFailReason {
    Cancelled = "cancelled",
    LoggedOut = "logged_out_user",
    InvalidId = "invalid_id",
    AlreadyFollowed = "already_followed",
}
export interface ExtensionFollowProperties {
    target_channel: string;
    target_channel_id: string;
}
export declare type ExtensionFollowFailProperties = ExtensionFollowProperties & {
    fail_reason: ExtensionFollowFailReason;
};
export declare enum ExtensionUseBitsFailReason {
    Cancelled = "cancelled",
    LoggedOut = "logged_out_user",
    InvalidID = "invalid_id",
    UserIneligible = "user_ineligible",
    InsufficientBalance = "insufficient_balance",
    UnableToGetEligibility = "unable_to_get_eligibility",
    UnableToLinkUser = "unable_to_link_user",
    UseBitsFailure = "use_bits_failure",
}
export interface ExtensionUseBitsProperties {
    target_channel_id: string;
    user_id: string;
    client_id: string;
    fail_reason: string;
    extension_name: string;
    extension_item_label: string;
    sku: string;
    transaction_id: string;
    bits_balance: number;
    extension_id: string;
}
export declare type ExtensionUseBitsTrackingProperties = ExtensionUseBitsProperties & {
    fail_reason: ExtensionUseBitsFailReason;
};
export interface ExtensionBuyProperties {
    asin: string;
    developer_name: string;
    item_name: string;
    item_description: string;
    item_description_short: string;
    item_price: string;
    item_price_currency: string;
    vendor_code: string;
    sku: string;
}
export interface ExtensionClickProperties {
    px_mouse_coord_x: number;
    px_mouse_coord_y: number;
    pct_mouse_coord_x: number;
    pct_mouse_coord_y: number;
}
export interface ExtensionHelperLoadSuccessProperties {
}
export interface ExtensionMouseenterProperties {
}
export interface ExtensionRenderProperties {
}
export interface ExtensionLinkProperties {
    extension_interaction: 'grant' | 'revoke';
}
export interface ExtensionNetworkRequestProperties {
    request_duration: number;
    request_end_time: number;
    request_file_type: string;
    request_start_time: number;
    request_url: string;
}
export interface IExtensionTracker {
    trackEvent(eventName: 'extension_click', props: ExtensionClickProperties): void;
    trackEvent(eventName: 'extension_helper_load_success', props: ExtensionHelperLoadSuccessProperties): void;
    trackEvent(eventName: 'extension_render', props: ExtensionRenderProperties): void;
    trackEvent(eventName: 'extension_mouseenter', props: ExtensionMouseenterProperties): void;
    trackEvent(eventName: 'extension_follow_init', props: ExtensionFollowProperties): void;
    trackEvent(eventName: 'extension_follow_confirm', props: ExtensionFollowProperties): void;
    trackEvent(eventName: 'extension_follow_success', props: ExtensionFollowProperties): void;
    trackEvent(eventName: 'extension_follow_fail', props: ExtensionFollowFailProperties): void;
    trackEvent(eventName: 'extension_use_bits_init', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_use_bits_confirm', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_use_bits_success', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_use_bits_fail', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_start_buy', props: ExtensionBuyProperties): void;
    trackEvent(eventName: 'extension_confirm_buy', props: ExtensionBuyProperties): void;
    trackEvent(eventName: 'extension_pubsub_missed', props: ExtensionPubSubMissedProperties): void;
    trackEvent(eventName: 'extension_pubsub_received', props: ExtensionPubSubProperties): void;
    trackEvent(eventName: string, props: object): void;
}
export declare class ExtensionTracker implements IExtensionTracker {
    private dobbin;
    private trackingProperties;
    constructor(params: {
        anchor: ExtensionAnchor;
        dobbin: Dobbin;
        extension: Extension;
        extensionMode: ExtensionMode;
        iframe: HTMLIFrameElement;
        requiredProps: RequiredTrackingProperties;
    });
    trackEvent(eventName: 'extension_click', props: ExtensionClickProperties): void;
    trackEvent(eventName: 'extension_helper_load_success', props: ExtensionHelperLoadSuccessProperties): void;
    trackEvent(eventName: 'extension_mouseenter', props: ExtensionMouseenterProperties): void;
    trackEvent(eventName: 'extension_network_request', props: ExtensionNetworkRequestProperties): void;
    trackEvent(eventName: 'extension_render', props: ExtensionRenderProperties): void;
    trackEvent(eventName: 'extension_ui_interaction_client', props: ExtensionLinkProperties): void;
    trackEvent(eventName: 'extension_follow_init', props: ExtensionFollowProperties): void;
    trackEvent(eventName: 'extension_follow_confirm', props: ExtensionFollowProperties): void;
    trackEvent(eventName: 'extension_follow_success', props: ExtensionFollowProperties): void;
    trackEvent(eventName: 'extension_follow_fail', props: ExtensionFollowFailProperties): void;
    trackEvent(eventName: 'extension_use_bits_init', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_use_bits_confirm', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_use_bits_success', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_use_bits_fail', props: ExtensionUseBitsTrackingProperties): void;
    trackEvent(eventName: 'extension_start_buy', props: ExtensionBuyProperties): void;
    trackEvent(eventName: 'extension_confirm_buy', props: ExtensionBuyProperties): void;
    trackEvent(eventName: 'extension_pubsub_missed', props: ExtensionPubSubMissedProperties): void;
    trackEvent(eventName: 'extension_pubsub_received', props: ExtensionPubSubProperties): void;
}
