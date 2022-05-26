import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useApp } from "../../shared/AppProvider";
import "./styles.scss";
import Layout from "../../components/Layout";
import Tree from "../../components/Tree";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const PreviewContainer = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const { auth: month, setLoading } = useApp();
  const [file, setFile] = useState("");
  const [scale, setScale] = useState(1.4);

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
        console.log("preview error", error);
        setLoading(false);
      }
    );
  };

  return (
    <Layout>
      <div className="preview">
        <div className="preview-list">
          <Tree onNodeSelect={handleNodeSelect} />
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

export default PreviewContainer;
