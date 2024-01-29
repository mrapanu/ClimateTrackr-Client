import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Ctx } from "../util/reducer";
import "./PageContent.css";
import MainNavigation from "./MainNavigation";

const PageContent = ({ children }) => {
  const { state, dispatch } = useContext(Ctx);
  const navigate = useNavigate();
  var isLoggedIn = false;
  var exp = 0;

  if (localStorage.getItem("token") !== null) {
    const jwt = jwtDecode(localStorage.getItem("token"));
    isLoggedIn = jwt.unique_name !== null ? true : false;
    exp = jwt.exp * 1000;
  }

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const isNightTime = currentHour < 7 || currentHour >= 19;
    dispatch({
      type: "ISADMIN",
      payload:
        isLoggedIn && jwtDecode(localStorage.getItem("token")).role === "Admin"
          ? true
          : false,
    });
    dispatch({ type: "ISNIGHT", payload: isNightTime });

    const intervalOne = setInterval(() => {
      checkExpiredJwt(exp, dispatch, navigate, Date.now());
    }, 60000); //check if token is expired 
    const intervalTwo = setInterval(() => {
      dispatch({ type: "ISNIGHT", payload: isNightTime });
    }, 1800000);
    return () => {
      clearInterval(intervalOne);
      clearInterval(intervalTwo);
    };
  }, [dispatch, isLoggedIn, exp, navigate]);

  return (
    <>
      <MainNavigation
        isAdmin={state.isAdmin}
        isLoggedIn={isLoggedIn}
        isNightTime={state.isNight}
      />
      <div className={`body-container ${state.isNight ? "night" : "day"}`}>
        <div className="page-content-container">{children}</div>
      </div>
    </>
  );
};

const checkExpiredJwt = (exp, dispatch, navigate, date) => {
  if (exp && exp < date) {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }
};

export default PageContent;
