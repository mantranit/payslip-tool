import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Preview from "./containers/Preview";
import Login from "./containers/Login";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
