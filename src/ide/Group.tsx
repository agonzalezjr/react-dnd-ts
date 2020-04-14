import React, { useRef, useState } from "react";

import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Widget, { DropPosition } from "./Widget";
import {
  useDrop,
  DropTargetMonitor,
  useDrag,
  DragSourceMonitor,
} from "react-dnd";
import { ItemTypes } from "./DndConstants";
import { ReduxState } from "../redux/reducer";

interface GroupProps {
  id: number;
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

  // console.log(`> bounds: ${JSON.stringify(bounds)}`);
  // console.log(`> position: ${JSON.stringify(position)}`);

  if (!position) {
    return DropPosition.Before;
  }

  // const middleX = (bounds.right - bounds.left) / 2;

  const beforeX = (bounds.right - bounds.left) * 0.2;
  const afterX = (bounds.right - bounds.left) * 0.8;

  const relativeX = position.x - bounds.left;

  // console.log(`> middleX   = ${middleX}`);
  // console.log(`> beforeX   = ${beforeX}`);
  // console.log(`> afterX    = ${afterX}`);
  // console.log(`> relativeX = ${relativeX}`);

  if (relativeX < beforeX) {
    return DropPosition.Before;
  } else if (relativeX > afterX) {
    return DropPosition.After;
  } else {
    return DropPosition.Inside;
  }
};

export default function Group({ id }: GroupProps) {
  const widgets = useSelector(
    (state: ReduxState) =>
      state.widgets.find((widget) => widget.id === id)?.widgets
  );
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
      type: ItemTypes.Group,
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

  return (
    <Grid
      ref={ref}
      item
      xs={12}
      style={{
        border: "black dashed thin",
        backgroundColor: "pink",
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
      <div>{`Group ${id}`}</div>
      {widgets &&
        widgets.map((widget) => {
          return widget.type === ItemTypes.Widget ? (
            <Widget key={widget.id} id={widget.id} />
          ) : (
            <Group key={widget.id} id={widget.id} />
          );
        })}
    </Grid>
  );
}
