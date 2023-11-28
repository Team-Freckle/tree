import * as React from "react";

export interface NodeProps {
  node: PositionNode;
  color: string;
}

export interface PositionNode extends Node {
  x: number;
  y: number;
}

export interface Node {
  name: string;
  key: string;
  comment?: string;
  time: string;

  parent?: string;
  child?: Array<string>;
  childExtraWidth?: Map<string, number>;
  descendant?: string;
}

export class NodeTree extends React.Component<NodeProps> {
  public render() {
    const { node, color } = this.props;
    const { key, name, comment, time, x, y } = node;
    return (
      <g
        key={node.key}
        onClick={() => {
          console.log(node);
        }}
      >
        <circle cx={x} cy={y} r="5" style={{ fill: color }} />
        <text x={x + 15} y={y + 3} textAnchor="left" style={{ fill: color }}>
          {name}
        </text>
      </g>
    );
  }
}
