import React from "react";

import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "./DndConstants";

export default function PaletteWidget() {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.Widget,
    },
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  return (
    <div
      ref={drag}
      style={{
        textAlign: "center",
        height: "40px",
        width: "100px",
        backgroundColor: "lightblue",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div
        style={{
          borderStyle: "dashed",
          borderColor: "black",
          height: "34px",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {`Widget`}
      </div>
    </div>
  );
}
