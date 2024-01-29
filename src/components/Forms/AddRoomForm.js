import React, { useContext, useState } from "react";
import { Ctx } from "../../util/reducer";
import { addRoomAsync } from "../../util/api";
import "./AddRoomForm.css";

const AddRoomForm = ({ windowNumber }) => {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const { state, dispatch } = useContext(Ctx);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  const addRoom = (windowNumber, inputVal) => {
    if (inputVal !== "") {
      addRoomAsync(windowNumber, inputVal, state.url, dispatch);
      setInputValue("");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="addroom-container">
      <div className="room-info">
        <div className="input-description">RoomName: </div>
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

export default AddRoomForm;
