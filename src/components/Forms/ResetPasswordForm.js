import React, { useContext, useState } from "react";
import { changeUserPasswordAsync } from "../../util/api";
import { jwtDecode } from "jwt-decode";
import { Ctx } from "../../util/reducer";
import "./ResetPasswordForm.css";

const ResetPasswordForm = () => {
  const { state } = useContext(Ctx);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmNewPw, setConfirmNewPw] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const jwt = jwtDecode(localStorage.getItem("token"));

  const handleChangePassword = () => {
    if (newPw !== confirmNewPw) {
      setMessageError('"New Password" and "Confirm Password" do not match.');
    } else {
      changeUserPasswordAsync(
        jwt.unique_name,
        currentPw,
        newPw,
        state.url,
        setMessage,
        setMessageError
      );
    }
    setConfirmNewPw("");
    setNewPw("");
    setCurrentPw("");
    const timeoutId = setTimeout(() => {
      setMessageError("");
      setMessage("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="reset-password-container">
      <div className="resetpw-title">CHANGE PASSWORD</div>
      <div className="resetpw-row-container">
        <div className="resetpw-description">Current Password:</div>
        <input
          className="pw-input"
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
        />
      </div>
      <div className="resetpw-row-container">
        <div className="resetpw-description">New Password:</div>
        <input
          className="pw-input"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
        />
      </div>
      <div className="resetpw-row-container">
        <div className="resetpw-description">Confirm Password:</div>
        <input
          className="pw-input"
          type="password"
          value={confirmNewPw}
          onChange={(e) => setConfirmNewPw(e.target.value)}
        />
      </div>
      <div className="buttons-pw-container">
        {currentPw !== "" && newPw !== "" && confirmNewPw !== "" && (
          <button className="button-resetpw" onClick={handleChangePassword}>
            Change Password
          </button>
        )}
      </div>
      {messageError !== "" && (
        <div className="resetpw-error">{messageError}</div>
      )}
      {message !== "" && <div className="resetpw-success">{message}</div>}
    </div>
  );
};

export default ResetPasswordForm;
