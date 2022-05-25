import React from "react";
import { Navigate } from "react-router-dom";
import AppBar from "../AppBar";
import Sidebar from "../Sidebar";
import "./styles.scss";

const LayoutComponent = (props) => {
  const month = localStorage.getItem("current_month");
  const { children, sidebar = <></> } = props;
  return (
    <>
      {!month && <Navigate to="/" replace={true} />}
      <AppBar />
      <div className="App">
        <aside className="App-sidebar">
          <Sidebar>{sidebar}</Sidebar>
        </aside>
        <main className="App-main">{children}</main>
      </div>
    </>
  );
};

export default LayoutComponent;
