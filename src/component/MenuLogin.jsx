import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import useMyStore, {
  selectfetchUserAuth,
  selectMyStore,
} from "../store/MyStore";
import { isEmpty } from "@firebase/util";

const MenuLogin = ({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  settings,
  handleOpenLogin,
}) => {
  const myStores = useMyStore(selectMyStore);
  const setAuth = useMyStore(selectfetchUserAuth);
  const [isLogin, setisLogin] = useState(false);

  useState(() => {
    if (isEmpty(myStores) === false) {
      if (myStores.user.uid !== undefined) {
        console.log(true);
        setisLogin(true);
      } else {
        console.log(false);
        setisLogin(false);
      }
    }
    setisLogin(true);
    console.log(isEmpty(myStores));
  }, [myStores]);

  const handleLogout = () => {
    setAuth({});
    signOut(auth);
    setisLogin(false);
    console.log(myStores);
  };

  if (isLogin) {
    return (
      <>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleLogout}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  } else {
    return (
      <Button variant="contained" color="secondary" onClick={handleOpenLogin}>
        Login
      </Button>
    );
  }
};
export default MenuLogin;
