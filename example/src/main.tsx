import * as React from 'react';
import { Layer } from '../../';
const YouTube = require('react-youtube').default;

const styles = {
  container: {
    backgroundColor: '#2c3e50',
    height: '100vh',
    width: '100vw'
  },
  rectExample: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  editor: {
    width: '100vw',
    height: '100vh'
  },
  layer: {
    width: 600,
    height: 300
  }
};

const opts = {
  height: 390,
  width: 640
};

export interface State {
  isEditMode: boolean;
}

export default class Main extends React.Component<void, State> {
  state: State = {
    isEditMode: true
  };

  render() {
    return (
    <div style={styles.container}>
      <div/>
      <Layer style={opts} x={100} y={40} isEditMode={this.state.isEditMode}>
        <YouTube videoId="M6khNkdbt1w" opts={opts}/>
      </Layer>
      <Layer style={opts} x={300} y={300} isEditMode={this.state.isEditMode}>
        <YouTube videoId="LXgTp40Y3zo" opts={opts}/>
      </Layer>
    </div>
    );
  }
}
