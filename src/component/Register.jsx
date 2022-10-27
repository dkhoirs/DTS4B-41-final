import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";

// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import useMyStore, { selectfetchUserAuth } from "../store/MyStore";

const Register = ({ open, handleClose, handleOpenLogin }) => {
  const [message, setmessage] = useState("");
  const setAuth = useMyStore(selectfetchUserAuth);
  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    try {
      createUserWithEmailAndPassword(email, password);
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
        <h2 id="parent-modal-title">Register</h2>
        <div id="parent-modal-description">
          <TextField
            required
            id="email-register"
            name="email"
            label="Required"
            defaultValue=""
            placeholder="Username"
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            required
            id="password-register"
            name="password"
            label="Required"
            defaultValue=""
            type="password"
            placeholder="Password"
            sx={{ marginBottom: "10px" }}
          />
        </div>
        {message}

        <Button variant="contained" onClick={handleOpenLogin}>
          Login
        </Button>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Box>
    </Modal>
  );
};
export default Register;
