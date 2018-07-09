/// <reference types="eventemitter2" />
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import { Theme } from '../util/theme';
import { ExtensionMode, PlaybackMode } from '../constants';
export declare const DEFAULT_LANGUAGE = "en";
/**
 * The context object that will be passed to the extension.
 */
export declare type Context = PostableContext & BaseContext;
/**
 * The subset of the context object that cannot be posted with `ContextManager.postContext()`.
 */
export interface BaseContext {
    mode: ExtensionMode;
    language: string;
}
/**
 * The subset of the context object that can be posted with `postContext()`.
 */
export interface PostableContext {
    bitrate?: number;
    bufferSize?: number;
    displayResolution?: string;
    game?: string;
    hlsLatencyBroadcaster?: number;
    isFullScreen?: boolean;
    isMuted?: boolean;
    isPaused?: boolean;
    isTheatreMode?: boolean;
    playbackMode?: PlaybackMode;
    theme?: number | Theme;
    videoResolution?: string;
    volume?: number;
}
export interface IContextManager {
    context: Context;
    destroy(): void;
    initializeContext(): void;
    on(event: string | string[], listener: Function): EventEmitter;
    off(event: string, listener: Function): EventEmitter;
}
export declare class ContextManager extends EventEmitter {
    private extensionMode;
    private language;
    context: Context;
    private isContextInitialized;
    constructor(extensionMode: ExtensionMode, language?: string);
    destroy: () => void;
    initializeContext: () => void;
    private getPlayerContext;
    private getBaseContext;
    private updateLocalContext;
    private diffAndEmitContext;
    private translateTheme;
}
