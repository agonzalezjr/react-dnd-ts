/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import ReactDOM from "react-dom";

// chess stuff
import Board from "./chess/Board";
import { observe, Position } from "./chess/Game";

const root = document.getElementById("root");

// enable for chess mode
// observe((knightPosition: Position) =>
//   ReactDOM.render(<Board knightPosition={knightPosition} />, root)
// );

ReactDOM.render(<span>foo</span>, root);
