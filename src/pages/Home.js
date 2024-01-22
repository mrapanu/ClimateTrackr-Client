import React, { useContext, useState, useEffect } from "react";
import PageContent from "../components/PageContent";
import "./Home.css";
import { Ctx } from "../util/reducer";
import Room from "../components/Room";
import { getAuthToken } from "../util/auth";
import EditModal from "../components/EditModal";
function HomePage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { state } = useContext(Ctx);
  const [configData, setConfigData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [windowNumber, setWindowNumber] = useState("");

  useEffect(() => {
    fetchData(apiUrl, setConfigData);
    const intervalId = setInterval(() => {
      fetchData(apiUrl, setConfigData);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  const openModal = (value) => {
    setModalOpen(true);
    setWindowNumber(value);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchData(apiUrl, setConfigData);
  };

  return (
    <PageContent>
      <div className="house-container">
        <div className="window" id="window1">
          {state.isEditMode && state.isAdmin && (
            <button
              className={`add-room-btn ${
                state.isNight ? "night-add-room-btn" : "day-add-room-btn"
              }`}
              onClick={() => openModal(1)}
            >
              EDIT
            </button>
          )}
          {configData.lenght !== 0 &&
            configData
              .filter((item) => item.window === 1)
              .map((i) => <Room key={i.id} roomName={i.roomName}></Room>)}
        </div>
        <div className="window" id="window2">
          {state.isEditMode && state.isAdmin && (
            <button
              className={`add-room-btn ${
                state.isNight ? "night-add-room-btn" : "day-add-room-btn"
              }`}
              onClick={() => openModal(2)}
            >
              EDIT
            </button>
          )}
          {configData.lenght !== 0 &&
            configData
              .filter((item) => item.window === 2)
              .map((i) => <Room key={i.id} roomName={i.roomName}></Room>)}
        </div>
        <div className="window" id="window3">
          {state.isEditMode && state.isAdmin && (
            <button
              className={`add-room-btn ${
                state.isNight ? "night-add-room-btn" : "day-add-room-btn"
              }`}
              onClick={() => openModal(3)}
            >
              EDIT
            </button>
          )}
          {configData.lenght !== 0 &&
            configData
              .filter((item) => item.window === 3)
              .map((i) => <Room key={i.id} roomName={i.roomName}></Room>)}
        </div>
        <div className="window" id="window4">
          {state.isEditMode && state.isAdmin && (
            <button
              className={`add-room-btn ${
                state.isNight ? "night-add-room-btn" : "day-add-room-btn"
              }`}
              onClick={() => openModal(4)}
            >
              EDIT
            </button>
          )}
          {configData.lenght !== 0 &&
            configData
              .filter((item) => item.window === 4)
              .map((i) => <Room key={i.id} roomName={i.roomName}></Room>)}
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        windowNumber={windowNumber}
      ></EditModal>
    </PageContent>
  );
}

export const filterData = (data, selectedWindow) => {
  const filteredData = data.filter((item) => item.window === selectedWindow);
  return filteredData;
};

const fetchData = async (url, setConfigData) => {
  const response = await fetch(`${url}RoomConfig/GetConfig`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.data === null) {
    setConfigData([]);
  } else {
    setConfigData(JSON.parse(JSON.stringify(resData.data)));
  }
};

export default HomePage;
