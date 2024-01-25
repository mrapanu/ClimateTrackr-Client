import React from "react";
import "./SelectTimeRange.css";

const SelectTimeRange = ({ value, onChange }) => {
  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="custom-select-container">
      <div className="general-room-text" htmlFor="timeRange">
        Time Range:
      </div>
      <select id="timeRange" value={value} onChange={handleSelectChange}>
        <option value="2592000000">1 Month</option>
        <option value="604800000">1 Week</option>
        <option value="86400000">1 Day</option>
        <option value="43200000">12 Hours</option>
        <option value="21600000">6 Hours</option>
        <option value="10800000">3 Hours</option>
        <option value="3600000">1 Hour</option>
        <option value="1800000">30 Minutes</option>
        <option value="900000">15 Minutes</option>
      </select>
    </div>
  );
};

export default SelectTimeRange;
