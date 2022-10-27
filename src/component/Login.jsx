import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import useMyStore, { selectfetchUserAuth } from "../store/MyStore";

const Login = ({ open, handleClose, handleOpenRegiter }) => {
  const setAuth = useMyStore(selectfetchUserAuth);

  const [signInWithEmailAndPassword, user, error] =
    useSignInWithEmailAndPassword(auth);
  const [message, setmessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    try {
      signInWithEmailAndPassword(email, password);

      if (error) {
        setmessage(error.message);
      } else {
        setAuth(user);
        handleClose();
      }
    } catch (err) {
      console.log(err);
      if (err) {
        setmessage(err.message);
      } else {
        handleClose();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          width: 350,
          backgroundColor: "white",
          padding: 1,
          margin: "12% auto",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2 id="parent-modal-title">Login</h2>
        <div id="parent-modal-description">
          <TextField
            required
            id="email-login"
            name="email"
            label="Required"
            defaultValue=""
            placeholder="Username"
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            required
            id="password-login"
            name="password"
            label="Required"
            defaultValue=""
            type="password"
            placeholder="Password"
            sx={{ marginBottom: "10px" }}
          />
        </div>
        {message}
        <Button variant="contained" onClick={handleOpenRegiter}>
          Register
        </Button>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Modal>
  );
};
export default Login;
