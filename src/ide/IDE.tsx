import React from "react";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import Palette from "./Palette";
import Board from "./Board";

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

export default function IDE() {
  return (
    <DndProvider backend={Backend}>
      <SplitterLayout percentage secondaryInitialSize={80}>
        <div style={{ padding: "20px", height: "100%" }}>
          <Palette />
        </div>
        <div style={{ padding: "20px", height: "100%" }}>
          <Board />
        </div>
      </SplitterLayout>
    </DndProvider>
  );
}
