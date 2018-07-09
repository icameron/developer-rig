import './polyfill/mousemove';
import 'promise-polyfill';
import 'whatwg-fetch';
import { ExtensionFrame } from './frame';
export { ExtensionFrame } from './frame';
import { ExtensionService, extensionService } from './service';
export { extensionService };
export * from './models';
export * from './constants';
export * from './util/component';
export declare class ExtensionCoordinator {
    static ExtensionFrame: typeof ExtensionFrame;
    static ExtensionService: ExtensionService;
}

export as namespace ExtensionCoordinator;
