import React from "react";
import { Grid } from "@mui/material";
import CameraFeed from "./CameraFeed";

const DynamicGrid = ({ cameras }) => {
  const count = cameras.length;

  let columns = 1;
  if (count === 2) columns = 2;
  else if (count === 3 || count === 4) columns = 2;
  else if (count > 4) columns = 3;

  const gridSize = Math.floor(12 / columns);

  return (
    <Grid container spacing={2}>
      {cameras.map((camera) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={gridSize}
          lg={gridSize}
          key={camera.deviceId}
        >
          <CameraFeed camera={camera} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicGrid;
