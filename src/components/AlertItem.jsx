import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

const AlertItem = ({ alert }) => {
  return (
    <ListItem
      button
      component="a"
      href={alert.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar variant="square" src={alert.thumbnail}>
          <VideoCameraFrontIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Alerta en ${alert.camera}`}
        secondary={alert.time}
        sx={{ marginRight: "8px" }}
      />
      <Chip
        label={alert.status}
        color={alert.status === "Activo" ? "error" : "success"}
        size="small"
      />
    </ListItem>
  );
};

export default AlertItem;
