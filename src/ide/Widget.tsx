import React, { useRef, useState, useEffect } from "react";

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

export enum DropPosition {
  Before = "Before",
  After = "After",
  Inside = "Inside",
}

const getDropPosition = (
  droptTargetRef: React.RefObject<HTMLDivElement>,
  monitor: DropTargetMonitor
): DropPosition => {
  if (!droptTargetRef.current) {
    return DropPosition.Before;
  }

  const bounds = droptTargetRef.current!.getBoundingClientRect();
  const position = monitor.getClientOffset();

  if (!position) {
    return DropPosition.Before;
  }

  const middleX = (bounds.right - bounds.left) / 2;
  const relativeX = position.x - bounds.left;

  if (relativeX < middleX) {
    return DropPosition.Before;
  } else {
    return DropPosition.After;
  }
};

export default function Widget({ id }: WidgetProps) {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [dropPosition, setDropPosition] = useState(DropPosition.Before);

  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.Widget, ItemTypes.Group],

    collect: (monitor: DropTargetMonitor) => {
      console.log(`collecting ...`);

      return {
        isOver: !!monitor.isOver({ shallow: true }) && monitor.canDrop(),
      };
    },
    hover: (item: any, monitor: DropTargetMonitor) => {
      console.log(`hovering ...`);

      // collect doesn't get called all the time, so we have to use
      // this hook callback to keep the drop position updated
      setDropPosition(getDropPosition(ref, monitor));
    },
    canDrop: (item: any, monitor: DropTargetMonitor) => {
      // cannot drop a widget on top of itself
      return item.id !== id;
    },
    // called when the item is dropped on this drop target
    drop: (item: any, monitor: DropTargetMonitor) => {
      if (!monitor.canDrop()) {
        return;
      }

      const dp = getDropPosition(ref, monitor);

      console.log(`Dropped '${dp}'`);

      dispatch({
        type: "ADD_ITEM",
        id: item.id,
        reference: id,
        itemType: monitor.getItemType(),
        dropPosition: dp,
      });
    },
  });

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

  // this combines all refs into one so we don't need to
  // have multiple div-s wrapped around each other
  drag(drop(ref));

  // Once you have a ref, this is a way to get location and size **once**,
  // but it won't work on resize/relocation :( There really isn't a good
  // solution for that (either polling or an half cross-browser implemented)
  // API for size only (what!?)
  /*
  useEffect(() => {
    if (ref.current) {
      console.log(
        `> Widget ${id} position = ${JSON.stringify(
          ref.current.getBoundingClientRect()
        )}`
      );
    }
  });
  */

  return (
    <Grid
      ref={ref}
      item
      xs={3}
      style={{
        border: "black dashed thin",
        backgroundColor: "lightBlue",
        height: "50px",
        textAlign: "center",
        cursor: "move",
        opacity: isDragging ? 0.15 : isOver ? 0.85 : 1,
        borderRight:
          isOver &&
          (dropPosition === DropPosition.After ||
            dropPosition === DropPosition.Inside)
            ? "red solid thick"
            : "black dashed thin",
        borderLeft:
          isOver &&
          (dropPosition === DropPosition.Before ||
            dropPosition === DropPosition.Inside)
            ? "red solid thick"
            : "black dashed thin",
        borderTop:
          isOver && dropPosition === DropPosition.Inside
            ? "red solid thick"
            : "black dashed thin",
        borderBottom:
          isOver && dropPosition === DropPosition.Inside
            ? "red solid thick"
            : "black dashed thin",
      }}
    >
      <div>{`Widget ${id}`}</div>
    </Grid>
  );
}
