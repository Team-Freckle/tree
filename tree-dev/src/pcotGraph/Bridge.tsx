import * as React from "react";
import { PositionNode } from "./Node";

export interface BridgeProps {
  parent: PositionNode;
  child: PositionNode;
  color: string;
}

export class Bridge extends React.Component<BridgeProps> {
  public render() {
    const { parent, child, color } = this.props;
    return (
      <g>
        {parent.x === child.x ? (
          <g>
            <rect
              x={parent.x - 1.5}
              y={parent.y}
              width={3}
              height={child.y - parent.y}
              style={{ fill: color }}
            />
          </g>
        ) : (
          <g>
            <rect
              x={parent.x - 1.5}
              y={parent.y}
              width={child.x - parent.x}
              height={3}
              style={{ fill: color }}
            />
            <rect
              x={child.x - 1.5}
              y={parent.y}
              width={3}
              height={child.y - parent.y}
              style={{ fill: color }}
            />
          </g>
        )}
      </g>
    );
  }
}
