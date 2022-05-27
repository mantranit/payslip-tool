import React from "react";
import Toast from "../components/Toast";
import Loading from "../components/Loading";

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(
    localStorage.getItem("current_month")
  );
  const [isLoading, setLoading] = React.useState(false);
  const [isToast, setToast] = React.useState(false);
  const [severity, setSeverity] = React.useState('error');
  const [message, setMessage] = React.useState("");

  const showToast = (message, severity = "error") => {
    setToast(true);
    setMessage(message);
    setSeverity(severity);
  }

  const value = {
    auth,
    setAuth,
    showToast,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      <Loading open={isLoading} />
      <Toast
        open={isToast}
        message={message}
        severity={severity}
        onClose={() => setToast(false)}
      />
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return React.useContext(AppContext);
};

export default AppProvider;
