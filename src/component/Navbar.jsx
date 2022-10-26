import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

const Navbar = () => {
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

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   // setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = (link) => {
    console.log(link);
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   // setAnchorElUser(null);
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" className="list-menu">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              ></IconButton>
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
                <MenuItem key={0} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">A</Typography>
                </MenuItem>
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">B</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">C</Typography>
                </MenuItem>
                {navItems.map((item) => (
                  <MenuItem
                    key={item.link}
                    onClick={(e) => {
                      handleCloseNavMenu(item.link);
                    }}
                  >
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Navbar;
