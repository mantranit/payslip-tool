/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useApp } from "../../shared/AppProvider";
import "./styles.scss";
import Layout from "../../components/Layout";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const SettingContainer = () => {
  const { setLoading, showToast } = useApp();
  const [isShowPassword, setShowPassword] = useState(false);
  const [MAIL_SERVER_HOST, setHost] = useState("");
  const [MAIL_SERVER_PORT, setPort] = useState("");
  const [MAIL_SERVER_ACCOUNT, setEmail] = useState("");
  const [MAIL_SERVER_PASSWORD, setPassword] = useState("");

  useEffect(() => {
    window.appAPI.fetch(
      `SELECT * FROM setting`,
      (data) => {
        setHost(
          data.filter((row) => row.key === "MAIL_SERVER_HOST").length > 0
            ? data.filter((row) => row.key === "MAIL_SERVER_HOST")[0].value
            : ""
        );
        setPort(
          data.filter((row) => row.key === "MAIL_SERVER_PORT").length > 0
            ? data.filter((row) => row.key === "MAIL_SERVER_PORT")[0].value
            : ""
        );
        setEmail(
          data.filter((row) => row.key === "MAIL_SERVER_ACCOUNT").length > 0
            ? data.filter((row) => row.key === "MAIL_SERVER_ACCOUNT")[0].value
            : ""
        );
        setPassword(
          data.filter((row) => row.key === "MAIL_SERVER_PASSWORD").length > 0
            ? data.filter((row) => row.key === "MAIL_SERVER_PASSWORD")[0].value
            : ""
        );
      },
      (error) => {
        console.log("setting fetch error", error.toString());
      }
    );
  }, []);

  const handleUpdate = () => {
    setLoading(true);
    window.appAPI.saveSetting(
      JSON.stringify({
        MAIL_SERVER_HOST,
        MAIL_SERVER_PORT,
        MAIL_SERVER_ACCOUNT,
        MAIL_SERVER_PASSWORD,
      }),
      (data) => {
        setLoading(false);
        showToast("Save successful!", "success");
      },
      (error) => {
        setLoading(false);
        showToast(error.message);
      }
    );
  };

  return (
    <Layout>
      <div className="setting">
        <Paper className="setting-content">
          <TabContext value="1">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList variant="fullWidth">
                <Tab label="SMTP Email Setting" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="setting-content__row">
                <TextField
                  fullWidth
                  label="Host"
                  value={MAIL_SERVER_HOST}
                  onChange={(e) => setHost(e.target.value)}
                />
              </div>
              <div className="setting-content__row">
                <TextField
                  fullWidth
                  type="number"
                  label="Port"
                  value={MAIL_SERVER_PORT}
                  onChange={(e) => setPort(e.target.value)}
                />
              </div>
              <div className="setting-content__row">
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  value={MAIL_SERVER_ACCOUNT}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="setting-content__row">
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={isShowPassword ? "text" : "password"}
                    label="Password"
                    value={MAIL_SERVER_PASSWORD}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseUp={() => setShowPassword(!isShowPassword)}
                          onMouseDown={() => setShowPassword(!isShowPassword)}
                          edge="end"
                        >
                          {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              </div>
            </TabPanel>
          </TabContext>
        </Paper>
      </div>
    </Layout>
  );
};

export default SettingContainer;
