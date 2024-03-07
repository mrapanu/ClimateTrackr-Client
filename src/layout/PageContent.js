import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Ctx } from "../util/reducer";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import { checkExpiredJwt, setIsAdmin, setIsLoggedIn } from "../util/auth";
import "./PageContent.css";

const PageContent = ({ children }) => {
  const { state, dispatch } = useContext(Ctx);
  const navigate = useNavigate();
  var exp = 0;

  if (localStorage.getItem("token") !== null) {
    exp = jwtDecode(localStorage.getItem("token")).exp * 1000;
  }

  useEffect(() => {
    checkExpiredJwt(exp, dispatch, navigate, Date.now());
    checkIsNight(dispatch, new Date());
    setIsLoggedIn(dispatch);
    setIsAdmin(dispatch, state.isLoggedIn);
    const intervalOne = setInterval(() => {
      checkExpiredJwt(exp, dispatch, navigate, Date.now());
    }, 60000);
    const intervalTwo = setInterval(() => {
      checkIsNight(dispatch, new Date());
    }, 300000);
    return () => {
      clearInterval(intervalOne);
      clearInterval(intervalTwo);
    };
  }, [state.isLoggedIn, state.isNight, exp, navigate, dispatch]);

  return (
    <>
      <MainNavigation
        isAdmin={state.isAdmin}
        isLoggedIn={state.isLoggedIn}
        isNightTime={state.isNight}
      />
      <div className={`body-container ${state.isNight ? "night" : "day"}`}>
        <div className="page-content-container">{children}</div>
      </div>
      <Footer isNightTime={state.isNight}/>
    </>
  );
};

export const checkIsNight = (dispatch, currentDate) => {
  const currentHour = currentDate.getHours();
  const isNight = currentHour < 7 || currentHour >= 19;
  dispatch({
    type: "ISNIGHT",
    payload: isNight,
  });
};

export default PageContent;
