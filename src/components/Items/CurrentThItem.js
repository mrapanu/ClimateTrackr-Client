import React, { useState, useEffect } from "react";
import "./CurrentThItem.css";

const CurrentThItem = ({ temp, hum }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="current-th-container">
      <div className="th-time">{formattedTime}</div>
      <div className="th-temperature">T: {temp}</div>
      <div className="th-humidity">H: {hum}</div>
    </div>
  );
};

export default CurrentThItem;
