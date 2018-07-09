import * as React from 'react';
import './component.sass';
import { ExtensionAnchors, DEFAULT_EXTENSION_TYPE } from '../constants/extension-types'
import { OverlaySizes, DEFAULT_OVERLAY_SIZE, DEFAULT_CUSTOM_DIMENSIONS } from '../constants/overlay-sizes'
import { ViewerTypes, DEFAULT_VIEWER_TYPE } from '../constants/viewer-types'
import { IdentityOptions, DEFAULT_IDENTITY_OPTION } from '../constants/identity-options';
import { ViewTypeImages } from '../constants/img-map';
import { RadioOption } from './radio-option';
import { DivOption } from './div-option';
import * as closeButton from '../img/close_icon.png';
import { MobileOrientation, DefaultMobileOrientation, MobileSizes } from '../constants/mobile';
import { RigExtensionView } from '../core/models/rig';
import { ExtensionViews } from '../types/extension-coordinator';
const { ExtensionAnchor, ExtensionPlatform } = window['extension-coordinator'];

export interface ExtensionViewDialogProps {
  extensionViews: ExtensionViews,
  closeHandler: Function,
  saveHandler: Function,
  show?: boolean,
}

interface State {
  extensionViewType: string;
  frameSize: string;
  viewerType: string;
  x: number;
  y: number;
  width: number;
  height: number;
  identityOption: string;
  orientation: string;
  opaqueId: string;
  [key: string]: any;
}

export class ExtensionViewDialog extends React.Component<ExtensionViewDialogProps, State> {
  private defaultState: State;

  constructor(props: ExtensionViewDialogProps) {
    super(props);
    this.state = {
      extensionViewType: DEFAULT_EXTENSION_TYPE,
      frameSize: DEFAULT_OVERLAY_SIZE,
      viewerType: DEFAULT_VIEWER_TYPE,
      x: 0,
      y: 0,
      width: DEFAULT_CUSTOM_DIMENSIONS.width,
      height: DEFAULT_CUSTOM_DIMENSIONS.height,
      identityOption: DEFAULT_IDENTITY_OPTION,
      orientation: DefaultMobileOrientation,
      opaqueId: '',
    }

    this.defaultState = this.state;
  }

  public onChange (input: React.FormEvent<HTMLInputElement>) {
    this.setState({
      [input.currentTarget.name]: input.currentTarget.value,
    });
  }

  componentWillMount() {
    const allowedAnchors = this._getSupportedViews();
    if (allowedAnchors.length > 0) {
      this.setState({
        extensionViewType: allowedAnchors[0],
      });
    }
  }

  renderExtensionTypeComponents() {
    const allowedAnchors = this._getSupportedViews();
    const onlyOneOption = allowedAnchors.length === 1;
    return allowedAnchors.map((key: string) => {
      return <DivOption
        key={key}
        img={this.state.extensionViewType === key ? ViewTypeImages[key].on : ViewTypeImages[key].off }
        name={ExtensionAnchors[key]}
        value={key}
        onChange={(input) => this.onChange(input)}
        checked={(key === this.state.extensionViewType || onlyOneOption)} />
    });
  }

  renderFrameSizeComponents() {
    return Object.keys(OverlaySizes).map(key => {
      return <RadioOption key={key} name="frameSize" value={key} onChange={(input) => this.onChange(input)} checked={key === this.state.frameSize}/>
    });
  }

  renderMobileFrameSizeComponents() {
    return Object.keys(MobileSizes).map(key => {
      return <RadioOption key={key} name="frameSize" value={key} onChange={(input) => this.onChange(input)} checked={key === this.state.frameSize}/>
    });
  }

  renderViewerTypeComponents() {
    return Object.keys(ViewerTypes).map(key => {
      return <RadioOption key={key} name="viewerType" value={ViewerTypes[key]} onChange={(input) => this.onChange(input)} checked={ViewerTypes[key] === this.state.viewerType}/>
    });
  }

  renderIdentityOptionComponents() {
    return Object.keys(IdentityOptions).map(option => {
      return <RadioOption key={option} name="identityOption" value={option} onChange={(input) => this.onChange(input)} checked={option === this.state.identityOption}/>
    });
  }

  renderOrientationComponents() {
    return Object.keys(MobileOrientation).map(option => {
      return <RadioOption key={option} name="orientation" value={MobileOrientation[option]} onChange={(input) => this.onChange(input)} checked={option === this.state.orientation}/>
    });
  }

  close = () => {
    this.setState(this.defaultState);
    this.props.closeHandler();
  }

