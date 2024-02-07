import React, { useContext, useState } from "react";
import "./SmtpPanel.css";
import { saveSmtpSettingsAsync, sendTestEmailAsync } from "../../util/api";
import { Ctx } from "../../util/reducer";

const SmtpPanel = () => {
  const { state, dispatch } = useContext(Ctx);
  const [smtpSettings, setSmtpSettings] = useState(state.smtpSettings);
  const [message, setMessage] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [recipient, setRecipient] = useState("");
  const [messageTest, setMessageTest] = useState("");
  const [messageTestErr, setMessageTestErr] = useState("");
  const handleInputChange = (field, value) => {
    setSmtpSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value,
    }));
  };

  const handleConnectionSecurityChange = (e) => {
    handleInputChange("connSecurity", parseInt(e.target.value));
  };

  const handleAuthenticationChange = (e) => {
    handleInputChange("authOption", parseInt(e.target.value));
  };

  const handleTestButtonClick = () => {
    sendTestEmailAsync(recipient, state.url, setMessageTest, setMessageTestErr);
    const timeoutId = setTimeout(() => {
      setMessageTestErr("");
      setMessageTest("");
    }, 10000);
    return () => clearTimeout(timeoutId);
  };

  const handleSaveButtonClick = () => {
    saveSmtpSettingsAsync(
      smtpSettings,
      state.url,
      setMessage,
      setMessageErr,
      dispatch
    );
    const timeoutId = setTimeout(() => {
      setMessageErr("");
      setMessage("");
    }, 10000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      <div className="smtp-container">
        <div className="smtp-title">SMTP SETTINGS</div>
        <div className="smtp-row-container">
          <div className="smtp-description"> SMTP Server:</div>
          <input
            type="text"
            className="smtp-input"
            value={smtpSettings.smtpServer}
            onChange={(e) => handleInputChange("smtpServer", e.target.value)}
          />
        </div>
        <div className="smtp-row-container">
          <div className="smtp-description"> Port:</div>
          <input
            type="text"
            className="smtp-input"
            value={smtpSettings.smtpPort}
            onChange={(e) =>
              handleInputChange("smtpPort", parseInt(e.target.value))
            }
          />
        </div>
        <div className="smtp-row-container">
          <div className="smtp-description"> SMTP Helo (optional):</div>
          <input
            type="text"
            className="smtp-input"
            value={smtpSettings.smtpHelo}
            onChange={(e) => handleInputChange("smtpHelo", e.target.value)}
          />
        </div>
        <div className="smtp-row-container">
          <div className="smtp-description"> SMTP Email:</div>
          <input
            type="text"
            className="smtp-input"
            value={smtpSettings.smtpEmail}
            onChange={(e) => handleInputChange("smtpEmail", e.target.value)}
          />
        </div>
        <div className="smtp-row-container">
          <div className="smtp-description">Connection Security:</div>
          <div className="smtp-input">
            <label className="smtp-input-label">
              <input
                type="radio"
                name="securityProtocol"
                value={0}
                checked={smtpSettings.connSecurity === 0}
                onChange={handleConnectionSecurityChange}
              />
              None
            </label>
            <label className="smtp-input-label">
              <input
                type="radio"
                name="securityProtocol"
                value={1}
                checked={smtpSettings.connSecurity === 1}
                onChange={handleConnectionSecurityChange}
              />
              STARTTLS
            </label>
            <label className="smtp-input-label">
              <input
                type="radio"
                name="securityProtocol"
                value={2}
                checked={smtpSettings.connSecurity === 2}
                onChange={handleConnectionSecurityChange}
              />
              SSL/TLS
            </label>
          </div>
        </div>
        <div className="smtp-row-container">
          <div className="smtp-description">Authentication</div>
          <div className="smtp-input">
            <label className="smtp-input-label">
              <input
                type="radio"
                name="auth"
                value={0}
                checked={smtpSettings.authOption === 0}
                onChange={handleAuthenticationChange}
              />
              None
            </label>
            <label className="smtp-input-label">
              <input
                type="radio"
                name="auth"
                value={1}
                checked={smtpSettings.authOption === 1}
                onChange={handleAuthenticationChange}
              />
              User & Password
            </label>
          </div>
        </div>
        {smtpSettings.authOption === 1 && (
          <>
            <div className="smtp-row-container">
              <div className="smtp-description"> Username:</div>
              <input
                type="text"
                className="smtp-input"
                value={smtpSettings.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            </div>
            <div className="smtp-row-container">
              <div className="smtp-description"> Password:</div>
              <input
                type="password"
                className="smtp-input"
                value={
                  smtpSettings.password === undefined
                    ? "***********"
                    : smtpSettings.password
                }
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
          </>
        )}
        <div className="buttons-smtp-container">
          <button className="button-smtp-save" onClick={handleSaveButtonClick}>
            SAVE
          </button>
        </div>
        {messageErr !== "" && <div className="smtp-error">{messageErr}</div>}
        {message !== "" && <div className="smtp-success">{message}</div>}
      </div>
      <div className="smtp-testemail-container">
        <div className="smtp-row-container">
          <div className="smtp-description"> Recipient Email Address:</div>
          <input
            type="text"
            className="smtp-input"
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="buttons-smtp-container">
          <button className="button-smtp-test" onClick={handleTestButtonClick}>
            Send Test Email
          </button>
        </div>
        {messageTestErr !== "" && (
          <div className="smtp-error">{messageTestErr}</div>
        )}
        {messageTest !== "" && (
          <div className="smtp-success">{messageTest}</div>
        )}
      </div>
    </>
  );
};

export default SmtpPanel;
