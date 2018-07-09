import * as React from 'react';
import { ExtensionFrame } from '../extension-frame';
import { Extension } from '../types/extension-coordinator';
import { PositionProperty } from 'csstype';
const { ExtensionMode, ExtensionViewType, getComponentPositionFromView, getComponentSizeFromView } = window['extension-coordinator'];

export interface FrameSize {
  height: number;
  width: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ExtensionComponentViewProps {
  id: string
  extension: Extension;
  frameSize: FrameSize;
  position: Position;
  role: string;
}

export interface ViewStyles extends React.CSSProperties {
  border: string;
  position: PositionProperty;
  left: string;
  top: string;
  width: string;
  height: string;
  transformOrigin?: string;
  transform?: string;
}
type Props = ExtensionComponentViewProps;

export class ExtensionComponentView extends React.Component<Props> {
  private computeViewStyles(): ViewStyles {
    const extension = this.props.extension;
    const positionFromView = getComponentPositionFromView(
      this.props.frameSize.width,
      this.props.frameSize.height,
      {
        x: this.props.position.x * 100,
        y: this.props.position.y * 100,
      });
    const sizeFromView = getComponentSizeFromView(
      this.props.frameSize.width,
      this.props.frameSize.height,
      extension.views.component);

    let viewStyles: ViewStyles = {
      border: '1px solid #7D55C7',
      position: 'absolute',
      left: positionFromView.x + 'px',
      top: positionFromView.y + 'px',
      width: `${sizeFromView.width}px`,
      height: `${sizeFromView.height}px`,
    }

    if (extension.views.component.zoom) {
      viewStyles = {
        ...viewStyles,
        width: `${sizeFromView.width / sizeFromView.zoomScale}px`,
        height: `${sizeFromView.height / sizeFromView.zoomScale}px`,
        transformOrigin: '0 0',
        transform: `scale(${sizeFromView.zoomScale})`,
      }
    }

    return viewStyles;
  }

  render() {
    return (
      <div
        className="view component-view"
        style={{
          width: this.props.frameSize.width + 'px',
          height: this.props.frameSize.height + 'px',
        }}>
          <div style={this.computeViewStyles()}>
          <ExtensionFrame
            className="view"
            frameId={`frameid-${this.props.id}`}
            extension={this.props.extension}
            type={ExtensionViewType.Component}
            mode={ExtensionMode.Viewer}
          />
        </div>
      </div>
    );
  }
}
