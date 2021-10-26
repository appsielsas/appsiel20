import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import RestoreIcon from '@mui/icons-material/Restore';
import StarBorder from '@mui/icons-material/StarBorder';
import MuiAppBar from '@mui/material/AppBar';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {
    Link
} from "react-router-dom";



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideBar(props) {

    const layoutButtons = [
        {
            aplication: [
                {
                    name: "tesoreria",
                    icon: "inboxIcon",
                    url: "web/tal",
                    modulos: [
                        {
                            name: "recaudos",
                            icon: "inboxIcon",
                            url: "web/tal",
                            modelos: [
                                {
                                    name: "recaudos",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "recaudos de cxc",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "documentos abonados",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                }
                            ]
                        },
                        {
                            name: "pagos",
                            icon: "inboxIcon",
                            url: "web/tal",
                            modelos: [
                                {
                                    name: "pagos",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "pagos de cxp",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "documentos abonados",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "inventarios",
                    icon: "inboxIcon",
                    url: "web/tal",
                    modulos: [
                        {
                            name: "inventarios",
                            icon: "inboxIcon",
                            url: "web/tal",
                            modelos: []
                        },
                        {
                            name: "transacciones",
                            icon: "inboxIcon",
                            url: "web/tal",
                            modelos: [
                                {
                                    name: "entradas de almacen",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "salidas de almacen",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "transferencia de mercancia",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "fabricacion",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                },
                                {
                                    name: "ajustes de inventarios",
                                    icon: "inboxIcon",
                                    url: "web/tal"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const [openCollapse, setOpenCollapse] = React.useState(true);

    const handleClick = () => {
        setOpenCollapse(!openCollapse);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={openDrawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(openDrawer && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" >
                        Appsiel
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Link to="/"><BottomNavigationAction label="Recents" icon={<RestoreIcon />} /></Link>
                        <Link to="/users"><BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /></Link>
                        <Link to="/users/insert"><BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} /></Link>
                        <Link to="/users/update"><BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} /></Link>
                    </Box>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openDrawer}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                >
                    {layoutButtons[0].aplication.map((item) => {
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    })}
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {openCollapse ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    );
}