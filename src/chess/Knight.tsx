/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import { useDrag, DragSourceMonitor, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "./Constants";

const horseImg =
  "data:image/png;base64,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";

export default function Knight() {
  //
  // the drag hook 🎣
  // turns *this* component into a drag source
  //
  // first item: properties returned from the 'collector'
  // second item: the ref function to attach to the draggable DOM element
  // third item: the ref function to attach to the drag preview DOM element
  const [{ isDragging }, drag, preview] = useDrag({
    // item.type is required. Identifies what is being dragged.
    item: {
      type: ItemTypes.KNIGHT,
    },
    // 'collector' called as the dragging happens and provides
    // properties for the dragged component obtained from the
    // passed 'monitor'
    collect: (monitor: DragSourceMonitor) => {
      console.log(
        `>>> drag source monitor - item = ${JSON.stringify(monitor.getItem())}`
      );
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={horseImg} />
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
    </>
  );
}
