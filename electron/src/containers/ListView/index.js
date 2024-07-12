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
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

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

  const handleNodeSelect = (event, nodeIds) => {
    setLoading(true);
    window.appAPI.preview(
      month,
      nodeIds,
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
          <TreeView onNodeSelect={handleNodeSelect}>
            {rows.map((row) => {
              return (
                <TreeItem
                  key={row.id}
                  className="tree-item"
                  nodeId={row.id.toString()}
                  label={
                    <>
                      {row.fullName} <small>({row.email})</small>
                    </>
                  }
                />
              );
            })}
          </TreeView>
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
