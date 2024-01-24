import ReactDOM from "react-dom";
import "./AdminModal.css";

const AdminModal = ({ onChangeView, view, isOpen, onClose, children }) => {
  return isOpen
    ? ReactDOM.createPortal(
        <div className="admin-modal-container">
          <div className="admin-modal-overlay" onClick={onClose}></div>
          <div className="admin-modal-content">
            <span className="admin-close-button" onClick={onClose}>
              &times;
            </span>
            <div className="modal-content">
              <div className="panel">
                <div className="top">
                  <div className="list">
                    <div
                      className={`item ${view === "general" && "selected"}`}
                      onClick={(event) => onChangeView("general", event)}
                    >
                      GENERAL
                    </div>
                    <div
                      className={`item ${view === "accounts" && "selected"}`}
                      onClick={(event) => onChangeView("accounts", event)}
                    >
                      ACCOUNTS
                    </div>
                    <div
                      className={`item ${view === "smtp" && "selected"}`}
                      onClick={(event) => onChangeView("smtp", event)}
                    >
                      SMTP SETTINGS
                    </div>
                  </div>
                </div>
                <div className="view">{children}</div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AdminModal;
