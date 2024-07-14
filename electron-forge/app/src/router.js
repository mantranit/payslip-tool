import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./shared/PrivateRoute";

import GridView from "./containers/GridView";
import ListView from "./containers/ListView";
import Select from "./containers/Select";
import Setting from "./containers/Setting";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/setting" element={<Setting />} />
        <Route
          path="/grid-view"
          element={
            <PrivateRoute>
              <GridView />
            </PrivateRoute>
          }
        />
        <Route
          path="/list-view"
          element={
            <PrivateRoute>
              <ListView />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default Router;
