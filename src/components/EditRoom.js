import React, { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getAuthToken } from "../util/auth";
import "./EditRoom.css";
import { Ctx } from "../util/reducer";

const EditRoom = ({ data }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [inputValue, setInputValue] = useState(data.roomName);
  const [isEdit, setIsEdit] = useState(false);
  const { dispatch } = useContext(Ctx);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLockToggle = () => {
    setIsEdit(!isEdit);
  };

  const updateRoom = (id, inputVal) => {};
  const fetchData = async (id) => {
    const response = await fetch(
      `${apiUrl}RoomConfig/DeleteRoom?roomId=` + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
      }
    );
    const resData = await response.json();
    dispatch({
      type: "UPDATE_ROOM_DATA",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
  };
  const deleteRoom = (id) => {
    fetchData(id);
  };

  return (
    <div className="editroom-container">
      <div className="room-info">
        <span>ID: {data.id}</span>
        <span>RoomName:</span>
        {isEdit ? (
          <input
            className="input-edit-room"
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
            onClick={() => updateRoom(data.id, inputValue)}
          >
            Update Room
          </button>
        )}
        <button className="button-delete" onClick={() => deleteRoom(data.id)}>
          Delete Room
        </button>
      </div>
    </div>
  );
};

export default EditRoom;
