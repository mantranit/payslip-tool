import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FilePicker from "../../components/FilePicker";
import MonthYearPicker from "../../components/MonthYearPicker";
import ToastComponent from "../../components/Toast";

const LoginContainer = () => {
  const today = new Date();
  let monthInit = today.getMonth() + 1;
  if (monthInit < 10) monthInit = "0" + monthInit;

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("Error");
  const [tabValue, setTabValue] = useState("1");
  const [month, setMonth] = useState(`${monthInit}/${today.getFullYear()}`);
  const [file, setFile] = useState("");

  const showError = (open, message) => {
    setLoading(false);
    setOpenError(open);
    setMessage(message);
  };

  const goInside = () => {
    setLoading(false);
    localStorage.setItem("current_month", month);
    navigate("/dashboard");
  };

  const handleUpload = () => {
    setLoading(true);
    window.appAPI.checkTableExist(
      month,
      (data) => {
        if (data.length > 0) {
          showError(true, `Table is existing.`);
        } else {
          window.appAPI.import(
            month,
            file,
            (data) => {
              goInside();
            },
            (error) => {
              showError(true, `Import: ${error}.`);
            }
          );
        }
      },
      (error) => {
        showError(true, `Table Exist: ${error}.`);
      }
    );
  };

  const handleLogin = () => {
    setLoading(true);
    window.appAPI.checkTableExist(
      month,
      (data) => {
        if (data.length > 0) {
          goInside();
        } else {
          showError(true, `Table is not exist.`);
        }
      },
      (error) => {
        showError(true, `Table Exist: ${error}.`);
      }
    );
  };

  return (
    <div className="login">
      <ToastComponent
        open={openError}
        message={message}
        onClose={() => setOpenError(false)}
      />
      <Paper className="login-content">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(event, newValue) => {
                setTabValue(newValue);
              }}
              variant="fullWidth"
            >
              <Tab label="Login" value="1" />
              <Tab label="Upload" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                onClick={handleLogin}
                disabled={isLoading}
              >
                Login
              </Button>
            </div>
          </TabPanel>
          <TabPanel value="2">
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
                onClick={handleUpload}
                disabled={isLoading}
              >
                Upload
              </Button>
            </div>
          </TabPanel>
        </TabContext>
      </Paper>
    </div>
  );
};

export default LoginContainer;
