import axios from 'axios';
import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { setSignup } from '../../actions/LoginSignupAction';

const theme = createTheme();

const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, setSignUp] = useState({
    name: "",
    password: "",
    role: "user",
  });
  const signupFunction = async () => {
    await axios.post("http://localhost:9090/jobexecutor/v1/signup",signup).catch((err) => {
      console.log("Error ", err);
    }).then(response => {
     if(response.status === 200){
      localStorage.setItem("isLoggedIn","true");
      localStorage.setItem("name",signup.name);
      localStorage.setItem("role",signup.role);
      dispatch(setSignup(signup));
      navigate("/");
     }
    }
    )
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={signup.name || ""}
                onChange={(e) => setSignUp({ ...signup, name: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={signup.password || ""}
                onChange={(e) =>
                  setSignUp({ ...signup, password: e.target.value })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => signupFunction()}
              >
                SignUp
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default SignUp
