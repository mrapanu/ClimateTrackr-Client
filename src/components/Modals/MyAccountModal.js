import ReactDOM from "react-dom";
import "./MyAccountModal.css";
import ProfileInfoForm from "../Forms/ProfileInfoForm";
import ResetPasswordForm from "../Forms/ResetPasswordForm";
import NotificationSettingsForm from "../Forms/NotificationSettingsForm";

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
              <NotificationSettingsForm></NotificationSettingsForm>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default MyAccountModal;
