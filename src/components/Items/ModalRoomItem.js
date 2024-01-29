import React, { useContext, useRef, useState, useEffect } from "react";
import { Ctx } from "../../util/reducer";
import { FaPen } from "react-icons/fa";
import { renameRoomAsync, deleteRoomAsync } from "../../util/api";
import "./ModalRoomItem.css";

const ModalRoomItem = ({ data }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(data.roomName);
  const [showError, setShowError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { state, dispatch } = useContext(Ctx);

  useEffect(() => {
    if (isEdit && inputRef.current) {
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
      renameRoomAsync(id, inputVal, state.url, state, dispatch);
      setIsEdit(false);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const deleteRoom = (id) => {
    deleteRoomAsync(id, state.url, dispatch);
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

export default ModalRoomItem;
