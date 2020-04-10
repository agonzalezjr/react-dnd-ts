/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import ReactDOM from "react-dom";

// redux stuff
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./redux/reducer";

// chess stuff
import Board from "./chess/Board";
import { observe, Position } from "./chess/Game";

// ide stuff
import IDE from "./ide/IDE";
import { createStore } from "redux";

const root = document.getElementById("root");

// enable for chess mode
// observe((knightPosition: Position) =>
//   ReactDOM.render(<Board knightPosition={knightPosition} />, root)
// );

// Configure Redux Store.
const store = createStore(reducer, devToolsEnhancer({}));

ReactDOM.render(
  <Provider store={store}>
    <IDE />
  </Provider>,
  root
);
