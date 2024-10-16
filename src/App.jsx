import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DynamicGrid from "./components/DynamicGrid";
import AlertList from "./components/AlertList";
import alertsData from "./data/alerts";

const drawerWidth = 350;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [cameras, setCameras] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [latestAlert, setLatestAlert] = useState(null);

  useEffect(() => {
    // Enumerar dispositivos de video
    const getCameras = async () => {
      try {
        // Solicitar permisos para acceder a las cámaras
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameras(videoDevices);
      } catch (error) {
        console.error("Error accediendo a las cámaras:", error);
      }
    };

    // Cargar alertas iniciales
    const fetchAlerts = () => {
      setAlerts(alertsData);
    };

    const initialize = async () => {
      await getCameras();
      fetchAlerts();
      setLoading(false);
    };

    initialize();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cameras.length === 0) return;

      const randomCamera = cameras[Math.floor(Math.random() * cameras.length)];
      const newAlert = {
        id: alerts.length + 1,
        camera:
          randomCamera.label ||
          `Cámara ${Math.floor(Math.random() * cameras.length) + 1}`,
        time: new Date().toLocaleString(),
        status: "Activo",
        thumbnail: "https://via.placeholder.com/150",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      };
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
      setLatestAlert(newAlert);
      setOpenSnackbar(true);
    }, 15000); // 15 segundos

    return () => clearInterval(interval);
  }, [alerts.length, cameras]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sistema de Monitoreo
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", padding: 2 }}>
          <AlertList alerts={alerts} />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginRight: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Feeds de Cámaras
        </Typography>
        {cameras.length === 0 ? (
          <Typography>No se detectaron cámaras en el dispositivo.</Typography>
        ) : (
          <DynamicGrid cameras={cameras} />
        )}
      </Box>

      {latestAlert && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Nueva alerta en {latestAlert.camera} a las {latestAlert.time}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default App;
