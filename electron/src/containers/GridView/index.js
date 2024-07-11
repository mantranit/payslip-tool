/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import "./styles.scss";
import { useApp } from "../../shared/AppProvider";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";

const GridViewContainer = () => {
  const { auth: month, showToast, setLoading } = useApp();
  const [rows, setRows] = useState([]);
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("vn-VN").format(number || 0);
  };
  const [columns] = useState([
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setLoading(true);
          setListName("");
          window.appAPI.sendMail(
            month,
            params.id,
            (data) => {
              setLoading(false);
              setListName(params.getValue(params.id, "fullName"));

              fetchData();
            },
            (error) => {
              setLoading(false);
              showToast(error.message);
            }
          );
        };

        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            Send
          </Button>
        );
      },
    },
    { field: "fullName", headerName: "Full Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "password", headerName: "Password", width: 90, hide: true },
    {
      field: "pdfFile",
      headerName: "PDF",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (cellValues) => {
        return cellValues.value ? (
          <Tooltip title="Generate PDF Success">
            <CheckIcon color="success" />
          </Tooltip>
        ) : (
          <Tooltip title="Not generate yet">
            <RadioButtonUncheckedIcon />
          </Tooltip>
        );
      },
    },
    {
      field: "isSent",
      type: "number",
      headerName: "Mail Sent",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (cellValues) => {
        if (cellValues.value === 1) {
          return (
            <Tooltip title="Sent Success">
              <CheckIcon color="success" />
            </Tooltip>
          );
        } else if (cellValues.value === -1) {
          return (
            <Tooltip title="Sent Faile">
              <CloseIcon color="error" />
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title="Not Sent yet">
              <RadioButtonUncheckedIcon />
            </Tooltip>
          );
        }
      },
    },
    {
      field: "sentDate",
      headerName: "Sent Date",
      width: 200,
      renderCell: (cellValues) => {
        const date = moment(cellValues.value);
        return date.isValid() ? date.format("HH:mm:ss DD/MM/YYYY") : "-";
      },
    },
    {
      field: "standardWorkingDays",
      headerName: "Standard Working Days",
      width: 180,
    },
    { field: "holidays", headerName: "Holidays", width: 100 },
    { field: "unpaidLeave", headerName: "Unpaid leave", width: 100 },
    { field: "leaveDays", headerName: "Leave days", width: 100 },
    { field: "actualWorkingDay", headerName: "Actual Working day", width: 150 },
    {
      field: "remainingLeaveDays",
      headerName: "Remaining leave days",
      width: 180,
    },
    { field: "totalWorkingDays", headerName: "Total working days", width: 150 },
    {
      field: "basicSalary",
      headerName: "Basic Salary",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "responsibilityAllowance",
      headerName: "Responsibility allowance",
      width: 180,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "petrolAllowace",
      headerName: "Petrol Allowace",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "phoneAllowance",
      headerName: "Phone Allowance",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "lunchAllowance",
      headerName: "Lunch Allowance",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "seniorityBonus",
      headerName: "Seniority Bonus",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "performanceBonus",
      headerName: "Performance Bonus",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "overtimeIncome",
      headerName: "Overtime Income",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "otherBonus",
      headerName: "Other Bonus",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "otherIncome",
      headerName: "Other Income",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "totalIncome",
      headerName: "Total Income",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "socialInsurance",
      headerName: "Social Insurance",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "personalIncomeTax",
      headerName: "Personal Income Tax",
      width: 180,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "othersDeduction",
      headerName: "Others Deduction",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "totalDeduction",
      headerName: "Total Deduction",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "netAmount",
      headerName: "Net Amount",
      width: 150,
      valueFormatter: (params) => formatCurrency(params.value),
    },
  ]);

  let [listName, setListName] = useState("");

  const buildListName = (listName) => {
    const list = listName.split(",");
    return (
      <ol reversed={true} className="sent-success">
        {list.map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ol>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listName) {
      showToast(
        <>Send mail successfully to:{buildListName(listName)}</>,
        "success"
      );
    }
  }, [listName]);

  const fetchData = () => {
    setLoading(true);
    window.appAPI.fetch(
      `SELECT * FROM "${month.replace("/", "_")}"`,
      (data) => {
        setLoading(false);
        setRows(data);
      },
      (error) => {
        setLoading(false);
        showToast(error.message);
      }
    );
  };

  const handleSendAll = () => {
    setLoading(true);
    setListName("");
    let msg = "";
    window.appAPI.sendMailAll(
      month,
      (data) => {
        const row = JSON.parse(data);
        msg = msg ? `${row.fullName},` + msg : row.fullName;
        setListName(msg);
      },
      (error) => {
        showToast(error.message);
      },
      (code, signal) => {
        setLoading(false);

        fetchData();
      }
    );
  };

  return (
    <Layout>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={handleSendAll}>
          Send All
        </Button>
      </Box>
      <div className="grid-content">
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          getRowClassName={(params) => {
            return `row-${
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }`;
          }}
        />
      </div>
    </Layout>
  );
};

export default GridViewContainer;
