export declare const BITS_DOMAIN_PREFIX = "twitch.ext";
export interface BitsProductCost {
    amount: string;
    type: string;
}
export interface BitsProduct {
    sku: string;
    displayName: string;
    cost: BitsProductCost;
    inDevelopment?: boolean;
}
export interface BitsProductsResponse {
    products: BitsProduct[];
}
export interface EligibilityResponse {
    transaction_id: string;
    prompt_required?: boolean;
    bits_required: number;
    bits_balance: number;
}
export interface UseBitsResponse {
    bits_balance: number;
}
export declare const getProducts: (extensionId: string) => Promise<BitsProductsResponse>;
export declare const isEligible: (sku: string, channelId: string, extensionId: string) => Promise<EligibilityResponse>;
export declare const useBits: (transactionId: string) => Promise<UseBitsResponse>;
