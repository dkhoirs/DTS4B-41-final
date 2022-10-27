// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Categories from "./containers/Categories";

import { ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import Headers from "./component/Headers";
import DetailNews from "./containers/DetailNews";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Headers />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="categories/:plan" element={<Categories />}></Route>
          <Route path="news/:plan" element={<DetailNews />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
