"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C5A059",
      light: "#C9A66B",
      dark: "#8C6D3F",
    },

    secondary: {
      main: "#111111",
    },

    background: {
      default: "#F7F5F1",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111111",
      secondary: "#666666",
    },
  },
});

export default theme;