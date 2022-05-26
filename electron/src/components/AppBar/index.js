import * as React from "react";
import { NavLink as NavLinkBase, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import "./styles.scss";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const ResponsiveAppBar = (props) => {
  const {
    pages = [
      { label: "Grid view", to: "/grid-view" },
      { label: "List view", to: "/list-view" },
      { label: "Setting", to: "/setting" },
    ],
  } = props;
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
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
            </React.Fragment>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Button
            variant="outline"
            onClick={handleOpenUserMenu}
            sx={{
              fontFamily: "monospace",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            {localStorage.getItem("current_month")}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Reselect month</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
