/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

export default function Knight() {
  //
  // the drag hook 🎣
  //
  // first item: properties returned from the 'collector'
  // second item: the ref function to attach to the draggable DOM element
  const [{ isDragging }, drag] = useDrag({
    // item.type is required. Identifies what is being dragged.
    item: {
      type: ItemTypes.KNIGHT,
    },
    // 'collector' called as the dragging happens and provides
    // properties for the dragged component obtained from the
    // passed 'monitor'
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      // Adding this ref here makes the night a "drag source"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        cursor: "move",
      }}
    >
      🐴
    </div>
  );
}
