import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../util/reducer";
import AdminModal from "../components/Modals/AdminModal";
import MyAccountModal from "../components/Modals/MyAccountModal";
import AccountPanel from "../components/Panels/AccountPanel";
import SmtpPanel from "../components/Panels/SmtpPanel";
import HistoryPanel from "../components/Panels/HistoryPanel";
import "./MainNavigation.css";

const MainNavigation = ({ isLoggedIn, isAdmin, isNightTime }) => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [myAccountModal, setMyAccountModal] = useState(false);
  const [view, setView] = useState("history");
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

  const openMyAccountModal = () => {
    setMyAccountModal(true);
  };

  const closeMyAccountModal = () => {
    setMyAccountModal(false);
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
          <div className="site-title">°ClimateTrackr</div>
        </NavLink>

        <nav className={isNightTime ? "night" : "day"}>
          {isLoggedIn && (
            <div
              className={isNightTime ? "nav-toggle night" : " nav-toggle day"}
              onClick={toggleNav}
            >
              ☰ Menu
            </div>
          )}
          <div onClick={onCloseNav}>
            <ul
              className={`${isNavActive ? "active" : ""} ${
                isNightTime ? "night" : "day"
              }`}
            >
              {isLoggedIn && (
                <li className={isNightTime ? "night" : "day"}>
                  <button className="navButton" onClick={openMyAccountModal}>
                    My Account
                  </button>
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
        {view === "history" && <HistoryPanel />}
        {view === "smtp" && <SmtpPanel />}
        {view === "accounts" && <AccountPanel />}
      </AdminModal>
      <MyAccountModal
        isOpen={myAccountModal}
        onClose={closeMyAccountModal}
      ></MyAccountModal>
    </>
  );
};

export default MainNavigation;
