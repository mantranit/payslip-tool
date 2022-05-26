import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../../shared/AppProvider";
import AppBar from "../AppBar";
import "./styles.scss";

const LayoutComponent = (props) => {
  const { auth } = useApp();
  const { children } = props;
  return (
    <>
      {!auth && <Navigate to="/" replace={true} />}
      <AppBar />
      <div className="App">
        <main className="App-main">{children}</main>
      </div>
    </>
  );
};

export default LayoutComponent;
