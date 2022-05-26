import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppProvider from "./shared/AppProvider";
import Router from "./router";

const App = () => {
  return (
    <AppProvider>
      <CssBaseline />
      <Router />
    </AppProvider>
  );
};

export default App;
