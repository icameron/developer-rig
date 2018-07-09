import { Token } from '../tokens/token';
import { ExtensionActivationStatus, ExtensionAnchor, ExtensionState } from '../constants/extension';
export interface ExtensionTokenResponse {
    extension_id: string;
    token: string;
}
export interface ViewsResponse {
    component?: {
        viewer_url: string;
        aspect_height: number;
        aspect_width: number;
        size: number;
        zoom: boolean;
        zoom_pixels: number;
    };
    config?: {
        viewer_url: string;
    };
    hidden?: {
        viewer_url: string;
    };
    live_config?: {
        viewer_url: string;
    };
    mobile?: {
        viewer_url: string;
    };
    panel?: {
        height: number;
        viewer_url: string;
    };
    video_overlay?: {
        viewer_url: string;
    };
}
export declare enum ExtensionIconSizes {
    Square100 = "100x100",
    Square24 = "24x24",
    DiscoverySplash = "300x200",
}
export interface IconUrlsResponse {
    [ExtensionIconSizes.Square100]: string;
    [ExtensionIconSizes.Square24]?: string;
    [ExtensionIconSizes.DiscoverySplash]?: string;
}
export interface ExtensionsByChannelResponse {
    installed_extensions: Array<{
        extension: {
            author_name: string;
            bits_enabled: boolean;
            description: string;
            icon_urls: IconUrlsResponse;
            id: string;
            name: string;
            request_identity_link: boolean;
            sku: string;
            summary: string;
            vendor_code: string;
            version: string;
            views: ViewsResponse;
            state: ExtensionState;
            whitelisted_config_urls: string[];
            whitelisted_panel_urls: string[];
        };
        installation_status: {
            activation_config: {
                anchor: ExtensionAnchor;
                slot: string;
                x?: number;
                y?: number;
            };
            activation_state: ExtensionActivationStatus;
            can_activate: boolean;
            extension_id: string;
        };
    }>;
    issued_at: string;
    tokens: Array<ExtensionTokenResponse>;
}
export interface ExtensionProductPayload {
    action_details: {
        destination_url: string;
    };
    asin: string;
    description: string;
    developer_name: string;
    price: {
        currency_unit: string;
        price: string;
    };
    short_description: string;
    sku: string;
    title: string;
}
export interface ExtensionProductsResponse {
    products: Array<ExtensionProductPayload>;
}
export interface RefreshTokenResponse {
    token: string;
}
export interface LinkUserRequestBody {
    show_user: boolean;
    token: string;
}
export interface LinkUserResponse {
    token: string;
}
export declare const retryAuthRequest: <T>(request: Request) => Promise<T>;
export declare const getExtensionsForChannel: (channelId: string) => Promise<ExtensionsByChannelResponse>;
export declare const getExtensionProducts: (vendorCode: string, sku: string, language: string) => Promise<ExtensionProductsResponse>;
export declare const linkUser: (extensionId: string, token: string, showUser: boolean) => Promise<LinkUserResponse>;
export declare const refreshToken: (extensionId: string, token: Token) => Promise<RefreshTokenResponse>;
