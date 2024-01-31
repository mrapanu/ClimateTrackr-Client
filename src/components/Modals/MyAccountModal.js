import ReactDOM from "react-dom";
import "./MyAccountModal.css";
import ProfileInfoForm from "../Forms/ProfileInfoForm";
import ResetPasswordForm from "../Forms/ResetPasswordForm";

const MyAccountModal = ({ isOpen, onClose, children }) => {
  return isOpen
    ? ReactDOM.createPortal(
        <div className="myaccount-modal-container">
          <div className="myaccount-modal-overlay" onClick={onClose}></div>
          <div className="myaccount-modal-content">
            <span className="myaccount-close-button" onClick={onClose}>
              &times;
            </span>
            <div className="myaccount-title">My Account - Dashboard</div>
            <div className="row-container">
              <ProfileInfoForm></ProfileInfoForm>
              <ResetPasswordForm></ResetPasswordForm>
            </div>
            <div className="myaccount-subtitle">Notifications</div>
            <div className="row-container">
              <div className="enable-notification-description">
                Stay informed with personalized email updates for weekly and
                monthly temperature/humidity reports. Note: You need to assing
                an email to this account in order to receive these reports.
                Change your settings as you wish!
              </div>
              <div className="enable-notification"></div>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default MyAccountModal;
