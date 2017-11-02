import * as React from 'react';
import { Anchor } from './layer';

const anchorSize = 30;
const halfAnchor = anchorSize / 2;

const styles = {
  container: {
    width: anchorSize,
    height: anchorSize,
    borderRadius: '50%',
    position: 'absolute' as 'absolute',
    backgroundColor: 'blue'
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
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseDown: React.MouseEventHandler<HTMLElement>;
  onMouseMove: React.MouseEventHandler<HTMLElement>;
  onMouseUp: React.MouseEventHandler<HTMLElement>;
}

export const AnchorComponent: React.StatelessComponent<Props> = ({
  position,
  onMouseEnter,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    style={{...styles.container, ...styles[position]}}
  />
);
