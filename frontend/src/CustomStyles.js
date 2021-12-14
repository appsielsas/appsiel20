import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Link as LinkMUI } from "@mui/material";
import PropTypes from "prop-types";
import App from './App';
import { Box, Button, TableRow, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { TreeItem, treeItemClasses } from '@mui/lab';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#574696',
        },
        secondary: {
          main: '#50B794',
        },
        background: {
          default: '#fafafa',
        }
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#42A3DC',
        },
        secondary: {
          main: '#50B794',
        },
        background: {
          default: '#303030',
        }
      }),
  },
  props: {
    MuiButton: {
      size: 'medium',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiAppBar: {
      color: 'primary',
    }
  }, shape: {
    borderRadius: 12,
  },
});

export default function CustomStyles(props) {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App>

        </App>
      </ThemeProvider>
    </ColorModeContext.Provider >

  );
}

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-head': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiTableCell-head': {
    color: theme.palette.primary.contrastText,
  },
}));

export const IconCatalogs = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  i: {
    fontSize: "36px",
    height: "70px",
    aspectRatio: "auto 1 / 1",
    borderRadius: "50%",
    backgroundImage: "linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)",
    color: "white",
    position: "relative",
    "&:before": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  },
}));

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

export function StyledTreeItem(props) {
  const { bgColor, color, labelIcon, url, imageURL, labelInfo, labelText, direction, ...other } =
    props;

  let urlTemp;

  if (url) {
    //urlTemp = ''
    if (url.tipo) {
      urlTemp = url.tipo === 'crud' ? `${url.tipo}/${url.app_id}/model/${url.model_id}` : `${url.tipo}/${url.app_id}/`
    }
  }

  return (
    <StyledTreeItemRoot
      label={
        <LinkMUI color="inherit" {...(url.tipo && { component: Link, to: `/${urlTemp}` })} underline="none">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
              pr: 0,
              flexDirection: direction,
            }}
          >
            {labelIcon.startsWith("fa") ? (
              url && url.tipo === "app_catalogs" ? (
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

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
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

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
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