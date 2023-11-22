import * as React from "react";
import { NodeTree, RawNode, PositionNode } from "./Node";
import { Bridge } from "./Bridge";

export interface PcotGraphProps {
  tree: RawNode;
}
export interface PcotGraphState {}

export class PcotGraph extends React.Component<PcotGraphProps, PcotGraphState> {
  constructor(props: PcotGraphProps) {
    super(props);

    this.levelLayer = [];

    this.state = {};
  }

  private levelLayer: Array<number>;

  public render() {
    const data = this.props.tree;

    return (
      <svg height={500} width={500}>
        {this.drawNode(data)}
      </svg>
    );
  }

  public drawNode(data: RawNode, parent?: PositionNode) {
    if (!parent) {
      parent = { key: null, x: 10, y: 0, level: 0, childCount: 0 };
    }
    const x = parent.x + 100 * parent.childCount;
    const y = parent.y + 100 * (parent.childCount === 0 ? 1 : 0.5); // 서열 판별
    const level = parent.level + 1;

    let childCount = 0;

    let node = {
      key: data.key,
      x: x,
      y: y,
      level: level,
      childCount: childCount,
    };

    return (
      <g>
        <NodeTree node={data} x={x} y={y}>
          {data.child &&
            data.child?.map((children) => {
              const result = this.drawNode(children, node);
              node.childCount++;

              return result;
            })}
        </NodeTree>
        {parent.level !== 0 ? <Bridge parent={parent} child={node} /> : null}
      </g>
    );
  }
}
