import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import TreeView from "@mui/lab/TreeView";
import {
  Avatar,
  Link as LinkMUI,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../application/UserProvider";
import { AppBar, ColorModeContext, Drawer, DrawerHeader, StyledTreeItem } from "./../CustomStyles";
import { MenuLoginBar, ShorcutBar } from "./NavigationBar";

const drawerWidth = 240;

export default function Layout(props) {
  const [navigationLayout, setNavigationLayout] = React.useState([]);
  const [shorcutLayout, setShorcutLayout] = React.useState([]);

  const [openDrawer, setOpenDrawer] = React.useState(false);
  //cambiar a modo nocturno
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //sesiones de usuario
  const { user, signIn, signOut } = React.useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(process.env.REACT_APP_URL + "/api/menu")
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
          setNavigationLayout(response);
          //enqueueSnackbar('Actualizado', { variant: 'success' });
        });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch("/layoutb.json")
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
          setShorcutLayout(response.shortcuts);
          //enqueueSnackbar('Actualizado', { variant: 'success' });
        });
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={openDrawer} enableColorOnDark>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(openDrawer && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="span">
              <LinkMUI component={Link} to="/" underline="none" color="primary.contrastText">
                Appsiel
              </LinkMUI>
            </Typography>
          </div>

          <Box sx={smScreen && { position: "fixed", bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
              showLabels
              sx={!smScreen && { backgroundColor: "rgba(0,0,0,0)", i: { fontSize: "24px" } }}
            >
              {shorcutLayout &&
                shorcutLayout.map((item, i) => (
                  <BottomNavigationAction
                    sx={!smScreen && { "& > i, span": { color: "primary.contrastText" } }}
                    label={item.label}
                    component={Link}
                    to={item.url}
                    key={i}
                    icon={<i className={item.icon}></i>}
                  />
                ))}
            </BottomNavigation>
          </Box>

          <MenuLoginBar></MenuLoginBar>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawer}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <TreeView
          aria-label="sidebar"
          defaultExpanded={[]}
          defaultCollapseIcon={<div width="0"></div>}
          defaultExpandIcon={<MenuIcon fontSize="large" />}
          defaultEndIcon={<div width="0"></div>}
          sx={{
            height: 264,
            flexGrow: 1,
            maxWidth: drawerWidth,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {navigationLayout &&
            navigationLayout.map((app, i) => (
              <StyledTreeItem
                url={{}}
                bgColor="#9e9e9e"
                {...(theme.palette.mode === "light"
                  ? { bgColor: "#9e9e9e" }
                  : { bgColor: "#757575" })}
                key={i}
                nodeId={app.id + app.name}
                labelText={app.label}
                labelIcon={app.icon}
                direction={!openDrawer && "column"}
              >
                {app.modules &&
                  app.modules.map((modul, j) => (
                    <StyledTreeItem
                      {...(modul.url && {
                        url: { tipo: modul.url, app_id: app.id, model_id: modul.id },
                      })}
                      /*{...(modul.url && { url: `${modul.url}/${app.id}/model/${modul.id}` })}*/
                      {...(theme.palette.mode === "light"
                        ? { bgColor: "#e0e0e0" }
                        : { bgColor: "#616161" })}
                      key={j}
                      nodeId={modul.id + modul.name}
                      labelText={modul.label}
                      labelIcon="fas fa-circle"
                      direction={!openDrawer && "column"}
                      sx={openDrawer && { pl: 1 }}
                    >
                      {modul.models &&
                        modul.models.map((model, k) => (
                          <StyledTreeItem
                            {...(model.url && {
                              url: { tipo: model.url, app_id: app.id, model_id: model.model_id },
                            })}
                            /*{...(model.url && {
                              url: `${model.url}/${app.id}/model/${model.model_id}`,
                            })}*/
                            {...(theme.palette.mode === "light"
                              ? { bgColor: "#f5f5f5" }
                              : { bgColor: "#424242" })}
                            key={k}
                            nodeId={model.id + model.name}
                            labelText={model.label}
                            labelIcon="fas fa-circle"
                            sx={openDrawer && { pl: 1 }}
                            direction={!openDrawer && "column"}
                          ></StyledTreeItem>
                        ))}
                    </StyledTreeItem>
                  ))}
              </StyledTreeItem>
            ))}
        </TreeView>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "background.default", height: "100vh" }}
      >
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
