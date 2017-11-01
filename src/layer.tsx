import * as React from 'react';

export interface Props {
  height: number;
  width: number;
}

export class Layer extends React.Component<Props> {
  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <div style={{ width, height }}>
        {
          this.props.children
        }
      </div>
    );
  }
}
