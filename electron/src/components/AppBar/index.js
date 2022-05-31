import * as React from "react";
import { NavLink as NavLinkBase, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import "./styles.scss";
import { useApp } from "../../shared/AppProvider";

const NavLink = React.forwardRef((props, ref) => {
  const { activeClassName, ...rest } = props;
  return (
    <NavLinkBase
      ref={ref}
      {...rest}
      className={({ isActive }) =>
        `${props.className} ${activeClassName({ isActive })}`
      }
    />
  );
});

const AppBarComponent = (props) => {
  const { auth, setAuth } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.clear();
    navigate("/");
  };

  const {
    pages = [
      ...(auth
        ? [
            { label: "Grid view", to: "/grid-view" },
            { label: "List view", to: "/list-view" },
            { label: "Reselect", click: handleLogout },
          ]
        : [{ label: "Import", to: "/" }]),
    ],
  } = props;

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <AdbIcon sx={{ mx: 2 }} />
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {pages.map((page, index) => (
            <React.Fragment key={page.label}>
              {index !== 0 && (
                <div className="menu-divider">
                  <span />
                </div>
              )}
              {page.to ? (
                <Button
                  component={NavLink}
                  to={page.to}
                  sx={{ my: 2, color: "white", display: "block" }}
                  activeClassName={({ isActive }) =>
                    isActive ? "menu-item-active" : ""
                  }
                >
                  {page.label}
                </Button>
              ) : (
                <Button
                  onClick={page.click}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              )}
            </React.Fragment>
          ))}
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 2 }}>
          {auth}
        </Typography>
        <Box sx={{ flexGrow: 0, mx: 2 }}>
          <Button
            component={NavLink}
            to="/setting"
            sx={{ my: 2, color: "white", display: "block" }}
            activeClassName={({ isActive }) =>
              isActive ? "menu-item-active" : ""
            }
          >
            Setting
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppBarComponent;
