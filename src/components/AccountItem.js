import React, { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getAuthToken } from "../util/auth";
import { Ctx } from "../util/reducer";
import "./AccountItem.css";

const AccountItem = ({ data }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
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
      changePasswordAsync(data.username, password, apiUrl, setMessage);
      setPwEnabled(false);
      const timeoutId = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  };

  const changeUserType = () => {
    changeTypeAsync(data.username, type, apiUrl, setMessage);
    setTypeEnabled(false);
    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  const deleteUser = () => {
    deleteUserAsync(data.username, apiUrl, dispatch, state);
  };

  return (
    <div className="account-container">
      <div className="account-inputs">
        <div className="display-flex">
          <div className="account-username-text">{data.username}</div>
        </div>
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

const deleteUserAsync = async (username, url, dispatch, state) => {
  const response = await fetch(`${url}Auth/DeleteUser?username=` + username, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.success) {
    const updatedAccounts = state.accountData.filter(
      (i) => i.username !== username
    );
    dispatch({
      type: "UPDATE_ACCOUNT_DATA",
      payload: JSON.parse(JSON.stringify(updatedAccounts)),
    });
  }
};

const changePasswordAsync = async (username, password, url, setMessage) => {
  const userData = {
    username: username,
    newPassword: password,
  };
  const response = await fetch(`${url}Auth/ChangePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    setMessage(resData.message);
  }
};

const changeTypeAsync = async (username, role, url, setMessage) => {
  const userData = {
    username: username,
    role: parseInt(role),
  };
  const response = await fetch(`${url}Auth/ChangeRole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    setMessage(resData.message);
  }
};

export default AccountItem;
