import "./AccountItem.css";
import React, { useContext, useState } from "react";
import { getAuthToken } from "../util/auth";
import { Ctx } from "../util/reducer";
const AccountForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { state, dispatch } = useContext(Ctx);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [userInputValue, setUserInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [userType, setUserType] = useState("2");

  const handleUserInputChange = (e) => {
    setUserInputValue(e.target.value);
    setShowError(false);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInputValue(e.target.value);
    setShowError(false);
  };

  const createAccount = () => {
    if (userInputValue !== "" && passwordInputValue !== "") {
      createUserAsync(
        userInputValue,
        passwordInputValue,
        parseInt(userType),
        apiUrl,
        setMessage,
        dispatch,
        state
      );
      setShowError(false);
      setUserInputValue("");
      setPasswordInputValue("");
      setUserType("2");
    } else {
      setShowError(true);
    }
  };

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
  };
  return (
    <div className="account-container">
      <div className="account-inputs">
        <div className="account-input-descriptor">Username</div>
        <input
          className="input-username"
          type="text"
          placeholder={`${showError ? "Can't be empty!" : ""}`}
          value={userInputValue}
          onChange={handleUserInputChange}
        ></input>
        <div className="account-input-descriptor">Password</div>
        <input
          className="input-password"
          type="password"
          placeholder={`${showError ? "Can't be empty!" : ""}`}
          value={passwordInputValue}
          onChange={handlePasswordInputChange}
        ></input>
        <div className="account-input-descriptor">Type</div>
        <select id="account-type" onChange={handleTypeChange} value={userType}>
          <option value="2">Normal</option>
          <option value="1">Admin</option>
        </select>
        <div className="account-error-message">{message}</div>
      </div>
      <div className="account-button">
        <button className="create-account-button" onClick={createAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};

const createUserAsync = async (
  username,
  password,
  type,
  url,
  setMessage,
  dispatch,
  state
) => {
  const userData = {
    username: username,
    password: password,
    userType: type,
  };
  const response = await fetch(`${url}Auth/AddUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    const updatedAccounts = state.accountData.concat({
      username: username,
      password: password,
      role: type,
    });
    dispatch({
      type: "UPDATE_ACCOUNT_DATA",
      payload: JSON.parse(JSON.stringify(updatedAccounts)),
    });
    setMessage("");
  } else {
    setMessage(resData.message);
  }
};

export default AccountForm;
