import * as React from 'react';
import { Editor, Layer } from '../../';

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
    border: '1px solid red'
  },
  layer: {
    width: 600,
    height: 300
  }
};

export default class Main extends React.Component {
  render() {
    return <div style={styles.container}>
        <Editor width="100vw" height="100vh" style={styles.editor} mode="edit">
          <Layer style={styles.layer} x={100} y={40}>
            <div style={styles.rectExample} />
          </Layer>
        </Editor>
      </div>;
  }
}
