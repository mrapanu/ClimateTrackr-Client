import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MainNavigation.css";
import { Ctx } from "../util/reducer";
import AdminModal from "./AdminModal";
import AccountPanel from "./AccountPanel";

const MainNavigation = ({ isLoggedIn, isAdmin, isNightTime }) => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [view, setView] = useState("general");
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Ctx);
  const toggleEditMode = () => {
    dispatch({ type: "EDIT" });
  };
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const onCloseNav = () => {
    setIsNavActive(false);
  };

  const logoutAction = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openAdminModal = () => {
    setAdminModal(true);
  };

  const closeAdminModal = () => {
    setAdminModal(false);
  };
  const changeView = (viewName) => {
    setView(viewName);
  };

  return (
    <>
      <header className={isNightTime ? "night" : "day"}>
        <NavLink className={isNightTime ? "night" : "day"} to="/">
          <div className="site-title">ClimateTrackr</div>
        </NavLink>

        <nav className={isNightTime ? "night" : "day"}>
          <div
            className={isNightTime ? "nav-toggle night" : " nav-toggle day"}
            onClick={toggleNav}
          >
            ☰ Menu
          </div>
          <div onClick={onCloseNav}>
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
                  <button className="navButton" onClick={openAdminModal}>
                    Admin
                  </button>
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
          </div>
        </nav>
      </header>
      <AdminModal
        onChangeView={changeView}
        view={view}
        isOpen={adminModal}
        onClose={closeAdminModal}
      >
        {view === "general" && <h1>GENERAL CONTENT</h1>}
        {view === "smtp" && <h1>SMTP CONTENT</h1>}
        {view === "accounts" && <AccountPanel />}
      </AdminModal>
    </>
  );
};

export default MainNavigation;
