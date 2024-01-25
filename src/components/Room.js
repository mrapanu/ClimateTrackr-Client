import React, { useState, useEffect } from "react";
import "./Room.css";
import { getAuthToken } from "../util/auth";
import RoomModal from "./RoomModal";

const Room = ({ roomName, id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [temp, setTemp] = useState("NA");
  const [hum, setHum] = useState("NA");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async (name) => {
      const time = new Date();
      const convertedTime =
        time.toLocaleDateString() +
        " " +
        time.toLocaleTimeString(undefined, { hour12: false });
      const response = await fetch(
        `${apiUrl}TempAndHum/GetCurrentData?currenttime=` +
          convertedTime.slice(0, 19).replace("T", " ") +
          "&room=" +
          name,
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
        setTemp("NA");
        setHum("NA");
      } else {
        setTemp(Math.floor(resData.data.temperature) + "°C");
        setHum(Math.floor(resData.data.humidity) + "%");
      }
    };
    fetchData(roomName);
    const intervalId = setInterval(() => {
      fetchData(roomName);
    }, 240000);
    return () => clearInterval(intervalId);
  }, [roomName, apiUrl]);

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

export default Room;
