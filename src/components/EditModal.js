import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";
import { getAuthToken } from "../util/auth";
import { Ctx } from "../util/reducer";
import "./EditModal.css";
import EditRoom from "./EditRoom";

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
            <h1>Manage rooms in window {windowNumber}</h1>
            {state.roomData.length !== 0 ? (
              state.roomData.map((i) => (
                <EditRoom key={i.id} data={i}></EditRoom>
              ))
            ) : (
              <div>
                <p>
                  There is no room on this window. You can add maximum 3 rooms
                  per window. Press the button below to add a room
                </p>
                <button>Add Room</button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default EditModal;
