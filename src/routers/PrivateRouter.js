import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";

const PrivateRouter = (props) => {
  return props.isLoggedIn === "true" ? props.children : <Navigate to="/authpage" />;
  //  return true ? props.children : <Navigate to="/authpage" />;
};

const mapStateToProps = (state) => {
  return {
      isLoggedIn : state.login.isLoggedIn
  }
} 

export default connect(mapStateToProps)(PrivateRouter);


