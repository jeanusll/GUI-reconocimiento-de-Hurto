import React, { useRef, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CameraFeed = ({ camera }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: {
        deviceId: camera.deviceId ? { exact: camera.deviceId } : undefined,
      },
      audio: false,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(`Error accediendo a la cámara ${camera.label}:`, err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [camera.deviceId, camera.label]);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" gutterBottom>
          {camera.label || "Cámara Desconocida"}
        </Typography>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            height: "auto",
            flexGrow: 1,
            backgroundColor: "#000",
          }}
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
      </CardContent>
    </Card>
  );
};

export default CameraFeed;
