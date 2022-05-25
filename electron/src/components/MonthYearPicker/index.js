/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { YearPicker } from "@mui/x-date-pickers/YearPicker";
import Popover from "@mui/material/Popover";

const minDate = new Date("2020-01-01T00:00:00.000");
const maxDate = new Date("2034-01-01T00:00:00.000");

export const MonthYearPickerComponent = (props) => {
  const { onChange } = props;
  const [showMonth, setShowMonth] = useState(true);
  const [showYear, setShowYear] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelectMonthYear = (event) => {
    setAnchorEl(event.currentTarget);
    setShowMonth(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    const value = `${month}/${year}`;
    onChange(value);
  }

  useEffect(() => {
    const { value } = props;
    const temp = value.split("/");
    setMonth(temp[0]);
    setYear(temp[1]);
  }, []);

  useEffect(() => {
    if (!showMonth && !showYear) {
      handleClosePopover();
    }
  }, [showYear]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TextField
        fullWidth
        value={`${month}/${year}`}
        label="Select Month Year"
        onClick={handleSelectMonthYear}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton>
              <CalendarTodayIcon />
            </IconButton>
          ),
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover-month-year">
        {showMonth && (
          <MonthPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => {
              setDate(newDate);
              const newMonth = newDate.getMonth() + 1;
              setMonth(newMonth < 10 ? `0${newMonth}` : newMonth);
              setShowMonth(false);
              setShowYear(true);
            }}
          />
        )}
        {showYear && (
          <YearPicker
            date={date}
            isDateDisabled={() => false}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => {
              setDate(newDate);
              setYear(newDate.getFullYear());
              setShowYear(false);
            }}
          />
        )}
        </div>
      </Popover>
    </LocalizationProvider>
  );
};

export default MonthYearPickerComponent;
