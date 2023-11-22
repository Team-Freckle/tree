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

    this.state = {};
  }

  public render() {
    const data = this.props.tree;
    const blueprint = this.createBlueprint(data);
    console.log(blueprint);

    return (
      <svg height={500} width={500}>
        {this.drawNode(blueprint)}
      </svg>
    );
  }

  private createBlueprint(data: RawNode, parent?: PositionNode) {
    if (!parent) {
      parent = {
        key: "",
        name: "",
        time: "",
        childTime: "",
        x: 10,
        y: 0,
        level: 0,
        childCount: 0,
      };
    }
    const isFirst: Boolean = parent.childCount === 0;
    const x: number = parent.x + 100 * parent.childCount;
    const y: number = parent.y + 100 * (isFirst ? 1 : 0.5); // 서열 판별
    const level: number = parent.level + 1;

    let childCount = 0;

    let node: PositionNode = {
      key: data.key,
      name: data.name,
      comment: data.comment,
      time: data.time,
      childTime: data.childTime,
      x: x,
      y: y,
      level: level,
      childCount: childCount,
    };

    const arr: Array<PositionNode> =
      data.child && Array.isArray(data.child)
        ? data.child
            .sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            )
            .map((children) => {
              const result: Array<PositionNode> = this.createBlueprint(
                children,
                node
              );
              node.childCount++;

              return result;
            })
            .flat()
        : [];

    console.log(arr);
    return arr.concat(node);
  }

  private drawNode(data: Array<PositionNode>) {
    return data.map((node) => {
      return <NodeTree node={node} />;
    });
  }
}
