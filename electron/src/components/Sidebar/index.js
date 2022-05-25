import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import "./styles.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PreviewIcon from "@mui/icons-material/Preview";
import LogoutIcon from '@mui/icons-material/Logout';

const SidebarComponent = (props) => {
  const navigate = useNavigate();
  
  const Logout = () => {
    localStorage.clear();
    navigate('/')
  }
  
  const {
    menu = [
      { icon: <DashboardIcon />, label: "Dashboard", to: "/dashboard" },
      { icon: <PreviewIcon />, label: "Preview", to: "/preview" },
      { icon: <LogoutIcon />, label: "Logout", click: Logout },
    ],
    children,
  } = props;

  return (
    <>
      <List>
        {menu.map((item) => {
          if (item.hasOwnProperty("to")) {
            return (
              <ListItem
                key={item.label}
                disablePadding
                className="list-item"
                component={Link}
                to={item.to}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          } else {
            return (
              <ListItem
                key={item.label}
                disablePadding
                className="list-item"
                onClick={item.click}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
      {children}
    </>
  );
};

export default SidebarComponent;
