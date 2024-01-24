import ReactDOM from "react-dom";
import "./AdminModal.css";

const AdminModal = ({ isOpen, onClose }) => {
  return isOpen
    ? ReactDOM.createPortal(
        <div className="admin-modal-overlay" onClick={onClose}>
          <div className="admin-modal-content">
            <span className="admin-close-button" onClick={onClose}>
              &times;
            </span>
            <div className="modal-content">
              <div className="panel">
                <div className="top">
                  <div className="list">
                    <div className="item">GENERAL</div>
                    <div className="item">ACCOUNTS</div>
                    <div className="item">SMTP SETTINGS</div>
                  </div>
                </div>
                <div className="view"></div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AdminModal;
