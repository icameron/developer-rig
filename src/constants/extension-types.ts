const { ExtensionAnchor, ExtensionPlatform } = window['extension-coordinator'];

export const DEFAULT_EXTENSION_TYPE = ExtensionAnchor.Overlay;
export const ExtensionAnchors: { [key: string]: string } = {
  [ExtensionAnchor.Overlay]: 'Overlay',
  [ExtensionAnchor.Panel]: 'Panel',
  [ExtensionAnchor.Component]: 'Component',
  [ExtensionPlatform.Mobile]: 'Mobile',
};

