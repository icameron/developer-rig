interface PolyfillMouseEvent {
    initMouseEvent(eventType: string, bubbles?: boolean, cancelable?: boolean, window?: Window, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean, button?: number, relatedTarget?: EventTarget | null): void;
}
