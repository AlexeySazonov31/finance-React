import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

import { Link } from "react-router-dom";
import Routes from "./routes";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import {
  blueGrey,
  common,
  green,
  lime,
  lightGreen,
  grey,
  blue
} from "@mui/material/colors/";
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const drawerWidth = 240;
const navItems = [
  { name: "Home", to: "/" },
  { name: "Сryptocurrency", to: "/cryptocurrency" },
  { name: "Stock", to: "/stock" },
  { name: "Currencies", to: "/currencies" },
  { name: "NFT", to: "nft" },
];



function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FIN
      </Typography>
      <Divider />
      <List>
        {navItems.map((elem, item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "left", ml: 1 }}
              component={Link}
              to={elem.to}
            >
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText primary={elem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 0, display: { sm: "none" } }}
            component="div"
            size="large"
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ display: "block" }} color="inherit">
            FIN
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((elem, item) => (
              <Button
                key={item}
                component={Link}
                to={elem.to}
                variant="text"
                color="inherit"
              >

                {elem.name}
              </Button>
            ))}
          </Box>
          <IconButton
            sx={{ mr: 0 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
            component="div"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3, width: 1 }}>
        <Toolbar />
        <Routes />
      </Box>
    </Box>
  );
}


/*  blueGrey,
  common,
  green,
  lime,
  lightGreen,
  grey,
  */

const getDesignTokens = (mode) => ({
  palette: {
      mode,
      ...(mode === 'light'
      ? {
        primary: {
          main: blueGrey[500],
        },
        background: {
          default: grey[50],
          paper: grey[50],
        },
        text: {
          primary: grey[900],
          secondary: grey[900],
        }
      } : {})
  }
});

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
