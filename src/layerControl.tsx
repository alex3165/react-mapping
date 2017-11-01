import * as React from 'react';
import { Mode } from './editor';

export interface Props {
  mode: Mode;
}

// TODO: add edit anchors and listen for x - y position to translate
export class LayerControl extends React.Component<Props> {
  
  isEditMode = () => this.props.mode === 'edit';
  
  render() {
    return (
      <div/>
    );
  }
}
