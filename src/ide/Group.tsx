import React from "react";

import { Grid } from "@material-ui/core";

interface GroupProps {
  id: number;
}
export default function Group({ id }: GroupProps) {
  return (
    <Grid
      item
      xs={12}
      style={{
        borderColor: "black",
        borderStyle: "dashed",
        backgroundColor: "pink",
        height: "50px",
        textAlign: "center",
      }}
    >
      <div>{`Group ${id}`}</div>
    </Grid>
  );
}
