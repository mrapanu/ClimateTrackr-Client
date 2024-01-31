import React, { useState } from "react";
import "./ProfileInfoForm.css";

const ProfileInfoForm = () => {
  const [inputFn, setInputFn] = useState(false);
  const [inputFnValue, setInputFnValue] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputEmail, setInputEmail] = useState(false);

  const handleFnChange = (e) => {
    setInputFnValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setInputFnValue(e.target.value);
  };

  return (
    <div className="profile-info-container">
      <div className="pf-info-title">PROFILE INFO</div>
      <div className="info-row-container">
        <div className="pf-info-description">Username:</div>
        <div className="pf-info-value">mihai</div>
      </div>
      <div className="info-row-container">
        <div className="pf-info-description">Full Name:</div>
        {inputFn ? (
          <input
            type="text"
            className="pf-info-input"
            value={inputFnValue}
            onChange={handleFnChange}
          />
        ) : (
          <input
            type="text"
            className="pf-info-input"
            placeholder="Mihai lala"
            readOnly
            onClick={() => setInputFn(true)}
          />
        )}
      </div>

      <div className="info-row-container">
        <div className="pf-info-description">Email:</div>
        {inputEmail ? (
          <input
            type="text"
            className="pf-info-input"
            value={inputEmailValue}
            onChange={handleEmailChange}
          />
        ) : (
          <input
            type="text"
            className="pf-info-input"
            placeholder="mihai@gmail.com"
            readOnly
            onClick={() => setInputEmail(true)}
          />
        )}
      </div>
      <div className="buttons-pf-info-container">
        {(inputFn || inputEmail) && (
          <>
            <button
              className="button-cancel"
              onClick={() => {
                setInputEmail(false);
                setInputFn(false);
              }}
            >
              Cancel
            </button>
            <button className="button-save">Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfoForm;
