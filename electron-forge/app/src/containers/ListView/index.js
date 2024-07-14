/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useApp } from "../../shared/AppProvider";
import "./styles.scss";
import Layout from "../../components/Layout";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { ListItem } from "@mui/material";

const ListViewContainer = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const { auth: month, setLoading, showToast } = useApp();
  const [file, setFile] = useState("");
  const [scale, setScale] = useState(1.4);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    window.appAPI.fetch(
      `SELECT * FROM "${month.replace("/", "_")}"`,
      (data) => {
        setRows(data);
      },
      (error) => {
        showToast(error.message);
      }
    );
  }, []);

  const handleNodeSelect = (nodeId) => {
    setLoading(true);
    window.appAPI.details(
      month,
      nodeId,
      (pdfFile) => {
        setFile(pdfFile);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        showToast(error.message);
      }
    );
  };

  return (
    <Layout>
      <div className="preview">
        <div className="preview-list">
          {rows.map((row) => {
            return (
              <ListItem
                key={row.id}
                className="tree-item"
                onClick={() => handleNodeSelect(row.id)}
              >
                <div>
                  <p>{row.fullName}</p>
                  <p>
                    <small>({row.email})</small>
                  </p>
                </div>
              </ListItem>
            );
          })}
        </div>
        <div className="preview-detail">
          {file ? (
            <div className="preview-content">
              <div>
                <Document file={file} onLoadSuccess={() => {}}>
                  <Page pageNumber={1} scale={scale} />
                </Document>
              </div>
              <div className="preview-floating">
                <Fab
                  size="small"
                  onClick={() => {
                    setScale(scale + 0.1);
                  }}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  size="small"
                  onClick={() => {
                    setScale(scale - 0.1);
                  }}
                >
                  <RemoveIcon />
                </Fab>
              </div>
            </div>
          ) : (
            <div className="preview-content content-center">
              <p>No PDF file specified.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListViewContainer;
