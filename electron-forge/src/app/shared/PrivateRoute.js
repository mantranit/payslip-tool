import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "./AppProvider";

const PrivateRouteComponent = (props) => {
  const { auth } = useApp();
  const { children } = props;
  if (!auth) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default PrivateRouteComponent;
