import * as React from "react";

export interface NodeProps {
  node: PositionNode;
}

export interface RawNode extends Node {
  child?: Array<RawNode>;
}

export interface PositionNode extends Node {
  x: number;
  y: number;
  level: number;
  childCount: number;
}

export interface Node {
  name: string;
  key: string;
  comment?: string;
  time: string;
  childTime: string;
}

export class NodeTree extends React.Component<NodeProps> {
  public render() {
    const { node } = this.props;
    const { key, name, comment, time, x, y, level } = node;
    return (
      <g
        key={node.key}
        onClick={() => {
          console.log(node);
        }}
      >
        <circle cx={x} cy={y} r="5" fill="#3e295e" />
        <text x={x + 15} y={y + 3} textAnchor="left" fill="black">
          {name}
        </text>
      </g>
    );
  }
}
