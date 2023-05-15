import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogin } from "../../actions/LoginSignupAction";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setlogin] = useState({
    name: "",
    password: "",
    role: "",
  });

  const loginFunction = async () => {
    const result = await axios.post(
      `http://localhost:9090/jobexecutor/v1/login`,
      login
    );
    if (result.status === 200) {
      console.log("inside if ");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role",login.role);
      localStorage.setItem("name",login.name);
      dispatch(setLogin(login));
      navigate("/");
    }
  };

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
              Login
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
                value={login.name || ""}
                onChange={(e) => setlogin({ ...login, name: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={login.password || ""}
                onChange={(e) =>
                  setlogin({ ...login, password: e.target.value })
                }
              />
              <InputLabel id="role">
                Role
              </InputLabel>
              <Select
                labelId="role"
                id="role"
                value={login.role || ""}
                onChange={(e) => setlogin({ ...login, role: e.target.value })}
                fullWidth
                label="Role"
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => loginFunction()}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
