import React, { useState } from "react";
import "./SelectNotificationFrequency.css";
const SelectNotificationFrequency = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="selector-container">
      <label className="option-label">
        <input
          type="checkbox"
          checked={selectedOptions.includes("Daily")}
          onChange={() => handleOptionToggle("Daily")}
        />
        Daily
      </label>
      <label className="option-label">
        <input
          type="checkbox"
          checked={selectedOptions.includes("Weekly")}
          onChange={() => handleOptionToggle("Weekly")}
        />
        Weekly
      </label>
      <label className="option-label">
        <input
          type="checkbox"
          checked={selectedOptions.includes("Monthly")}
          onChange={() => handleOptionToggle("Monthly")}
        />
        Monthly
      </label>
    </div>
  );
};

export default SelectNotificationFrequency;
