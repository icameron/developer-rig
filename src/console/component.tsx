import * as React from 'react';
import './component.sass';

interface ConsoleEntry {
  frame: string;
  log: string;
}

interface State {
  logHistory: ConsoleEntry[];
}

export class Console extends React.Component<{}, State> {
  public state: State = {
    logHistory: window.rig.history || []
  }

  updateConsole() {
    this.setState({
      logHistory: window.rig.history
    });
  }

  componentDidMount() {
    window.rig.update = () => {
      this.updateConsole();
    }

    this.updateConsole();
  }

  render() {
    const logs = this.state.logHistory.map((entry, index) => (
      <div key={index}>{entry.frame} $ {entry.log}</div>
    ));

    return (
      <div className="console">{logs}</div>
    );
  }
}
