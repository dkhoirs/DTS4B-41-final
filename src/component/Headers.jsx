import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import "../Assets/css/Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
// import useNewsStore, { selectSetUser, selectUser } from "../store/NewsStore";
// import { useEffect } from "react";

import MenuLogin from "./MenuLogin";
// import { auth } from "../config/firebase";

const navItems = [
  { text: "General", link: "/general" },
  { text: "Science", link: "/science" },
  { text: "Sports ", link: "/sports" },
  { text: "Business ", link: "/business" },
  { text: "Health ", link: "/health" },
  { text: "Entertainment ", link: "/entertainment" },
  { text: "Tech ", link: "/tech" },
  { text: "Politics ", link: "/politics" },
  { text: "Food ", link: "/food" },
  { text: "Travel ", link: "/travel" },
];
const settings = ["Logout"];

const Headers = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => {
    setOpenRegiter(false);
    setOpenLogin(true);
  };
  const handleCloseLogin = () => setOpenLogin(false);

  const [openRegiter, setOpenRegiter] = useState(false);
  const handleOpenRegiter = () => {
    setOpenLogin(false);
    setOpenRegiter(true);
  };
  const handleCloseRegiter = () => setOpenRegiter(false);

  // const Users = useNewsStore(selectUser);
  // const setUser = useNewsStore(selectSetUser());

  // useEffect(() => {
  //   setUser({});
  // }, []);
  // useEffect(() => {
  //   if (Users.uid !== undefined) {
  //     setisLogin(true);
  //   } else {
  //     setisLogin(false);
  //   }
  // }, [Users]);

  let navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    navigate("/categories" + link);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navItems.map((nav) => (
                <MenuItem
                  key={nav.link}
                  onClick={(e) => {
                    handleCloseNavMenu(nav.link);
                  }}
                >
                  <Typography textAlign="center">{nav.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navItems.map((page) => (
              <Button
                key={page.link}
                onClick={(e) => {
                  handleCloseNavMenu(page.link);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          <MenuLogin
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            settings={settings}
            handleOpenLogin={handleOpenLogin}
          />
        </Toolbar>
      </Container>
      <Login
        open={openLogin}
        handleClose={handleCloseLogin}
        handleOpenRegiter={handleOpenRegiter}
      />
      <Register
        open={openRegiter}
        handleClose={handleCloseRegiter}
        handleOpenLogin={handleOpenLogin}
      />
    </AppBar>
  );
};
export default Headers;
