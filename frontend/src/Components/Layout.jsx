import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import MuiAppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../application/UserProvider";
import { ColorModeContext } from "./../CustomStyles";
import { Link as LinkMUI } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(12)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
    },
    "&:hover": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      //backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
  },
}));

function StyledTreeItem(props) {
  const { bgColor, color, labelIcon, url, imageURL, labelInfo, labelText, direction, ...other } =
    props;

  return (
    <StyledTreeItemRoot
      label={
        <LinkMUI color="inherit" {...(url && { component: Link, to: `/${url}` })} underline="none">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
              pr: 0,
              flexDirection: direction,
              textDecoration: "none",
            }}
          >
            {labelIcon.startsWith("fa") ? (
              url && url.startsWith("app_catalogs") ? (
                <i
                  className="fas fa-th"
                  style={direction ? { fontSize: "16px" } : { paddingRight: 8 }}
                ></i>
              ) : (
                <i
                  className={labelIcon}
                  style={direction ? { fontSize: "16px" } : { paddingRight: 8 }}
                ></i>
              )
            ) : (
              <img src={labelIcon} alt={labelText} height="40px" style={{ paddingRight: 8 }} />
            )}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: "inherit",
                flexGrow: 1,
                textTransform: "capitalize",
                whiteSpace: "normal",
                ...(direction && { textAlign: "center", fontSize: 10 }),
              }}
            >
              {labelText}
            </Typography>

            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </LinkMUI>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function SideBar(props) {
  const [navigationLayout, setNavigationLayout] = React.useState([]);
  const [shorcutLayout, setShorcutLayout] = React.useState([]);

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openCollapse, setOpenCollapse] = React.useState(true);
  //cambiar a modo nocturno
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

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
        <Toolbar>
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
          <Typography variant="h6" component="div">
            <LinkMUI component={Link} to="/" underline="none" color="white">
              Appsiel
            </LinkMUI>
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <BottomNavigation
              showLabels
              sx={{ backgroundColor: "rgba(0,0,0,0)", i: { fontSize: "24px" } }}
            >
              {shorcutLayout &&
                shorcutLayout.map((item, i) => (
                  <BottomNavigationAction
                    sx={{ "& > i, span": { color: "inherit" } }}
                    label={item.label}
                    component={Link}
                    to={item.url}
                    key={i}
                    icon={<i className={item.icon}></i>}
                  />
                ))}
            </BottomNavigation>
          </Box>
          <>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {user ? (
              <Button onClick={signOut} color="inherit">
                Cerrar sesión
              </Button>
            ) : (
              ""
            )}
          </>
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
            navigationLayout.map((item, i) => (
              <StyledTreeItem
                url=""
                bgColor="#9e9e9e"
                {...(theme.palette.mode === "light"
                  ? { bgColor: "#9e9e9e" }
                  : { bgColor: "#757575" })}
                key={i}
                nodeId={item.id + item.name}
                labelText={item.label}
                labelIcon={item.icon}
                direction={!openDrawer && "column"}
              >
                {item.modules &&
                  item.modules.map((modul, j) => (
                    <StyledTreeItem
                      {...(modul.url && { url: `${modul.url}/${item.id}/model/${modul.id}` })}
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
                              url: `${model.url}/${item.id}/model/${model.model_id}`,
                            })}
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
