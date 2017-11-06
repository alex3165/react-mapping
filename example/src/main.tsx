import * as React from 'react';
import { Layer, Grid } from '../../';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
const YouTube = require('react-youtube').default;

const getContainerStyle = (isEditMode) => ({
  backgroundColor: isEditMode ? '#2c3e50' : 'black',
  height: '100vh',
  width: '100vw'
});

const instruction = {
  color: 'white',
  bottom: 20,
  position: 'absolute' as 'absolute',
  textAlign: 'center',
  left: 0,
  opacity: 0.4,
  right: 0
};

const opts = {
  height: 195,
  width: 320
};

export interface State {
  isEditMode: boolean;
}

class Main extends React.Component<{}, State> {
  state: State = {
    isEditMode: true
  };

  toggleEdit = () => {
    this.setState({
      isEditMode: !this.state.isEditMode
    });
  }

  render() {
    const { isEditMode } = this.state;

    return (
    <div style={getContainerStyle(isEditMode)}>
      <KeyHandler keyEventName={KEYPRESS} keyValue="t" onKeyHandle={this.toggleEdit} />
      {isEditMode && <Grid/>}
      <Layer style={opts} x={100} y={40} isEditMode={isEditMode}>
        <YouTube videoId="M6khNkdbt1w" opts={opts}/>
      </Layer>
      <Layer style={opts} x={150} y={300} isEditMode={isEditMode}>
        <YouTube videoId="LXgTp40Y3zo" opts={opts}/>
      </Layer>
      <div style={instruction}>Press "t" to switch between edit / view mode</div>
    </div>
    );
  }
}

export default Main;