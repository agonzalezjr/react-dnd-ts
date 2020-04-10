import React, { PropsWithChildren } from "react";
import Square from "./Square";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "./Constants";
import { moveKnight, canMoveKnight } from "./Game";

interface BoardSquareProps {
  x: number;
  y: number;
}

function Overlay({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    ></div>
  );
}

export default function BoardSquare({
  x,
  y,
  children,
}: PropsWithChildren<BoardSquareProps>) {
  const black = (x + y) % 2 === 1;

  //
  // the drop hook 🎣
  //
  // first item: properties returned from the 'collector'
  // second item: the ref function to attach to the drop DOM element
  const [{ isOver, canDrop }, drop] = useDrop({
    // the valid item.type this accepts, if this doesn't match, the
    // collect and drop below are never called
    accept: ItemTypes.KNIGHT,
    // 'collector' called as the possibility to drop happens and provides
    // properties for the drop component obtained from the
    // passed 'monitor'
    collect: (monitor: DropTargetMonitor) => {
      console.log(
        `>>> drop target monitor - item = ${JSON.stringify(monitor.getItem())}`
      );
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
    // whether we can drop
    canDrop: () => canMoveKnight(x, y),
    // what to do when the drop happens
    drop: () => moveKnight(x, y),
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && canDrop && <Overlay color="green" />}
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
    </div>
  );
}
