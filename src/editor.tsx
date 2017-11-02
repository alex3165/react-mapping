import * as React from 'react';
import * as PropTypes from 'prop-types';

export type Mode = 'edit' | 'view';

export interface Props {
  mode?: Mode;
  height: number | string;
  width: number | string;
  style?: React.CSSProperties;
}

export class Editor extends React.Component<Props> {
  public static childContextTypes = {
    isEditMode: PropTypes.bool
  };

  public getChildContext = () => ({
    isEditMode: this.props.mode === 'edit'
  })

  render() {
    const {
      width,
      height,
      children,
      style
    } = this.props;

    return (
      <div style={{ ...style, width, height }}>
        {children}
      </div>
    );
  }
}
