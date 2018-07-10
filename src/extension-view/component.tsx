import * as React from 'react';
import './component.sass';
import { ExtensionFrame } from '../extension-frame';
import { IdentityOptions } from '../constants/identity-options';
import { ViewerTypes } from '../constants/viewer-types';
import { CONFIG_VIEW_DIMENSIONS, CONFIG_VIEW_WRAPPER_DIMENSIONS, PANEL_VIEW_DIMENSIONS } from '../constants/view_sizes';
import * as closeButton from '../img/close_icon.png';
import { ExtensionComponentView } from '../extension-component-view';
import { ExtensionMobileView } from '../extension-mobile-view/component';
import { RigExtension, ViewStyles, FrameSize } from '../core/models/rig';
import { Position } from '../types/extension-coordinator';

const { ExtensionAnchor, ExtensionMode, ExtensionViewType, ExtensionPlatform} = window['extension-coordinator'];

export interface ExtensionViewProps {
  id: string;
  extension: RigExtension;
  type: string;
  mode: string;
  role?: string;
  linked?: boolean;
  orientation?: string;
  deleteViewHandler?: (id: string) => void;
  openEditViewHandler?: (id: string) => void;
  position?: Position;
  frameSize?: FrameSize;
}

interface State {
  mousedOver: boolean;
}

interface ExtensionProps {
  viewStyles: ViewStyles;
  viewWrapperStyles: ViewStyles;
}

export class ExtensionView extends React.Component<ExtensionViewProps, State> {
  public state: State = {
    mousedOver: false,
  };

  mouseEnter() {
    this.setState({
      mousedOver: true,
    });
  }

  mouseLeave() {
    this.setState({
      mousedOver: false
    });
  }

  renderView(extensionProps: ExtensionProps) {
    let view = null;
    switch (this.props.type) {
      case ExtensionAnchor.Component:
        view = (<ExtensionComponentView
          id={`component-${this.props.id}`}
          role={this.props.role}
          className="view"
          extension={this.props.extension}
          frameSize={this.props.frameSize}
          position={this.props.position}
        />);
        break;
      case ExtensionViewType.Mobile:
        view = (<ExtensionMobileView
          id={`mobile-${this.props.id}`}
          className="view"
          role={this.props.role}
          extension={this.props.extension}
          frameSize={this.props.frameSize}
          position={this.props.position}
          orientation={this.props.orientation}
        />);
        break;
      default:
        // standard view for overlays, panels, live config, and broadcaster config
        view = (<div
          className="view"
          style={extensionProps.viewStyles}>
          <ExtensionFrame
            className="view"
            frameId={`frameid-${this.props.id}`}
            extension={this.props.extension}
            type={this.props.type}
            mode={this.props.mode}
          />
        </div>)
        break;
    }
    return view;
  }

  renderLinkedOrUnlinked() {
    return this.props.linked ? IdentityOptions.Linked : IdentityOptions.Unlinked;
  }

  _isEditable() {
    return this.props.type === ExtensionAnchor.Component || this.props.type === ExtensionPlatform.Mobile;
  }

  render() {
    let extensionProps = {
      viewStyles: {},
      viewWrapperStyles: {},
    };

    let panelHeight = PANEL_VIEW_DIMENSIONS.height;
    if (this.props.extension.views.panel && this.props.extension.views.panel.height) {
      panelHeight = this.props.extension.views.panel.height + '';
    }
    switch(this.props.type) {
      case ExtensionAnchor.Panel:
        extensionProps.viewStyles = {
          height: panelHeight + 'px',
          width: PANEL_VIEW_DIMENSIONS.width + 'px',
        }
        break;
      case ExtensionAnchor.Overlay:
        extensionProps.viewStyles = {
          width: this.props.frameSize.width + 'px',
          height: this.props.frameSize.height + 'px'
        };
        break;
      case ExtensionMode.Config:
        extensionProps.viewStyles = CONFIG_VIEW_DIMENSIONS;
        extensionProps.viewWrapperStyles = CONFIG_VIEW_WRAPPER_DIMENSIONS;
        break;
      case ExtensionViewType.LiveConfig:
        extensionProps.viewStyles = {
          height: panelHeight + 'px',
          width: PANEL_VIEW_DIMENSIONS.width + 'px',
        }
        break;
      default:
        extensionProps.viewStyles = {
          height: PANEL_VIEW_DIMENSIONS.height + 'px',
          width: PANEL_VIEW_DIMENSIONS.width + 'px',
        }
        break;
    }

    return (
      <div
        className={'view__wrapper'}
        onMouseEnter={() => { this.mouseEnter() }}
        onMouseLeave={() => { this.mouseLeave() }}
        style={extensionProps.viewWrapperStyles}>
        <div
          className={'view__header'}>
          {(this.props.deleteViewHandler !== undefined && this.state.mousedOver) &&
            (
            <div>
              <div className={'view__close_button'}
                onClick={() => { this.props.deleteViewHandler(this.props.id) }}>
              <img
                alt='Close'
                src={closeButton}
              />
              </div>
              { this._isEditable() &&
                <div className='view__edit_button'
                onClick={() => { this.props.openEditViewHandler(this.props.id) }}>
                Edit
                </div>}
            </div>
          )
          }
          <div className={'view__descriptor'}>
            { this.props.role }
          </div>
          <div className={'view__descriptor'}>
            {(this.props.role === ViewerTypes.LoggedIn) ?
              this.renderLinkedOrUnlinked() : null}
          </div>
        </div>
        {this.renderView(extensionProps)}
      </div>
    );
  }
}
