import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Preview from "./containers/Preview";
import Login from "./containers/Login";

const Router = () => {
  return (
    <HashRouter>
      <Routes path="/*">
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
