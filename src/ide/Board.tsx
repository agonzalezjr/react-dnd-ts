import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux/reducer";
import Widget from "./Widget";

import { useDispatch } from "react-redux";

import { Grid } from "@material-ui/core";

import { useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "./DndConstants";
import Group from "./Group";

export default function Board() {
  const widgets = useSelector((state: ReduxState) => state.widgets);
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.Widget, ItemTypes.Group],
    collect: (monitor: DropTargetMonitor) => {
      return {
        isOver: !!monitor.isOver({ shallow: true }),
      };
    },
    // called when the item is dropped on this drop target
    drop: (item: any, monitor: DropTargetMonitor) => {
      // this is true if something else already processed the drop
      if (!monitor.didDrop() && item.id === -1) {
        dispatch({
          type: "ADD_ITEM",
          itemType: monitor.getItemType(),
        });
      }
    },
  });

  return (
    <Grid
      ref={drop}
      container
      style={{
        borderColor: "black",
        borderStyle: "solid",
        backgroundColor: "lightGreen",
        opacity: isOver ? 0.5 : 1,
      }}
    >
      {widgets.map((widget) => {
        return widget.type === ItemTypes.Widget ? (
          <Widget key={widget.id} id={widget.id} />
        ) : (
          <Group key={widget.id} id={widget.id} />
        );
      })}
    </Grid>
  );
}
