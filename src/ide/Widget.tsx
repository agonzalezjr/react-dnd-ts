import React from "react";

import { Grid } from "@material-ui/core";

interface WidgetProps {
  id: number;
}
export default function Widget({ id }: WidgetProps) {
  return (
    <Grid
      item
      xs={3}
      style={{
        borderColor: "black",
        borderStyle: "dashed",
        backgroundColor: "lightBlue",
        height: "50px",
        textAlign: "center",
      }}
    >
      <div>{`Widget ${id}`}</div>
    </Grid>
  );
}
