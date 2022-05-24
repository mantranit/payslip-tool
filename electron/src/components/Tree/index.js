import React, { useState, useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import './styles.scss';

export const TreeComponent = (props) => {
  const { onNodeSelect, onNodeFocus } = props;
  const [rows, setRows] = useState([]);
  useEffect(() => {
    window.appAPI.getAll(
      "SELECT * FROM month_year",
      (results) => {
        const rows = JSON.parse(results[0]);
        setRows(rows.data);
      },
      (error) => {
        console.log("getAll error", error);
      }
    );
  }, []);
  return (
    <TreeView onNodeSelect={onNodeSelect} onNodeFocus={onNodeFocus}>
      {rows.map((row) => {
        return (
          <TreeItem
            key={row.id}
            className="tree-item"
            nodeId={row.id.toString()}
            label={row.fullName}
          />
        );
      })}
    </TreeView>
  );
};

export default TreeComponent;
