import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Preview from "./containers/Preview";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