  save = () => {
    this.props.saveHandler();
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="new-extension-view">
        <div className="new-extension-view__background" />
        <div className="new-extension-view__dialog">
          <div className="dialog__top-bar-container">
            <div className="top-bar-container__title"> Add a new view </div>
            <div className="top-bar-container__escape" onClick={this.close}><img alt="Close" src={closeButton}/></div>
          </div>

          <hr className="dialog__divider" />

          <div className="dialog__type-and-size-container">
            <div className="type-title__type-container">
              <div className="type-and-size-container__type-title">
                Extension Type
              </div>
              <div className='dialog__type-container'>
                {this.renderExtensionTypeComponents()}
              </div>
            </div>

            <div className="type-and-size-container__size-title">
              <div className="size-title__size-subcontainer">

                {(this.state.extensionViewType === ExtensionAnchor.Overlay) &&
                <div className="size-title__size-subcontainer">
                  <div className="size-subcontainer__presets">
                    <div className="type-and-size-container__type-title">
                      Overlay Size
                    </div>
                    <div className='size-subcontainer__presets-container'>
                      <div className='size-subcontainer__size-selection'>
                        {this.renderFrameSizeComponents()}
                      </div>
                      <div className='overlay-custom-container'>
                          <RadioOption className='overlay-custom' name="frameSize" value="Custom" onChange={(input) => this.onChange(input)} checked={"Custom" === DEFAULT_IDENTITY_OPTION} />
                        <div className='overlay-custom-container'>
                          <div className="custom-subcontainer__input">
                            <label className="inputs__option-label inputs__width-offset"> Width </label>
                            <input type="text" name="width" onChange={(input) => this.onChange(input)}/>
                          </div>
                          <div className="custom-subcontainer__input">
                            <label className="inputs__option-label"> Height </label>
                            <input type="text" name="height" onChange={(input) => this.onChange(input)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>}

                {(this.state.extensionViewType === ExtensionPlatform.Mobile) &&
                <div className="size-title__size-subcontainer">
                  <div className="size-subcontainer__presets">
                    <div className="type-and-size-container__type-title">
                      Screen Size
                    </div>
                    <div className='size-subcontainer__presets-container'>
                      <div className='size-subcontainer__size-selection'>
                        {this.renderMobileFrameSizeComponents()}
                      </div>
                      <div className='overlay-custom-container'>
                          <RadioOption className='overlay-custom' name="frameSize" value="Custom" onChange={(input) => this.onChange(input)} checked={"Custom" === DEFAULT_IDENTITY_OPTION} />
                        <div className='overlay-custom-container'>
                          <div className="custom-subcontainer__input">
                            <label className="inputs__option-label inputs__width-offset"> Width </label>
                            <input type="text" name="width" onChange={(input) => this.onChange(input)}/>
                          </div>
                          <div className="custom-subcontainer__input">
                            <label className="inputs__option-label"> Height </label>
                            <input type="text" name="height" onChange={(input) => this.onChange(input)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="size-subcontainer__presets">
                    <div className="type-and-size-container__type-title">
                      Orientation
                    </div>
                    <div className='overlay-custom-container'>
                      {this.renderOrientationComponents()}
                    </div>
                  </div>
                </div>
                }

                {(this.state.extensionViewType === ExtensionAnchor.Component) &&
                  <div className="size-subcontainer__presets">
                    <div className="type-and-size-container__type-title">
                      Player Size
                    </div>
                    <div className='size-subcontainer__presets-container'>
                      <div className='size-subcontainer__size-selection'>
                        {this.renderFrameSizeComponents()}
                      </div>
                      <div className='overlay-custom-container'>
                          <RadioOption className='overlay-custom' name="frameSize" value="Custom" onChange={(input) => this.onChange(input)} checked={"Custom" === DEFAULT_IDENTITY_OPTION} />
                        <div className='overlay-custom-container'>
                          <div className="custom-subcontainer__input">
                            <label className="inputs__option-label inputs__width-offset"> Width </label>
                            <input type="text" name="width" onChange={(input) => this.onChange(input)}/>
                          </div>
                          <div className="custom-subcontainer__input">
                            <label className="inputs__option-label"> Height </label>
                            <input type="text" name="height" onChange={(input) => this.onChange(input)}/>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>}

                {(this.state.extensionViewType === ExtensionAnchor.Component) &&
                  <div className="size-subcontainer__presets">
                    <div className="type-and-size-container__type-title">
                      Position (%)
                    </div>
                    <div className='overlay-custom-container'>
                      <div className='overlay-custom-container'>
                        <div className="custom-subcontainer__input">
                          <label className="inputs__option-label">X</label>
                          <input type="text" name="x" placeholder='0 - 100' onChange={(input) => this.onChange(input)} />
                        </div>
                        <div className="custom-subcontainer__input">
                          <label className="inputs__option-label">Y</label>
                          <input type="text" name="y" placeholder='0 - 100' onChange={(input) => this.onChange(input)} />
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          <div className="dialog__viewer-container">
            <div className="type-title__type-container">
              <div className="type-and-size-container__type-title">
                Viewer Type
              </div>
              <div className='dialog__type-container'>
                {this.renderViewerTypeComponents()}
                <div>
                  {(this.state.viewerType === ViewerTypes.LoggedIn) ?
                    this.renderIdentityOptionComponents() : null}
                </div>
                <div className='opaque_id-input'>
                  <label className="opaque-id-label">Custom Opaque ID</label>
                  <input type="text" name="opaqueId" onChange={(input) => this.onChange(input)}/>
                </div>
              </div>
            </div>
          </div>
          <hr className="dialog__divider" />
          <div className="dialog_bottom-bar">
            <div className="bottom-bar__save" onClick={this.save}> Save </div>
            <div className="bottom-bar__cancel" onClick={this.close}> Cancel </div>
          </div>
        </div>
      </div>
    );
  }

  _getSupportedViews() {
    return Object.keys(ExtensionAnchors).filter(anchorS => {
      const anchorC = anchorS.replace(/_\w/g, (m) => m[1].toUpperCase());
      return (this.props.extensionViews as { [key: string]: string })[anchorC];
    });
  }
}