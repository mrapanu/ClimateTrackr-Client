import React, { useContext, useState } from "react";
import { Ctx } from "../../util/reducer";
import { createUserAsync } from "../../util/api";
import "./AddAccountForm.css";

const AddAccountForm = () => {
  const { state, dispatch } = useContext(Ctx);
  const [showError, setShowError] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
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
        state.url,
        setMessageErr,
        setMessageSuccess,
        dispatch,
        state
      );
      setShowError(false);
      setUserInputValue("");
      setPasswordInputValue("");
    } else {
      setShowError(true);
    }
    const timeoutId = setTimeout(() => {
      setMessageErr("");
      setMessageSuccess("");
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
  };
  return (
    <div className="create-account-container">
      <div className="create-account-inputs">
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
        <div className="display-flex">
          <select
            id="account-type"
            onChange={handleTypeChange}
            value={userType}
          >
            <option value="2">Normal</option>
            <option value="1">Admin</option>
          </select>
        </div>
      </div>
      <div className="account-error-message">{messageErr}</div>
      <div className="account-success-message">{messageSuccess}</div>
      <div className="create-account-buttons">
        <button className="create-account-button" onClick={createAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AddAccountForm;
