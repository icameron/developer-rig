const { ExtensionViewType, ExtensionMode } = window['extension-coordinator'];

export const EXTENSION_MODE_TO_VIEW: { [key: string]: string } = {
  [ExtensionMode.Config]: ExtensionViewType.Config,
  [ExtensionMode.Dashboard]: ExtensionViewType.LiveConfig,
  [ExtensionViewType.Mobile]: ExtensionViewType.Mobile,
}
