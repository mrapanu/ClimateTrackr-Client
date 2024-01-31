import React, { useState } from "react";
import "./ResetPasswordForm.css";

const ResetPasswordForm = () => {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmNewPw, setConfirmNewPw] = useState("");
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
        {currentPw !== "" && newPw !== "" && confirmNewPw != "" && (
          <button className="button-resetpw">Change Password</button>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
