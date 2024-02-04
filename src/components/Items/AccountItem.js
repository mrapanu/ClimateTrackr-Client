import React, { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import {
  deleteUserAsync,
  changePasswordAsync,
  changeTypeAsync,
} from "../../util/api";
import { Ctx } from "../../util/reducer";
import "./AccountItem.css";

const AccountItem = ({ data }) => {
  const [password, setPassword] = useState("**********");
  const [type, setType] = useState(data.role);
  const [message, setMessage] = useState("");
  const [pwEnabled, setPwEnabled] = useState(false);
  const [typeEnabled, setTypeEnabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const { state, dispatch } = useContext(Ctx);

  const enablePasswordChange = () => {
    setPwEnabled(!pwEnabled);
    setTypeEnabled(false);
    pwEnabled ? setPassword("**********") : setPassword("");
  };

  const enableTypeChange = () => {
    setPwEnabled(false);
    setTypeEnabled(!typeEnabled);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const changePassword = () => {
    if (password === "") {
      setShowError(true);
    } else {
      setShowError(false);
      changePasswordAsync(data.username, password, state.url, setMessage);
      setPwEnabled(false);
      const timeoutId = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  };

  const changeUserType = () => {
    changeTypeAsync(data.username, type, state.url, setMessage);
    setTypeEnabled(false);
    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  const deleteUser = () => {
    deleteUserAsync(data.username, state.url, dispatch, state);
  };

  return (
    <div key={data.id} className="account-container">
      <div className="account-inputs">
        <div className="account-username-text">{data.username}</div>
        <div className="display-flex">
          {pwEnabled ? (
            <input
              className="input-password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder={`${showError ? "Can't be empty!" : ""}`}
            ></input>
          ) : (
            <input
              className="input-password"
              type="password"
              disabled
              value={password}
            ></input>
          )}
          <button
            className="button-account-edit"
            onClick={enablePasswordChange}
          >
            <FaPen />
          </button>
        </div>
        <div className="display-flex">
          {typeEnabled ? (
            <select value={type} onChange={handleTypeChange}>
              <option value="2">Normal</option>
              <option value="1">Admin</option>
            </select>
          ) : (
            <select value={type} disabled>
              <option value="2">Normal</option>
              <option value="1">Admin</option>
            </select>
          )}
          <button className="button-account-edit" onClick={enableTypeChange}>
            <FaPen />
          </button>
        </div>
      </div>
      <div className="display-flex">
        <div className="message">{message}</div>
      </div>
      <div className="account-buttons">
        {pwEnabled && (
          <button className="change-button" onClick={changePassword}>
            Change Password
          </button>
        )}
        {typeEnabled && (
          <button className="change-button" onClick={changeUserType}>
            Change User Type
          </button>
        )}
        <button className="delete-account-button" onClick={deleteUser}>
          Delete User
        </button>
      </div>
    </div>
  );
};

export default AccountItem;
