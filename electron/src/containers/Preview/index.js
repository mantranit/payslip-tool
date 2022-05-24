import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import "./styles.scss";
import Layout from "../../components/Layout";
import Tree from "../../components/Tree";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LoadingOverlay from "react-loading-overlay";

const PreviewContainer = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [scale, setScale] = useState(1.4);
  const handleNodeSelect = (event, nodeIds) => {
    setLoading(true);
    window.appAPI.preview(
      "SELECT * FROM month_year WHERE id = " + nodeIds,
      (data) => {
        console.log("preview data", data);
        setFile(data[0]);
        setLoading(false);
      },
      (error) => {
        console.log("preview error", error);
        setLoading(false);
      }
    );
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Layout>
      <div className="preview">
        <div className="preview-list">
          <div className="preview-header">Fullname</div>
          <div className="preview-content">
            <Tree onNodeSelect={handleNodeSelect} />
          </div>
        </div>
        <div className="preview-detail">
          <div className="preview-header">
            <p className="page-infor">
              {numPages && (
                <>
                  Page {pageNumber} of {numPages}
                </>
              )}
            </p>
            <div>
              <IconButton
                className="color-white"
                onClick={() => {
                  setScale(scale - 0.1);
                }}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                className="color-white"
                onClick={() => {
                  setScale(scale + 0.1);
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <LoadingOverlay active={isLoading} spinner={true}>
          <div className="preview-content">
            <div>
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            </div>
          </div>
          </LoadingOverlay>
        </div>
      </div>
    </Layout>
  );
};

export default PreviewContainer;
