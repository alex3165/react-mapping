// https://bl.ocks.org/mbostock/10571478
// http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AnchorComponent } from './anchor';
import { matrixToTransform, transformPointsToMatrix, vectorToTransform } from './util';

// Component interfaces
export interface Props {
  style?: React.CSSProperties;
}

export interface Context {
  isEditMode: boolean;
}

export interface State {
  matrix: Matrix3d;
  translateDelta: { [key: string]: Vector };
  sourcePoints?: RectPoints;
  transformOrigin: Vector;
  containerTranslate: Vector;
}

const styles = {
  container : {
    position: 'relative' as 'relative',
    cursor: 'all-scroll'
  }
};

// Sorted
export type Anchor = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
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

// top-left, top-right, bottom-right, bottom-left
export type RectPoints = [Vector, Vector, Vector, Vector];

export type Vector = [number, number]; // [x, y]

const defaultMatrix: Matrix3d = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1 // second and third for x and y position of element
];

export class Layer extends React.Component<Props, State> {
  public static contextTypes = { isEditMode: PropTypes.bool };

  public context: Context;
  container: HTMLElement | null;

  layerTranslateDelta: Vector | undefined;
  anchorTranslateDelta: Vector | undefined;

  isAnchorDragging = false;

  targetPoints: RectPoints;

  state: State = {
    matrix: defaultMatrix,
    translateDelta: anchors.reduce((acc, key) => (acc[key] = [0, 0], acc), {}),
    sourcePoints: undefined,
    transformOrigin: [0, 0],
    containerTranslate: [0, 0]
  };

  componentDidMount() {
    if (this.container) {
      const { width, height } = this.container.getBoundingClientRect();

      const sourcePoints = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height]
      ] as RectPoints;

      this.targetPoints = [...sourcePoints] as RectPoints;
      this.setState({ sourcePoints });

    } else {
      throw new Error('Couldn\'t get a reference of the container element');
    }
  }

  onAnchorMouseDown = (evt, position) => {
    evt.stopPropagation();
    this.anchorTranslateDelta = [evt.pageX, evt.pageY];    
  }

  onAnchorMouseMove = (evt, position) => {
    if (!this.anchorTranslateDelta || !this.state.sourcePoints) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();
    const vectorIndexToModify = anchors.indexOf(position);

    const deltaX = (evt.pageX - this.anchorTranslateDelta[0]);
    const deltaY = (evt.pageY - this.anchorTranslateDelta[1]);

    this.targetPoints[vectorIndexToModify] = [
      this.state.sourcePoints[vectorIndexToModify][0] + deltaX,
      this.state.sourcePoints[vectorIndexToModify][1] + deltaY
    ];

    this.setState({
      matrix: transformPointsToMatrix(this.state.sourcePoints, this.targetPoints!),
      translateDelta: { ...this.state.translateDelta, [position]: [deltaX, deltaY] }
    });
  }

  onAnchorMouseUp = (position) => {
    this.anchorTranslateDelta = undefined;
  }

  onMouseUp = () => {
    this.layerTranslateDelta = undefined;
  }

  onMouseMove = (evt) => {
    if (!this.layerTranslateDelta) {
      return;
    }

    const newVector: Vector = [
      evt.pageX - this.layerTranslateDelta[0],
      evt.pageY - this.layerTranslateDelta[1]
    ];

    this.setState({
      containerTranslate: newVector
    });
  }

  onMouseDown = (evt) => {
    const { containerTranslate } = this.state;
    this.layerTranslateDelta = [evt.pageX - containerTranslate[0], evt.pageY - containerTranslate[1]];
  }

  render() {
    const { style } = this.props;
    const { isEditMode } = this.context;
    const { translateDelta, matrix, containerTranslate, transformOrigin } = this.state;

    return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: vectorToTransform(containerTranslate)
      }}
    >
      <div
        ref={(ref) => { this.container = ref; }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        style={{
          ...styles.container,
          ...style,
          transform: matrixToTransform(matrix),
          transformOrigin: `${transformOrigin[0]}px ${transformOrigin[1]}px 0px`
        }}
      >
        {this.props.children}
      </div>
      {
        isEditMode && <div>
          {anchors.map((anchor, index) => (
            <AnchorComponent
              key={anchor}
              translation={translateDelta[anchor]}
              position={anchor}
              onMouseDown={this.onAnchorMouseDown}
              onMouseMove={this.onAnchorMouseMove}
              onMouseUp={this.onAnchorMouseUp}
            />
          ))}
        </div>
      }
    </div>
    );
  }
}
