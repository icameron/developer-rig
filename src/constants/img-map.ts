import * as panel from '../img/panel.png';
import * as panelOff from '../img/panelOff.png';
import * as overlay from '../img/overlay.png';
import * as overlayOff from '../img/overlayOff.png';
import * as component from '../img/component.png';
import * as componentOff from '../img/componentOff.png';
import * as mobile from '../img/mobile.png';
import * as mobileOff from '../img/mobileOff.png';
const { ExtensionAnchor, ExtensionPlatform } = window['extension-coordinator'];

export const ViewTypeImages = {
  [ExtensionAnchor.Overlay]: { on: overlay, off: overlayOff },
  [ExtensionAnchor.Panel]: { on: panel, off: panelOff },
  [ExtensionAnchor.Component]: { on: component, off: componentOff },
  [ExtensionPlatform.Mobile]: { on: mobile, off: mobileOff },
};
