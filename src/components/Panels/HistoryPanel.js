import React, { useState, useEffect } from "react";
import "./HistoryPanel.css";
import { getHistoryAsync } from "../../util/api";
import { useContext } from "react";
import { Ctx } from "../../util/reducer";

const HistoryPanel = () => {
  const { state } = useContext(Ctx);
  const [message, setMessage] = useState("");
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    getHistoryAsync(state.url, setHistoryData, setMessage);
    const intervalId = setInterval(() => {
      getHistoryAsync(state.url, setHistoryData, setMessage);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [state.url, setHistoryData, setMessage]);
  return (
    <div className="history-container">
      {historyData.length !== 0 ?
        historyData.map((i) => {
          return (
            <div className="history-item">
              <div className="group-hist">
                <div className="history-item-date">
                  {new Date(i.dateTime).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hourCycle: 'h23'
                  })}
                </div>
                <div className="history-item-user">{i.user}</div>
              </div>
              <div className="history-item-action">{modifyActionMessage(i.actionMessage)}</div>
            </div>
          );
        }) : <div className="history-message">{message}</div>}
    </div>
  );
};

export default HistoryPanel;

const modifyActionMessage = (message) => {
  const regex = /'([^']+)'/g;
  let modifiedMessage = message;
  modifiedMessage = modifiedMessage.replace(regex, (match, p1) => {
    return `<strong class="strong-text-history">${p1}</strong>`;
  });
  return <div dangerouslySetInnerHTML={{ __html: modifiedMessage }} />;
};
