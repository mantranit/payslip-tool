import React from "react";
import AppBar from "../AppBar";
import "./styles.scss";

const LayoutComponent = (props) => {
  const { children } = props;
  return (
    <>
      <AppBar />
      <div className="App">
        <main className="App-main">{children}</main>
      </div>
    </>
  );
};

export default LayoutComponent;
