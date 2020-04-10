import React from "react";
import BoardSquare from "./BoardSquare";
import Knight from "./Knight";
import { Position } from "./Game";

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

interface BoardProps {
  knightPosition: Position;
}

const squaresSize = 3;

function renderSquare(i: number, knightPosition: Position) {
  const x = i % 8;
  const y = Math.floor(i / 8);

  return (
    <div
      key={i}
      style={{ width: `${squaresSize}rem`, height: `${squaresSize}rem` }}
    >
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

function renderPiece(x: number, y: number, knightPosition: Position) {
  if (x === knightPosition[0] && y === knightPosition[1]) {
    return <Knight />;
  } else {
    return null;
  }
}

export default function Board({ knightPosition }: BoardProps) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <DndProvider backend={Backend}>
      <div
        style={{
          width: `${squaresSize * 8}rem`,
          height: `${squaresSize * 8}rem`,
          display: "flex",
          flexWrap: "wrap",
          border: "brown",
          borderStyle: "solid",
          borderWidth: "10px",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
}
