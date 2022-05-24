import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import "./styles.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PreviewIcon from "@mui/icons-material/Preview";

const SidebarComponent = (props) => {
  const {
    menu = [
      { icon: <DashboardIcon />, label: "Dashboard", to: "/" },
      { icon: <PreviewIcon />, label: "Preview", to: "/preview" },
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
      <Divider />
      {children}
    </>
  );
};

export default SidebarComponent;
