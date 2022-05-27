/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
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
          window.appAPI.sendMail(
            month,
            params.id,
            (data) => {
              setLoading(false);
              showToast(
                `Send mail to "${params.getValue(
                  params.id,
                  "fullName"
                )}" successfull.`,
                "success"
              );
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
    {
      field: "pdfFile",
      headerName: "PDF Generated",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (cellValues) => {
        return cellValues.value ? (
          <Tooltip title="Generate PDF Success">
            <CheckCircleIcon color="success" />
          </Tooltip>
        ) : (
          <Tooltip title="Not generate yet">
            <RadioButtonUncheckedIcon />
          </Tooltip>
        );
      },
      hide: true,
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
              <CheckCircleIcon color="success" />
            </Tooltip>
          );
        } else if (cellValues.value === -1) {
          return (
            <Tooltip title="Sent Faile">
              <CancelIcon color="error" />
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
        return date.isValid() ? date.format("H:m:s DD/MM/YYYY") : "-";
      },
    },
    { field: "workingDays", headerName: "Working Days", width: 100 },
    { field: "leaveDays", headerName: "Leave Days", width: 100 },
    {
      field: "totalWorkingDays",
      headerName: "Total Working Days",
      width: 100,
      hide: true,
    },
    {
      field: "annualLeave",
      headerName: "Annual Leave",
      width: 100,
      hide: true,
    },
    { field: "remainingLeave", headerName: "Remaining Leave", width: 100 },
    {
      field: "netAmount",
      headerName: "Net Amount",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "grossSalary",
      headerName: "Gross salary",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "responsibilityAllowance",
      headerName: "Responsibility Allowance",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "parkingAllowance",
      headerName: "Parking Allowance",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "bonus",
      headerName: "Bonus",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "advance",
      headerName: "Advance",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "otherAllowance",
      headerName: "Other Allowance",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "overtimePay",
      headerName: "Overtime Pay",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "totalSalary",
      headerName: "Total Salary",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "insurance",
      headerName: "Insurance",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "incomeTax",
      headerName: "IncomeTax",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    {
      field: "refund",
      headerName: "Refund",
      width: 150,
      renderCell: (cellValues) => {
        return formatCurrency(cellValues.value);
      },
    },
    { field: "password", headerName: "Password", width: 90, hide: true },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

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
    window.appAPI.sendMailAll(
      month,
      (data) => {
        console.log(data);
      },
      (error) => {
        showToast(error.message);
      },
      (code, signal) => {
        setLoading(false);
        console.log(code, signal);
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
