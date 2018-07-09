export declare enum ExtensionActivationStatus {
    Active = "active",
    Inactive = "inactive",
}
export declare enum ExtensionAnchor {
    Hidden = "hidden",
    Panel = "panel",
    Overlay = "video_overlay",
    Component = "component",
}
export declare enum ExtensionMode {
    Config = "config",
    Dashboard = "dashboard",
    Viewer = "viewer",
}
export declare enum ExtensionPlatform {
    Mobile = "mobile",
    Web = "web",
}
export declare enum ExtensionState {
    Testing = "Testing",
    HostedTest = "Assets Uploaded",
    Approved = "Approved",
    Released = "Released",
    ReadyForReview = "Ready For Review",
    InReview = "In Review",
    PendingAction = "Pending Action",
    Uploading = "Uploading",
}
export declare enum ExternalExtensionState {
    Testing = "testing",
    HostedTest = "hosted_test",
    Approved = "approved",
    Released = "released",
    ReadyForReview = "ready_for_review",
    InReview = "in_review",
    PendingAction = "pending_action",
    Uploading = "uploading",
}
export declare const ExtensionStateMap: {
    [ExtensionState.Testing]: ExternalExtensionState;
    [ExtensionState.HostedTest]: ExternalExtensionState;
    [ExtensionState.Approved]: ExternalExtensionState;
    [ExtensionState.Released]: ExternalExtensionState;
    [ExtensionState.ReadyForReview]: ExternalExtensionState;
    [ExtensionState.InReview]: ExternalExtensionState;
    [ExtensionState.PendingAction]: ExternalExtensionState;
    [ExtensionState.Uploading]: ExternalExtensionState;
};
export declare enum ExtensionAction {
    TwitchExtAuth = "twitch-ext-auth",
    TwitchExtBootstrap = "twitch-ext-bootstrap",
    TwitchExtContext = "twitch-ext-context",
    TwitchExtError = "twitch-ext-error",
    TwitchExtLoaded = "twitch-ext-loaded",
    TwitchExtLongtask = "twitch-ext-longtask",
    TwitchExtNetworkTiming = "twitch-ext-network-timing",
    TwitchExtReload = "twitch-ext-reload",
    TwitchExtUserAction = "twitch-ext-user-action",
    TwitchExtConfirmationRequest = "twitch-ext-confirmation-request",
    TwitchExtBeginPurchase = "twitch-ext-begin-purchase",
    TwitchExtReloadEntitlements = "twitch-ext-reload-entitlements",
    TwitchExtProductPrices = "twitch-ext-product-prices",
    TwitchExtVisibilityChanged = "twitch-ext-visibility-changed",
    TwitchExtBitsProducts = "twitch-ext-bits-products",
    TwitchExtUseBits = "twitch-ext-use-bits",
    TwitchExtBitsTransactionComplete = "twitch-ext-bits-transaction-complete",
    TwitchExtBitsOnHover = "twitch-ext-bits-on-hover",
    TwitchExtPubSubReceived = "twitch-ext-pubsub-received",
    TwitchExtPositionChanged = "twitch-ext-position-changed",
    TwitchExtPubsubMessage = "twitch-ext-pubsub-message",
    TwitchExtPubsubBindFailure = "twitch-ext-pubsub-bind-failure",
    TwitchExtPubsubListen = "twitch-ext-pubsub-listen",
    TwitchExtPubsubUnlisten = "twitch-ext-pubsub-unlisten",
}
export declare const DefaultZoomPixelWidth = 1024;
