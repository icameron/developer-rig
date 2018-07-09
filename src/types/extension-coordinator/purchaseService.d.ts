import { ExtensionProductPayload } from './api/extensions';
export declare class PurchaseService {
    makePurchase(purchasePayload: ExtensionProductPayload, channelId: number, locale: string): Promise<void>;
}
