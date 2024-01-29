import React, { useState, useEffect, useContext } from "react";
import RoomModal from "../Modals/RoomModal";
import { Ctx } from "../../util/reducer";
import { getThCurrentDataAsync } from "../../util/api";
import "./HomeRoomItem.css";

const HomeRoomItem = ({ roomName, id }) => {
  const { state } = useContext(Ctx);
  const [temp, setTemp] = useState("NA");
  const [hum, setHum] = useState("NA");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getThCurrentDataAsync(roomName, setTemp, setHum, state.url);
    const intervalId = setInterval(() => {
      getThCurrentDataAsync(roomName, setTemp, setHum, state.url);
    }, 240000);
    return () => clearInterval(intervalId);
  }, [roomName, state.url]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="room" id={id}>
        <span className="room-name">{roomName}</span>
        <div className="group">
          <span className="temperature">{temp}</span>
          <span className="humidity">{hum}</span>
        </div>
      </button>
      <RoomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        roomName={roomName}
      ></RoomModal>
    </>
  );
};

export default HomeRoomItem;
