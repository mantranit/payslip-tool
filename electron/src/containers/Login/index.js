import React, { useState } from "react";
import "./styles.scss";
import { Box, Paper, Button } from "@mui/material";
import FilePicker from "../../components/FilePicker";
import MonthYearPicker from "../../components/MonthYearPicker";

const LoginContainer = () => {
  const today = new Date();
  let monthInit = today.getMonth() + 1;
  if (monthInit < 10) monthInit = '0' + monthInit;

  const [isLoading, setLoading] = useState(false);
  const [month, setMonth] = useState(`${monthInit}/${today.getFullYear()}`);
  const [file, setFile] = useState("");

  const handleSubmit = () => {
    console.log(month, file);
  };

  return (
    <div className="login">
      <Box>
        <Paper className="login-content">
          <div className="login-content__row">
            <FilePicker
              value={file}
              onChange={(newValue) => setFile(newValue)}
            />
          </div>
          <div className="login-content__row">
            <MonthYearPicker
              value={month}
              onChange={(newValue) => setMonth(newValue)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              {file ? 'Upload' : 'Login'}
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default LoginContainer;
