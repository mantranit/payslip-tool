/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const FilePickerComponent = (props) => {
  const { onChange } = props;
  const [filePath, setFilePath] = useState("");

  const handleSelectFile = () => {
    window.appAPI.selectFile((file) => {
      setFilePath(file);
      onChange(file);
    });
  };

  useEffect(() => {
    const { value } = props;
    setFilePath(value);
  }, []);

  return (
    <TextField
      onClick={handleSelectFile}
      fullWidth
      value={filePath}
      label="Select file"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <IconButton>
            <CloudUploadIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default FilePickerComponent;
