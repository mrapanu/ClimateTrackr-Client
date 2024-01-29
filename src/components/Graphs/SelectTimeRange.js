import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SelectTimeRange.css";

const SelectTimeRange = ({ value, onChange, handleShowCustomData }) => {
  const [customFromDate, setCustomFromDate] = useState(null);
  const [customUntilDate, setCustomUntilDate] = useState(null);
  const [isCustomRange, setIsCustomRange] = useState(false);

  const handleCustomData = () => {
    if (customFromDate !== null && customUntilDate !== null) {
      handleShowCustomData(new Date(customFromDate), new Date(customUntilDate));
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "custom") {
      setIsCustomRange(true);
    } else {
      setIsCustomRange(false);
      onChange(selectedValue);
    }
  };

  return (
    <div className="custom-select-container">
      <div className="general-room-text" htmlFor="timeRange">
        Time Range:
      </div>
      <div className="custom-select">
        <select
          id="timeRange"
          value={isCustomRange ? "custom" : value}
          onChange={handleSelectChange}
        >
          <option value="2592000000">1 Month</option>
          <option value="604800000">1 Week</option>
          <option value="86400000">1 Day</option>
          <option value="43200000">12 Hours</option>
          <option value="21600000">6 Hours</option>
          <option value="10800000">3 Hours</option>
          <option value="3600000">1 Hour</option>
          <option value="1800000">30 Minutes</option>
          <option value="900000">15 Minutes</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {isCustomRange && (
        <div className="custom-date-range-form">
          <div className="datepicker-descriptor">From:</div>
          <DatePicker
            id="fromDate"
            selected={customFromDate}
            onChange={(date) => setCustomFromDate(date)}
            showTimeSelect
            dateFormat="Pp"
            popperPlacement="center"
          />

          <div className="datepicker-descriptor">To:</div>
          <DatePicker
            id="untilDate"
            selected={customUntilDate}
            onChange={(date) => setCustomUntilDate(date)}
            showTimeSelect
            dateFormat="Pp"
            popperPlacement="center"
          />
          <button className="get-th-button" onClick={handleCustomData}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectTimeRange;
