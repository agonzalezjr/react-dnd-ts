import React from "react";
import Square from "./Square";
import Knight from "./Knight";
import { Position, moveKnight, canMoveKnight } from "./Game";

interface BoardProps {
  knightPosition: Position;
}

const squaresSize = 3;

function handleSquareClick(toX: number, toY: number) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}

function renderSquare(i: number, [knightX, knightY]: number[]) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const isKnightHere = x === knightX && y === knightY;
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;

  return (
    <div
      key={i}
      onClick={() => {
        handleSquareClick(x, y);
      }}
      style={{ width: `${squaresSize}rem`, height: `${squaresSize}rem` }}
    >
      <Square black={black}>{piece}</Square>
    </div>
  );
}

export default function Board({ knightPosition }: BoardProps) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
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
  );
}
