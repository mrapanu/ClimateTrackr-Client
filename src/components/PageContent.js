import React, { useEffect, useContext } from "react";
import "./PageContent.css";
import MainNavigation from "./MainNavigation";
import { jwtDecode } from "jwt-decode";
import { Ctx } from "../util/reducer";

const PageContent = ({ children, isHome }) => {
  const { state, dispatch } = useContext(Ctx);
  var isLoggedIn = false;

  if (localStorage.getItem("token") !== null) {
    const jwt = jwtDecode(localStorage.getItem("token"));
    isLoggedIn = jwt.unique_name !== null ? true : false;
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
    
    const intervalId = setInterval(() => {
      dispatch({ type: "ISNIGHT", payload: isNightTime });
    }, 1800000);
    return () => clearInterval(intervalId);
  }, [dispatch, isLoggedIn]);

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

export default PageContent;
