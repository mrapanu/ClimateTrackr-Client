import React, { useContext, useState, useEffect } from "react";
import { Ctx } from "../util/reducer";
import { getAuthToken } from "../util/auth";
import HomeRoomItem from "../components/Items/HomeRoomItem";
import WindowEditModal from "../components/Modals/WindowEditModal";
import PageContent from "../layout/PageContent";
import "./Home.css";

function HomePage() {
  const { state } = useContext(Ctx);
  const [configData, setConfigData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [windowNumber, setWindowNumber] = useState("");

  useEffect(() => {
    fetchData(state.url, setConfigData);
    const intervalId = setInterval(() => {
      fetchData(state.url, setConfigData);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [state.url]);

  const openModal = (value) => {
    setModalOpen(true);
    setWindowNumber(value);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchData(state.url, setConfigData);
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
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))}
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
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))}
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
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))}
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
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))}
        </div>
      </div>
      <WindowEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        windowNumber={windowNumber}
      ></WindowEditModal>
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
