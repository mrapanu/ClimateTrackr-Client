import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Ctx } from "../../util/reducer";
import {
  getThByIntervalAsync,
  getThByIntervalCustomAsync,
  getThCurrentAsync,
} from "../../util/api";
import TemperatureGraph from "../Graphs/TemperatureGraph";
import HumidityGraph from "../Graphs/HumidityGraph";
import SelectTimeRange from "../Graphs/SelectTimeRange";
import "./RoomModal.css";
import CurrentThItem from "../Items/CurrentThItem";

const RoomModal = ({ roomName, isOpen, onClose }) => {
  const { state } = useContext(Ctx);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState("NA");
  const [hum, setHum] = useState("NA");
  const [selectedTimeRange, setSelectedTimeRange] = useState("10800000");

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
  };

  const handleShowCustomData = (customFromDate, customUntilDate) => {
    if (customFromDate !== null && customUntilDate !== null) {
      getThByIntervalCustomAsync(
        roomName,
        state.url,
        customFromDate,
        customUntilDate,
        setData
      );
      setSelectedTimeRange("");
    }
  };

  useEffect(() => {
    isOpen && getThCurrentAsync(roomName, setTemp, setHum, state.url);
    isOpen &&
      selectedTimeRange !== "" &&
      getThByIntervalAsync(roomName, state.url, selectedTimeRange, setData);
    const intervalId = setInterval(() => {
      isOpen &&
        selectedTimeRange !== "" &&
        getThByIntervalAsync(roomName, state.url, selectedTimeRange, setData);
      isOpen && getThCurrentAsync(roomName, setTemp, setHum, state.url);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [roomName, state.url, selectedTimeRange, isOpen, setHum, setTemp]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="room-modal-container">
          <div className="room-modal-overlay" onClick={onClose}></div>
          <div className="room-modal-content">
            <span className="room-close-button" onClick={onClose}>
              &times;
            </span>
            <div>
              <div className="title-th-container">
                <div className="room-title">{roomName}</div>
                <CurrentThItem temp={temp} hum={hum}></CurrentThItem>
              </div>

              <SelectTimeRange
                value={selectedTimeRange}
                onChange={handleTimeRangeChange}
                handleShowCustomData={handleShowCustomData}
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
