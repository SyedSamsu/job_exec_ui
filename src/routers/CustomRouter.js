import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Employee from "../components/Employee/Employee";
// import EmployeeSingle from "../components/Employee2/EmployeeSingle";
import LoginSignup from "../components/LoginSignUp/LoginSignup";
import ErrorPage from "../components/Main/ErrorPage";
import Footer from "../components/Main/Footer";
import Header from "../components/Main/Header";
import HomeComponent from "../components/Main/HomeComponent";
import PrivateRouter from "./PrivateRouter";

const CustomerRouter = (props) => {

  return (
    <BrowserRouter>
      <Header isLoggedIn={props.isLoggedIn}  />
      <Routes>
        <Route path="/authpage" element={<LoginSignup/>} />
        <Route path="/" index element={<PrivateRouter > <HomeComponent role={props.role} /> </PrivateRouter>}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
      isLoggedIn : state.login.isLoggedIn,
      role: state.login.role
  }
} 

export default connect(mapStateToProps)(CustomerRouter);
