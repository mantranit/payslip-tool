/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
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

const SettingContainer = () => {
  const { setLoading } = useApp();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState(localStorage.getItem("password"));

  const handleUpdate = () => {
    setLoading(true);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setLoading(false);
  }

  return (
    <Layout>
      <div className="setting">
        <Paper className="setting-content">
          <TabContext value="1">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList variant="fullWidth">
                <Tab label="Setting" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="setting-content__row">
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="setting-content__row">
                <TextField
                  fullWidth
                  type="text"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button variant="contained" fullWidth size="large" onClick={handleUpdate}>
                  Update
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
