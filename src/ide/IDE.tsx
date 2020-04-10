import React from "react";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import Palette from "./Palette";
import Form from "./Form";

export default function IDE() {
  return (
    <SplitterLayout percentage secondaryInitialSize={85}>
      <Palette />
      <Form />
    </SplitterLayout>
  );
}
