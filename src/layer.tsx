import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AnchorComponent } from './anchor';

export interface Props {
  height: number;
  width: number;
  style?: React.CSSProperties;
}

export interface Context {
  isEditMode: boolean;
}

export type Anchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const styles = {
  container : {
    position: 'relative' as 'relative'
  }
};

const anchors: Anchor[] = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
];

// 4x4 matrix
export type Matrix3d = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

export type Vector = [number, number]; // [x, y]

export interface State {
  matrix: Matrix3d;
}

const defaultMatrix: Matrix3d = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1 // second and third for x and y position of element
];

export class Layer extends React.Component<Props, State> {
  public static contextTypes = { isEditMode: PropTypes.bool };

  public context: Context;

  layerDraggingMouseDelta: Vector | undefined;

  state: State = {
    matrix: defaultMatrix
  };

  onAnchorMouseEnter = () => {};

  onAnchorMouseDown = () => {};

  onAnchorMouseMove = () => {};

  onAnchorMouseUp = () => {};

  onMouseUp = () => {
    this.layerDraggingMouseDelta = undefined;
  }

  onMouseMove = (evt) => {
    if (!this.layerDraggingMouseDelta) {
      return;
    }
    const { matrix } = this.state;

    const newVector: Vector = [
      evt.pageX - this.layerDraggingMouseDelta[0],
      evt.pageY - this.layerDraggingMouseDelta[1]
    ];

    this.setState({
      matrix: this.matrixTranslate(matrix, newVector)
    });
  }

  onMouseDown = (evt) => {
    this.layerDraggingMouseDelta = [evt.pageX - this.state.matrix[12], evt.pageY - this.state.matrix[13]];
  }

  matrixTranslate = (matrix: Matrix3d, vector: Vector) => {
    const newMatrix = [...matrix];
    newMatrix[13] = vector[1];
    newMatrix[12] = vector[0];
    return newMatrix as Matrix3d;
  }

  matrixToTransform = (matrix: Matrix3d) => (
    `matrix3d(${matrix.join(', ')})`
  )

  render() {
    const { width, height, style } = this.props;
    const { isEditMode } = this.context;

    return (
    <div
      onMouseDown={this.onMouseDown}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
      style={{
        ...styles.container,
        ...style,
        width,
        height,
        transform: this.matrixToTransform(this.state.matrix)
      }}
    >
      {isEditMode && <div>
          {anchors.map(anchor => (
            <AnchorComponent
              key={anchor}
              position={anchor}
              onMouseEnter={this.onAnchorMouseEnter}
              onMouseDown={this.onAnchorMouseDown}
              onMouseMove={this.onAnchorMouseMove}
              onMouseUp={this.onAnchorMouseUp}
            />
          ))}
        </div>}
      {this.props.children}
    </div>
    );
  }
}
