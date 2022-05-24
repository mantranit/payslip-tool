import React, { useState } from "react";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { YearPicker } from "@mui/x-date-pickers/YearPicker";
import { Box, Paper, Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const LoginContainer = () => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleImport = () => {
    window.appAPI.import(
      () => {},
      (error) => {
        console.log("import error", error);
      }
    );
  };
  const minDate = new Date('2020-01-01T00:00:00.000');
  const maxDate = new Date('2034-01-01T00:00:00.000');
  const [date, setDate] = React.useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="login">
        <Box>
          <Paper className="login-content">
            <div className="login-content__row">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Select file"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleImport}>
                      <CloudUploadIcon />
                    </IconButton>
                  ),
                }}
              />
            </div>
            <div className="login-content__row">
              <DatePicker
                label="Select Month"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </div>
            <MonthPicker
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(newDate) => setDate(newDate)}
            />
            <div>
              <Button variant="contained" fullWidth size="large">
                Submit
              </Button>
            </div>
          </Paper>
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default LoginContainer;
