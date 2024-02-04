import React, { useState, useEffect } from "react";
import "./SelectNotificationFrequency.css";

const SelectNotificationFrequency = ({ frequency, onUpdate }) => {
  const [selectedOptions, setSelectedOptions] = useState(frequency);

  useEffect(() => {
    onUpdate(selectedOptions);
  }, [selectedOptions, onUpdate]);

  const handleOptionToggle = (option) => {
    const optionValues = {
      Daily: 1,
      Weekly: 2,
      Monthly: 4,
    };

    setSelectedOptions((prevOptions) => {
      const newOptions = prevOptions ^ optionValues[option];
      return newOptions;
    });
  };

  return (
    <div className="selector-container">
      <label className="option-label">
        <input
          type="checkbox"
          checked={(selectedOptions & 1) !== 0}
          onChange={() => handleOptionToggle("Daily")}
        />
        Daily
      </label>
      <label className="option-label">
        <input
          type="checkbox"
          checked={(selectedOptions & 2) !== 0}
          onChange={() => handleOptionToggle("Weekly")}
        />
        Weekly
      </label>
      <label className="option-label">
        <input
          type="checkbox"
          checked={(selectedOptions & 4) !== 0}
          onChange={() => handleOptionToggle("Monthly")}
        />
        Monthly
      </label>
    </div>
  );
};

export default SelectNotificationFrequency;
