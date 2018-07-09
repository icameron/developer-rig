export interface FollowStatusResult {
    channel: string | null;
    channelId: number;
    isFollowing: boolean;
}
export declare const getFollowStatus: (userId: number, channelName: string) => Promise<FollowStatusResult>;
export declare const followChannel: (userId: number, channelName: string, notifications: boolean) => Promise<FollowStatusResult>;
