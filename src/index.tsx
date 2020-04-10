import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import { observe, Position } from "./Game";

const root = document.getElementById("root");

observe((knightPosition: Position) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root)
);
