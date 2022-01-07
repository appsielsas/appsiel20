import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Avatar, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../application/UserProvider";
import { ColorModeContext } from "./../CustomStyles";

const NavigationBar = ({ openDrawer, handleDrawerOpen, shorcutLayout }) => {
  //cambiar a modo nocturno

  return "";
};

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const MenuLoginBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  //sesiones de usuario
  const { user, signIn, signOut } = React.useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Tooltip title={user.name}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => history.push(`/user`)}>
          <Typography textAlign="center">Perfil</Typography>
        </MenuItem>
        <MenuItem onClick={signOut}>
          <Typography textAlign="center">Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const ShorcutBar = ({ shorcutLayout }) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }}>
      {shorcutLayout.map((item) => (
        <Stack direction={{ xs: "row", md: "column" }}>
          <IconButton>Icono</IconButton>
          <Typography>texto</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
