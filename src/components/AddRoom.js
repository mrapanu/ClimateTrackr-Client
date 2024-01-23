import React, { useContext, useState } from "react";
import { getAuthToken } from "../util/auth";
import "./AddRoom.css";
import { Ctx } from "../util/reducer";

const AddRoom = ({ windowNumber }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const { state, dispatch } = useContext(Ctx);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  const addRoom = (windowNumber, inputVal) => {
    if (inputVal !== "") {
      addRoomAsync(windowNumber, inputVal, apiUrl, state, dispatch);
      setInputValue("");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="addroom-container">
      <div className="room-info">
        <span>RoomName:</span>
        <input
          className="input-add-room"
          placeholder={`${showError ? "Can't be empty!" : ""}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="room-buttons">
        <button
          className="button-add"
          onClick={() => addRoom(windowNumber, inputValue)}
        >
          Add Room
        </button>
      </div>
    </div>
  );
};

const addRoomAsync = async (window, roomFromInput, url, state, dispatch) => {
  const roomData = {
    window: window,
    roomName: roomFromInput,
  };
  const response = await fetch(`${url}RoomConfig/AddRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(roomData),
  });
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_ROOM_DATA",
      payload: resData.data,
    });
  }
};

export default AddRoom;
