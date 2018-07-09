import { ExtensionsByChannelResponse, ViewsResponse } from '../api/extensions';
import { ExtensionViews, ExtensionInstallation } from '../models/extension';
export declare function convertViews(data: ViewsResponse): ExtensionViews;
export declare function extensionInstallationsFromRest(data: ExtensionsByChannelResponse): ExtensionInstallation[];
