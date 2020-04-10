/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import ReactDOM from "react-dom";

// chess stuff
import Board from "./chess/Board";
import { observe, Position } from "./chess/Game";

// ide stuff
import IDE from "./ide/IDE";

const root = document.getElementById("root");

// enable for chess mode
// observe((knightPosition: Position) =>
//   ReactDOM.render(<Board knightPosition={knightPosition} />, root)
// );

ReactDOM.render(<IDE />, root);
