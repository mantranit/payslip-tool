import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ResponsiveAppBar = (props) => {
  const {
    pages = [
      { label: "Grid view", to: "/dashboard" },
      { label: "List view", to: "/preview" },
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
          {pages.map((page) => (
            <Button
              key={page.label}
              component={Link}
              to={page.to}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.label}
            </Button>
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
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
