import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import GridView from "./containers/GridView";
import ListView from "./containers/ListView";
import Select from "./containers/Select";
import Setting from "./containers/Setting";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/grid-view" element={<GridView />} />
        <Route path="/list-view" element={<ListView />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
