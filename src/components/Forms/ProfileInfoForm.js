import React, { useContext, useState } from "react";
import { Ctx } from "../../util/reducer";
import { updateProfileAsync } from "../../util/api";
import "./ProfileInfoForm.css";

const ProfileInfoForm = () => {
  const { state, dispatch } = useContext(Ctx);
  const [inputFn, setInputFn] = useState(false);
  const [inputEmail, setInputEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [inputFnValue, setInputFnValue] = useState(state.userProfile.fullName);
  const [inputEmailValue, setInputEmailValue] = useState(
    state.userProfile.email
  );

  const handleUpdateProfile = () => {
    updateProfileAsync(
      inputEmailValue,
      inputFnValue,
      state.url,
      setMessage,
      setMessageErr,
      dispatch
    );
    setInputEmail(false);
    setInputFn(false);
    const timeoutId = setTimeout(() => {
      setMessageErr("");
      setMessage("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="profile-info-container">
      <div className="pf-info-title">PROFILE INFO</div>
      <div className="info-row-container">
        <div className="pf-info-description">Username:</div>
        <div className="pf-info-value">{state.userProfile.username}</div>
      </div>
      <div className="info-row-container">
        <div className="pf-info-description">Full Name:</div>
        {inputFn ? (
          <input
            type="text"
            className="pf-info-input"
            value={inputFnValue}
            onChange={(e) => setInputFnValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="pf-info-input"
            placeholder={inputFnValue !== "" ? inputFnValue : "Not Set"}
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
            onChange={(e) => setInputEmailValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="pf-info-input"
            placeholder={inputEmailValue !== "" ? inputEmailValue : "Not Set"}
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
            <button className="button-save" onClick={handleUpdateProfile}>
              Save
            </button>
          </>
        )}
      </div>
      {messageErr !== "" && (
        <div className="updateprofile-error">{messageErr}</div>
      )}
      {message !== "" && <div className="updateprofile-success">{message}</div>}
    </div>
  );
};

export default ProfileInfoForm;
