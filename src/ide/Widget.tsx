import React from "react";

import { Grid } from "@material-ui/core";
import {
  useDrag,
  DragSourceMonitor,
  DropTargetMonitor,
  useDrop,
} from "react-dnd";
import { ItemTypes } from "./DndConstants";
import { useDispatch } from "react-redux";

interface WidgetProps {
  id: number;
}
export default function Widget({ id }: WidgetProps) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.Widget,
      id: id,
    },
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.Widget, ItemTypes.Group],

    collect: (monitor: DropTargetMonitor) => {
      return {
        isOver: !!monitor.isOver({ shallow: true }) && monitor.canDrop(),
      };
    },
    canDrop: (item: any, monitor: DropTargetMonitor) => {
      // cannot drop a widget on top of itself
      return item.id !== id;
    },
    // called when the item is dropped on this drop target
    drop: (item: any, monitor: DropTargetMonitor) => {
      dispatch({
        type: "ADD_ITEM",
        itemType: monitor.getItemType(),
      });
    },
  });

  return (
    <Grid
      ref={drag}
      item
      xs={3}
      style={{
        borderColor: "black",
        borderStyle: "dashed",
        backgroundColor: "lightBlue",
        height: "50px",
        textAlign: "center",
        cursor: "move",
        opacity: isOver ? 0.5 : 1,
      }}
    >
      <div ref={drop} style={{ height: "100%" }}>
        <div>{`Widget ${id}`}</div>
      </div>
    </Grid>
  );
}
