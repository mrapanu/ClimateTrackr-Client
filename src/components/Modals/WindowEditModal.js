import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";
import { Ctx } from "../../util/reducer";
import { getRoomsFromWindowAsync } from "../../util/api";
import ModalRoomItem from "../Items/ModalRoomItem";
import AddRoom from "../Forms/AddRoomForm";
import "./WindowEditModal.css";

const WindowEditModal = ({ isOpen, onClose, windowNumber }) => {
  const { state, dispatch } = useContext(Ctx);

  useEffect(() => {
    isOpen && getRoomsFromWindowAsync(state.url, windowNumber, dispatch);
  }, [state.url, isOpen, dispatch, windowNumber]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="edit-modal-container">
          <div className="edit-modal-overlay" onClick={onClose}></div>
          <div className="edit-modal-content">
            <span className="edit-close-button" onClick={onClose}>
              &times;
            </span>
            <div className="title">Window {windowNumber} - Room Management</div>
            {state.roomData.length !== 0 ? (
              state.roomData.map((i) => (
                <ModalRoomItem key={i.id} data={i}></ModalRoomItem>
              ))
            ) : (
              <div>
                <div className="paragraph">
                  There is no room on this window. You can add maximum
                  <strong> 3 rooms </strong>per window.
                </div>
                <div className="paragraph">
                  <strong>IMPORTANT: </strong>
                  The Room Name must match the room name from the sensor,
                  otherwise, you will not receive the data.
                </div>
                <AddRoom windowNumber={windowNumber}></AddRoom>
              </div>
            )}
            {state.roomData.length > 0 && state.roomData.length < 3 && (
              <AddRoom windowNumber={windowNumber}></AddRoom>
            )}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default WindowEditModal;
