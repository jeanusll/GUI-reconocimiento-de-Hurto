import React from "react";
import { List, Typography } from "@mui/material";
import AlertItem from "./AlertItem";

const AlertList = ({ alerts }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Historial de Alertas
      </Typography>
      <List>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </List>
    </div>
  );
};

export default AlertList;
