import React from "react";
import Sidebar from "../Sidebar";
import "./styles.scss";

const LayoutComponent = (props) => {
  const { children, sidebar = (<></>) } = props;
  return (
    <div className="App">
      <aside className="App-sidebar">
        <Sidebar>{sidebar}</Sidebar>
      </aside>
      <main className="App-main">{children}</main>
    </div>
  );
};

export default LayoutComponent;
