import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Ctx } from "../../util/reducer";
import { getThByIntervalAsync } from "../../util/api";
import TemperatureGraph from "../Graphs/TemperatureGraph";
import HumidityGraph from "../Graphs/HumidityGraph";
import SelectTimeRange from "../Graphs/SelectTimeRange";
import "./RoomModal.css";

const RoomModal = ({ roomName, isOpen, onClose }) => {
  const { state } = useContext(Ctx);
  const [data, setData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("10800000");

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
  };

  useEffect(() => {
    isOpen &&
      getThByIntervalAsync(roomName, state.url, selectedTimeRange, setData);
    const intervalId = setInterval(() => {
      isOpen &&
        getThByIntervalAsync(roomName, state.url, selectedTimeRange, setData);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [roomName, state.url, selectedTimeRange, isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="room-modal-container">
          <div className="room-modal-overlay" onClick={onClose}></div>
          <div className="room-modal-content">
            <span className="room-close-button" onClick={onClose}>
              &times;
            </span>
            <div>
              <div className="room-title">{roomName}</div>
              <SelectTimeRange
                value={selectedTimeRange}
                onChange={handleTimeRangeChange}
              ></SelectTimeRange>
            </div>
            {isOpen && <TemperatureGraph data={data}></TemperatureGraph>}
            {isOpen && <HumidityGraph data={data}></HumidityGraph>}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default RoomModal;
