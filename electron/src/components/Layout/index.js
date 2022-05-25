import React from "react";
import { Navigate } from "react-router-dom";
import AppBar from "../AppBar";
import "./styles.scss";

const LayoutComponent = (props) => {
  const month = localStorage.getItem("current_month");
  const { children } = props;
  return (
    <>
      {!month && <Navigate to="/" replace={true} />}
      <AppBar />
      <div className="App">
        <main className="App-main">{children}</main>
      </div>
    </>
  );
};

export default LayoutComponent;
