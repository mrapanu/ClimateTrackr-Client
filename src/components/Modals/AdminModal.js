import ReactDOM from "react-dom";
import { useContext, useEffect } from "react";
import { Ctx } from "../../util/reducer";
import { getSmtpSettingsAsync } from "../../util/api";
import "./AdminModal.css";

const AdminModal = ({ onChangeView, view, isOpen, onClose, children }) => {
  const { state, dispatch } = useContext(Ctx);
  useEffect(() => {
    isOpen && getSmtpSettingsAsync(state.url, dispatch);
  }, [state.url, dispatch, isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="admin-modal-container">
          <div className="admin-modal-overlay" onClick={onClose}></div>
          <div className="admin-modal-content">
            <span className="admin-close-button" onClick={onClose}>
              &times;
            </span>
            <div className="panel">
              <div className="top">
                <div className="list">
                  <div
                    className={`item ${view === "history" && "selected"}`}
                    onClick={(event) => onChangeView("history", event)}
                  >
                    HISTORY
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
                    SMTP
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AdminModal;
