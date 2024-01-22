import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./RoomModal.css";
import { getAuthToken } from "../util/auth";
import TemperatureGraph from "./TemperatureGraph";
import HumidityGraph from "./HumidityGraph";
import SelectTimeRange from "./SelectTimeRange";

const RoomModal = ({ roomName, isOpen, onClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("10800000");

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
  };

  useEffect(() => {
    isOpen && fetchData(roomName, apiUrl, selectedTimeRange, setData);
    const intervalId = setInterval(() => {
      isOpen && fetchData(roomName, apiUrl, selectedTimeRange, setData);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [roomName, apiUrl, selectedTimeRange, isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="room-modal-overlay" onClick={onClose}>
          <div
            className="room-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="room-close-button" onClick={onClose}>
              &times;
            </span>
            <h1>{roomName}</h1>
            <SelectTimeRange
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
            ></SelectTimeRange>
            {isOpen && <TemperatureGraph data={data}></TemperatureGraph>}
            {isOpen && <HumidityGraph data={data}></HumidityGraph>}
          </div>
        </div>,
        document.body
      )
    : null;
};

const fetchData = async (room, apiUrl, timeRange, setData) => {
  const start = new Date();
  const end = new Date(start.getTime() - timeRange);
  const convertedEnd =
    end.toLocaleDateString() +
    " " +
    end.toLocaleTimeString(undefined, { hour12: false });
  const convertedStart =
    start.toLocaleDateString() +
    " " +
    start.toLocaleTimeString(undefined, { hour12: false });

  try {
    const response = await fetch(
      `${apiUrl}TempAndHum/GetByDate?timeStart=` +
        convertedEnd.slice(0, 19).replace("T", " ") +
        "&timeEnd=" +
        convertedStart.slice(0, 19).replace("T", " ") +
        "&room=" +
        room,
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
      setData([]);
    } else {
      setData(JSON.parse(JSON.stringify(resData.data)));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default RoomModal;
