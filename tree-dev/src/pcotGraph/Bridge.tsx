import * as React from "react";
import { PositionNode } from "./Node";

export interface BridgeProps {
  parent: PositionNode;
  child: PositionNode;
}

export class Bridge extends React.Component<BridgeProps> {
  public render() {
    const { parent, child } = this.props;
    return (
      <g>
        {parent.x === child.x ? (
          <g>
            <rect
              x={parent.x - 1.5}
              y={parent.y}
              width={3}
              height={child.y - parent.y}
            />
          </g>
        ) : (
          <g>
            <rect
              x={parent.x - 1.5}
              y={parent.y}
              width={child.x - parent.x}
              height={3}
            />
            <rect
              x={child.x - 1.5}
              y={parent.y}
              width={3}
              height={child.y - parent.y}
            />
          </g>
        )}
      </g>
    );
  }
}
