export declare type TokenRole = 'broadcaster' | 'external' | 'moderator' | 'viewer';
export interface Payload {
    channel_id: string;
    exp: number;
    opaque_user_id: string;
    pubsub_perms: {
        listen: Array<object>;
        send: Array<object>;
    };
    role: TokenRole;
    user_id: string;
}
export declare class Token {
    token: string;
    private refreshAt;
    constructor(token: string);
    readonly payload: Payload;
    /**
     * Number of milliseconds before the token expires.
     */
    readonly expiresIn: number;
    /**
     * Returns whether the token is for a user who is linked (true) or unlinked (false).
     */
    readonly isLinked: boolean;
    /**
     * Returns whether or not the remaining time on the token is less than the
     * cutoff before we should refresh the token.
     */
    readonly isNearExpiration: boolean;
    /**
     * The amount of milliseconds we should wait before refreshing the token.
     */
    readonly refreshAfter: number;
    /**
     * Helper which provides whether or not we should refresh the token.
     */
    readonly shouldRefresh: boolean;
    /**
     * Returns true if token is for logged in user
     */
    readonly isUserLoggedIn: boolean;
    /**
     * Returns true if token is a broadcaster token
     */
    readonly isBroadcaster: boolean;
}
