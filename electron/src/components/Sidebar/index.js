import React from "react";
import "./styles.scss";

const SidebarComponent = (props) => {
  const { children } = props;
  if (children) {
    return <aside className="App-sidebar">{children}</aside>;
  }
  return <aside className="App-sidebar">
    
  </aside>;
};

export default SidebarComponent;
