import * as React from 'react';
import { Editor, Layer } from '../../';

const styles = {
  container: {

  },
  rectExample: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  editor: {
    border: '1px solid red',
    margin: 'auto'
  }
};

export default class Main extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Editor width={600} height={300} style={styles.editor}>
          <Layer width={200} height={80}>
            <div style={styles.rectExample}/>
          </Layer>
          <Layer />
        </Editor>
      </div>
    );
  }
}
