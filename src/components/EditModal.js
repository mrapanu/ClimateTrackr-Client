import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";
import { getAuthToken } from "../util/auth";
import { Ctx } from "../util/reducer";
import "./EditModal.css";
import EditRoom from "./EditRoom";
import AddRoom from "./AddRoom";

const EditModal = ({ isOpen, onClose, windowNumber }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { state, dispatch } = useContext(Ctx);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "UPDATE_ROOM_DATA", payload: [] });
      const response = await fetch(
        `${apiUrl}RoomConfig/GetRoomsFromWindow?window=` + windowNumber,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken(),
          },
        }
      );
      const resData = await response.json();
      if (resData.data === null) {
        dispatch({ type: "UPDATE_ROOM_DATA", payload: [] });
      } else {
        dispatch({
          type: "UPDATE_ROOM_DATA",
          payload: JSON.parse(JSON.stringify(resData.data)),
        });
      }
    };
    isOpen && fetchData();
  }, [apiUrl, isOpen, dispatch, windowNumber]);
  return isOpen
    ? ReactDOM.createPortal(
        <div className="edit-modal-overlay" onClick={onClose}>
          <div
            className="edit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="edit-close-button" onClick={onClose}>
              &times;
            </span>
            <div className="title">Window {windowNumber} - Room Management</div>
            {state.roomData.length !== 0 ? (
              state.roomData.map((i) => (
                <EditRoom key={i.id} data={i}></EditRoom>
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

export default EditModal;
