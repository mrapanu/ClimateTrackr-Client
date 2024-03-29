import React, { useContext, useState, useEffect } from "react";
import { Ctx } from "../util/reducer";
import { getUserProfileAsync, getRoomConfigDataAsync } from "../util/api";
import HomeRoomItem from "../components/Items/HomeRoomItem";
import WindowEditModal from "../components/Modals/WindowEditModal";
import PageContent from "../layout/PageContent";
import "./Home.css";

function HomePage() {
  const { state, dispatch } = useContext(Ctx);
  const [isModalOpen, setModalOpen] = useState(false);
  const [windowNumber, setWindowNumber] = useState("");

  useEffect(() => {
    getRoomConfigDataAsync(state.url, dispatch);
    getUserProfileAsync(state.url, dispatch);
    const intervalId = setInterval(() => {
      getRoomConfigDataAsync(state.url, dispatch);
      getUserProfileAsync(state.url, dispatch);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [state.url, dispatch]);

  const openModal = (value) => {
    setModalOpen(true);
    setWindowNumber(value);
  };

  const closeModal = () => {
    setModalOpen(false);
    getRoomConfigDataAsync(state.url, dispatch);
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
          {state.configData.filter((item) => item.window === 1).length !== 0 ? (
            state.configData
              .filter((item) => item.window === 1)
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))
          ) : (
            <HomeRoomItem roomName="No room present."></HomeRoomItem>
          )}
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
          {state.configData.filter((item) => item.window === 2).length !== 0 ? (
            state.configData
              .filter((item) => item.window === 2)
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))
          ) : (
            <HomeRoomItem roomName="No room present."></HomeRoomItem>
          )}
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

          {state.configData.filter((item) => item.window === 3).length !== 0 ? (
            state.configData
              .filter((item) => item.window === 3)
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))
          ) : (
            <HomeRoomItem roomName="No room present."></HomeRoomItem>
          )}
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
          {state.configData.filter((item) => item.window === 4).length !== 0 ? (
            state.configData
              .filter((item) => item.window === 4)
              .map((i) => (
                <HomeRoomItem key={i.id} roomName={i.roomName}></HomeRoomItem>
              ))
          ) : (
            <HomeRoomItem roomName="No room present."></HomeRoomItem>
          )}
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

export default HomePage;
