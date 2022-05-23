import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import View from "./containers/View";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
