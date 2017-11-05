import * as React from 'react';
import { Anchor, Vector } from './layer';
import { vectorToTransform } from './util';

const anchorSize = 30;
const halfAnchor = anchorSize / 2;

const styles = {
  container: {
    width: anchorSize,
    height: anchorSize,
    borderRadius: '50%',
    position: 'absolute' as 'absolute',
    backgroundColor: 'blue',
    cursor: 'pointer'
  },
  'top-left': {
    left: - halfAnchor,
    top: - halfAnchor
  },
  'bottom-left': {
    left: - halfAnchor,
    bottom: - halfAnchor
  },
  'top-right': {
    top: - halfAnchor,
    right: - halfAnchor
  },
  'bottom-right': {
    bottom: - halfAnchor,
    right: - halfAnchor
  }
};

export interface Props {
  position: Anchor;
  onMouseEnter?: (position: Anchor) => void;
  onMouseDown: (evt: any, position: Anchor) => void;
  onMouseMove: (evt: any, position: Anchor) => void;
  onMouseUp: (position: Anchor) => void;
  translation: Vector;
}

export const AnchorComponent: React.StatelessComponent<Props> = ({
  position,
  translation,
  onMouseEnter,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => (
  <div
    onMouseEnter={() => onMouseEnter && onMouseEnter(position)}
    onMouseDown={(evt) => onMouseDown(evt, position)}
    onMouseMove={(evt) => onMouseMove(evt, position)}
    onMouseUp={() => onMouseUp(position)}
    style={{
      ...styles.container,
      ...styles[position],
      transform: vectorToTransform(translation)
    }}
  />
);
