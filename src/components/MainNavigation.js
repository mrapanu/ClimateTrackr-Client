import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MainNavigation.css";
import { Ctx } from "../util/reducer";

const MainNavigation = ({ isLoggedIn, isAdmin, isNightTime }) => {
  const [isNavActive, setIsNavActive] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Ctx);
  const toggleEditMode = () => {
    dispatch({ type: "EDIT" });
  };
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const logoutAction = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={isNightTime ? "night" : "day"}>
      <NavLink className={isNightTime ? "night" : "day"} to="/">
        <h1>ClimateTrackr</h1>
      </NavLink>

      <nav className={isNightTime ? "night" : "day"}>
        <div
          className={isNightTime ? "nav-toggle night" : " nav-toggle day"}
          onClick={toggleNav}
        >
          ☰ Menu
        </div>
        <ul
          className={`${isNavActive ? "active" : ""} ${
            isNightTime ? "night" : "day"
          }`}
        >
          {isLoggedIn && (
            <li className={isNightTime ? "night" : "day"}>
              <button className="navButton">Settings</button>
            </li>
          )}
          {isLoggedIn && isAdmin && (
            <li className={isNightTime ? "night" : "day"}>
              <button className="navButton">Admin</button>
            </li>
          )}
          {isLoggedIn &&
            isAdmin &&
            (state.isEditMode ? (
              <li className={isNightTime ? "night" : "day"}>
                <button onClick={toggleEditMode} className="navButton">
                  Exit Edit
                </button>
              </li>
            ) : (
              <li className={isNightTime ? "night" : "day"}>
                <button onClick={toggleEditMode} className="navButton">
                  Edit
                </button>
              </li>
            ))}
          {isLoggedIn && (
            <li className={isNightTime ? "night" : "day"}>
              <button onClick={logoutAction} className="navButton">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
