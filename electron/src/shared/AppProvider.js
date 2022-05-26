import React from "react";
import Toast from "../components/Toast";
import Loading from "../components/Loading";

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(
    localStorage.getItem("current_month")
  );
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [severity, setSeverity] = React.useState('error');
  const [message, setMessage] = React.useState("");

  const value = {
    auth,
    setAuth,
    setSeverity,
    setError,
    setMessage,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      <Loading open={isLoading} />
      <Toast
        open={isError}
        message={message}
        severity={severity}
        onClose={() => setError(false)}
      />
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return React.useContext(AppContext);
};

export default AppProvider;
