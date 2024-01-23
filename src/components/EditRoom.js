import React, { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getAuthToken } from "../util/auth";
import "./EditRoom.css";
import { Ctx } from "../util/reducer";

const EditRoom = ({ data }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [inputValue, setInputValue] = useState(data.roomName);
  const [showError, setShowError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { state, dispatch } = useContext(Ctx);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  const handleLockToggle = () => {
    setIsEdit(!isEdit);
  };

  const renameRoom = (id, inputVal) => {
    if (inputVal !== "") {
      renameRoomAsync(id, inputVal, apiUrl, state, dispatch);
      setIsEdit(!isEdit);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const deleteRoom = (id) => {
    deleteRoomAsync(id, apiUrl, dispatch);
  };

  return (
    <div className="editroom-container">
      <div className="room-info">
        <span>ID: {data.id}</span>
        <span>RoomName:</span>
        {isEdit ? (
          <input
            className="input-edit-room"
            placeholder={`${showError ? "Can't be empty!" : ""}`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        ) : (
          <span>{data.roomName}</span>
        )}
        <button className="button-edit" onClick={handleLockToggle}>
          <FaPen />
        </button>
      </div>
      <div className="room-buttons">
        {isEdit && (
          <button
            className="button-update"
            onClick={() => renameRoom(data.id, inputValue)}
          >
            Rename Room
          </button>
        )}
        <button className="button-delete" onClick={() => deleteRoom(data.id)}>
          Delete Room
        </button>
      </div>
    </div>
  );
};

const deleteRoomAsync = async (id, url, dispatch) => {
  const response = await fetch(`${url}RoomConfig/DeleteRoom?roomId=` + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  dispatch({
    type: "UPDATE_ROOM_DATA",
    payload: JSON.parse(JSON.stringify(resData.data)),
  });
};

const renameRoomAsync = async (id, roomFromInput, url, state, dispatch) => {
  const roomData = {
    id: id,
    name: roomFromInput,
  };
  const response = await fetch(`${url}RoomConfig/RenameRoom`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(roomData),
  });
  const resData = await response.json();
  if (resData.success) {
    const updatedState = state.roomData.map((i) => {
      if (i.id === id) {
        i.roomName = resData.data.roomName;
      }
      return i;
    });
    dispatch({
      type: "UPDATE_ROOM_DATA",
      payload: updatedState,
    });
  }
};

export default EditRoom;
