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
    console.log("time normal line");
    console.log(data);
    data = data.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    // 최 하위 후손 key 가져오기
    data.map((child) => {
      if (child.parent) {
        const parent = data.find(({ key }) => key === child.parent);

        console.log(parent);
        if (parent) {
          if (!parent.childExtraWidth) {
            parent.childExtraWidth = new Map<string, number>();
          }
          if (child.childExtraWidth) {
            const total = Array.from(child.childExtraWidth.values()).reduce(
              (acc, value) => acc + value,
              0
            );
            parent.childExtraWidth.set(child.key, total > 0 ? total : 1);
          } else parent.childExtraWidth.set(child.key, 1);
          if (!child.descendant) {
            child.descendant = child.key;
          }
          if (parent.descendant) {
            if (
              new Date(
                data.find(({ key }) => key === parent.descendant)!.time
              ).getTime() -
                new Date(
                  data.find(({ key }) => key === child.descendant)!.time
                ).getTime() <
              0
            ) {
              parent.descendant = child.descendant;
            }
          } else {
            parent.descendant = child.descendant;
          }
        }
      }

      return child;
    });

    data = data.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

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

      child: [],
      childExtraWidth: data[0].childExtraWidth,
    };

    let queue: Array<PositionNode> = [pos];
    let result: Array<PositionNode> = [];
    let level: number = 0;
    let jump: number = 0;

    while (queue.length > 0) {
      const parentNode = queue.shift()!;
      console.log(parentNode.name + "'s level : " + level);
      parentNode.y = 30 * level;
      level++;
      const childs: Array<Node> = data.filter(
        ({ parent }) => parent === parentNode.key
      );

      console.log(parentNode.name + "'s child ");
      console.log(childs);

      childs.sort(
        (a, b) =>
          new Date(
            data.find(({ descendant }) => descendant === a.descendant)!.time
          ).getTime() -
          new Date(
            data.find(({ descendant }) => descendant === b.descendant)!.time
          ).getTime()
      );

      jump = 0;
      // eslint-disable-next-line no-loop-func
      const nextQueue = childs.map((child) => {
        console.log("jump : " + jump);
        const x = parentNode.x + 30 * jump;
        jump = parentNode.childExtraWidth?.get(child.key)!;
        parentNode.childExtraWidth?.delete(child.key);

        const childNode: PositionNode = {
          key: child.key,
          name: child.name,
          comment: child.comment,
          time: child.time,
          x: x,
          y: 0,
          parent: parentNode.key,

          child: [],

          childExtraWidth: child.childExtraWidth,
        };

        parentNode.child!.concat(child.key);

        return childNode;
      });
      console.log(queue);
      queue = [...queue, ...nextQueue];
      queue = queue.sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      );

      result.push(parentNode);
    }
    console.log("result");
    console.log(result);
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
