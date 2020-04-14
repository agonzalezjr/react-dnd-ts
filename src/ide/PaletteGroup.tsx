import React from "react";

import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "./DndConstants";

export default function PaletteGroup() {
  const [{ isDragging }, drag] = useDrag({
    item: {
      // -1 => it's a new widget
      id: -1,
      type: ItemTypes.Group,
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
        // backgroundColor: "pink",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div
        style={{
          border: "dashed black thin",
          height: "34px",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {`Group`}
      </div>
    </div>
  );
}
