import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#395144",
      contrastText: "rgba(255,255,255,0.87)",
    },
    secondary: {
      main: "#aa8b56",
    },
    default: {
      main: "#ecece9",
    },
    background: {
      default: "#ecece9",
      paper: "#F0EBCE",
    },
  },
});
export default theme;
