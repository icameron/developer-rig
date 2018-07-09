import { Token } from './token';
export interface TokenEmitterCallback {
    (newToken: Token, oldToken: Token): void;
}
export declare class TokenManager {
    clockSkew: number;
    private tokens;
    private timers;
    private tokenEmitter;
    /**
     * Given a server time, sets clockSkew to now - serverTime. If this value
     * is negative, then we're currently behind the server and if this value
     * is positive, we're ahead of the server. This value is used to ensure we're
     * refreshing tokens at the proper time.
     */
    setClockSkew(serverTimeString: string): void;
    /**
     * Clears all the timers from the tokenManager. This method is only invoked
     * by tests.
     */
    clearTokenManager: () => void;
    /**
     * Retrieves a token from the local token registry. Type is optimistic that
     * the token existed in the registry. We could add throw to this or a log once
     * we have a suitable logger class.
     */
    getToken: (extensionId: string) => Token;
    /**
     * Adds a token to the local registry.
     */
    registerToken: (extensionId: string, token: string) => void;
    subscribe(extensionId: string, callback: TokenEmitterCallback): void;
    unsubscribe(extensionId: string, callback: TokenEmitterCallback): void;
    private updateRefreshTimer;
    private refreshToken;
    private getTokenFromExtensions;
}
export declare const tokenManager: TokenManager;
