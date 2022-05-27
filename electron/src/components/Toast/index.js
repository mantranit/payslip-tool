/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ToastComponent = (props) => {
  const {onClose = () => {} } = props;
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState("");

  useEffect(()=> {
    const { open, message, severity } = props;
    setSeverity(severity);
    setOpen(open);
    setMessage(message);
  }, [props])

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastComponent;
