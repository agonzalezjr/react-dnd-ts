import React, { PropsWithChildren } from "react";

interface SquareProps {
  black: boolean;
}

export default function Square({
  black,
  children,
}: PropsWithChildren<SquareProps>) {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
