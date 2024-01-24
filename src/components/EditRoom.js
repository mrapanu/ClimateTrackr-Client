import React, { useContext, useRef, useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { getAuthToken } from "../util/auth";
import "./EditRoom.css";
import { Ctx } from "../util/reducer";

const EditRoom = ({ data }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(data.roomName);
  const [showError, setShowError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { state, dispatch } = useContext(Ctx);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      // Use setTimeout to focus after the input is fully rendered
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  }, [isEdit]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  const handleLockToggle = () => {
    setIsEdit(!isEdit);
    setInputValue("");
  };

  const renameRoom = (id, inputVal) => {
    if (inputVal.trim() !== "") {
      renameRoomAsync(id, inputVal, apiUrl, state, dispatch);
      setIsEdit(false);
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
        <div className="edit-room-text">RoomName:</div>
        {isEdit ? (
          <input
            className="input-edit-room"
            placeholder={`${showError ? "Can't be empty!" : ""}`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
          />
        ) : (
          <input
            className="input-edit-room"
            placeholder={data.roomName}
            value={inputValue}
            disabled
            type="text"
          />
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
