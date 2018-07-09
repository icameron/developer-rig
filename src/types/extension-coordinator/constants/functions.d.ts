export declare enum FunctionAction {
    LoginRequest = "twitch-ext-login-request",
    FollowAction = "twitch-ext-follow-action",
    FollowComplete = "twitch-ext-follow-complete",
    FollowStatusRequest = "twitch-ext-follow-status",
    FollowStatusResponse = "twitch-ext-follow-status-response",
    IdShareRequest = "twitch-ext-id-share-request",
    /**
     *  @deprecated Replaced by UseBits FunctionAction
     */
    UseBitsPromptRequired = "twitch-ext-use-bits",
    UseBits = "twitch-ext-use-bits",
    UseBitsComplete = "twitch-ext-use-bits-complete",
}
