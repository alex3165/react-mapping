import * as React from 'react';
import { Layer } from '../../';

const styles = {
  container: {
    backgroundColor: 'black',
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

export default class Main extends React.Component {
  render() {
    return (
    <div style={styles.container}>
      <Layer style={styles.layer} x={100} y={40} isEditMode={true}>
        <div style={styles.rectExample} />
      </Layer>
    </div>
    );
  }
}
