import React, { useEffect} from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLogout } from "../../actions/LoginSignupAction";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Header = (props) => {
  const [auth, setAuth] = React.useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("role")
    dispatch(setLogout());
    navigate('/authpage')
  }

  useEffect(() => {
    if(props.isLoggedIn  ==="true" ){
      setAuth(true)
    }
  }, [props])
  

  return (
    <Box sx={{ flexGrow: 1}}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Executor App
        </Typography>
        {auth && (
          <div>
            <Button variant="outlined" color="inherit" onClick={() => handleLogout()}>Logout</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </Box>
  );
};

export default Header;
