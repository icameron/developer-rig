import * as React from 'react';
import { ExtensionView } from '../extension-view';
import { ExtensionViewButton } from '../extension-view-button';
import { EXTENSION_MODE_TO_VIEW } from '../constants/extension-modes'
import './component.sass';
import { RigExtensionView } from '../core/models/rig';
const { ExtensionMode } = window['extension-coordinator'];

export interface ExtensionViewContainerProps {
  mode: string;
  extensionViews: RigExtensionView[];
  openEditViewHandler?: Function;
  deleteExtensionViewHandler: Function;
  openExtensionViewHandler: Function;
  extension: object;
}

export class ExtensionViewContainer extends React.Component<ExtensionViewContainerProps> {
  openExtensionViewDialog = () => {
    this.props.openExtensionViewHandler();
  }

  render() {
    if (this.props.mode !== ExtensionMode.Viewer) {
      return ( <ExtensionView
          id={this.props.mode}
          type={EXTENSION_MODE_TO_VIEW[this.props.mode]}
          extension={this.props.extension}
          mode={this.props.mode}
          key={this.props.mode}/>
      );
    }

    let extensionViews: RigExtensionView[] = [];
    if (this.props.extensionViews && this.props.extensionViews.length > 0) {
      extensionViews = this.props.extensionViews.map(view => {
        return <ExtensionView
          key={view.id}
          id={view.id}
          extension={view.extension}
          type={view.type}
          mode={this.props.mode}
          role={view.role}
          frameSize={view.frameSize}
          position={{x: view.x, y: view.y}}
          linked={view.linked}
          orientation={view.orientation}
          openEditViewHandler={this.props.openEditViewHandler}
          deleteViewHandler={this.props.deleteExtensionViewHandler}/>
      });
    }

    return (
      <div className='view-container-wrapper'>
          <div className="view-container">
          { extensionViews }
        </div>
        <div>
          <ExtensionViewButton
            onClick={this.openExtensionViewDialog}>
          </ExtensionViewButton>
        </div>
      </div>
    );
  }
}
