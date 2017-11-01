import * as React from 'react';

export type Mode = 'edit' | 'view';

export interface Props {
  mode?: Mode;
  height: number;
  width: number;
  style?: React.CSSProperties;
}

export class Editor extends React.Component<Props> {
  render() {
    const {
      width,
      height,
      children,
      style
    } = this.props;

    return (
      <div style={{ ...style, width, height }}>
        <div>
          {
            // TODO: Make it work for a single children
            children &&
            Array.isArray(children) &&
            children.map((el, index) => <div key={index}/>)
          }
        </div>
        {children}
      </div>
    );
  }
}
