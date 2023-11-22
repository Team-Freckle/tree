import * as React from "react";
import { Node, NodeTree, PositionNode } from "./Node";
import { Bridge } from "./Bridge";

export interface PcotGraphProps {
  tree: Array<Node>;
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

  private createRelation(data: Array<Node>) {
    data = data.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    // 최 하위 후손 key 가져오기
    data = data.map((child) => {
      if (child.parent) {
        const descendant = data.find(({ key }) => key === child.parent);
        if (descendant) descendant.descendant = child.key;
      } else {
        child.descendant = child.key;
      }
      return child;
    });
    return data;
  }

  private createBlueprint(data: Array<Node>) {
    data = this.createRelation(data);
    const pos: PositionNode = {
      key: data[0].key,
      name: data[0].name,
      comment: data[0].comment,
      time: data[0].time,
      x: 10,
      y: 0,
      childCount: 0,

      child: [],
    };

    const queue: Array<PositionNode> = [pos];
    let result: Array<PositionNode> = [];
    let level: number = 0;

    while (queue.length > 0) {
      const parentNode = queue.shift()!;
      const childs = data.filter(({ parent }) => parent === parentNode.key);
      console.log(parentNode.name + "'s child ");
      console.log(childs);

      if (Array.isArray(parentNode.child)) {
        for (const child of childs) {
          console.log(
            child.name +
              "(" +
              child.key +
              ")" +
              " is " +
              parentNode.name +
              "(" +
              parentNode.key +
              ")'s child"
          );
          const x = parentNode.x + 30 * parentNode.childCount;
          level++;
          const y = 30 * level;
          console.log(child.name + "'s level : " + level);

          const childNode: PositionNode = {
            key: child.key,
            name: child.name,
            comment: child.comment,
            time: child.time,
            x: x,
            y: y,
            childCount: 0,
            parent: parentNode.key,
            child: [],
          };

          parentNode.child.concat(child.key);

          parentNode.childCount++;
          queue.push(childNode);
        }
        result.push(parentNode);
      }
    }
    return result;
  }

  private drawNode(data: Array<PositionNode>) {
    const parentMap: Record<string, PositionNode> = {};
    data.forEach((node) => {
      parentMap[node.key] = node;
    });
    return data.map((node) => {
      const parent = parentMap[node.parent!];

      if (!parent)
        return (
          <g>
            <NodeTree node={node} />
          </g>
        );
      console.log("bridging to " + node.name + " " + parent.name);
      console.log("key : " + node.parent + " " + parent.key);

      console.log(node.name + " 최하위 자손 : " + node.descendant);
      const result = (
        <g>
          <NodeTree node={node} />
          <Bridge parent={parent} child={node} />
        </g>
      );

      return result;
    });
  }
}
