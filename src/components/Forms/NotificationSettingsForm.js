import React, { useContext, useState } from "react";
import { Ctx } from "../../util/reducer";
import "./NotificationSettingsForm.css";
import { updateEnableNotificationsAsync } from "../../util/api";
import SelectNotificationFrequency from "./SelectNotificationFrequency";

const NotificationSettingsForm = () => {
  const { state, dispatch } = useContext(Ctx);
  const [message, setMessage] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  console.log(selectedRooms);

  const getAvailableRooms = () => {
    return state.configData.filter(
      (room) =>
        !selectedRooms.find(
          (selectedRoom) => selectedRoom.roomConfigId === room.id
        )
    );
  };

  const addRoomToSelected = (roomName, roomConfigId) => {
    setSelectedRooms((prevSelectedRooms) => [
      ...prevSelectedRooms,
      { roomConfigId: roomConfigId, roomName: roomName },
    ]);
  };

  const removeRoomFromSelected = (roomConfigId) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.filter((room) => room.roomConfigId !== roomConfigId)
    );
  };

  const handleEnableNotifications = () => {
    updateEnableNotificationsAsync(
      state.url,
      true,
      setMessage,
      setMessageErr,
      dispatch
    );
    const timeoutId = setTimeout(() => {
      setMessageErr("");
      setMessage("");
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      <div className="enable-notification-description">
        Stay informed with personalized email updates for daily, weekly and
        monthly temperature/humidity reports for your selected rooms. Note: You
        need to assing an email to this account in order to receive these
        reports. Change your settings as you wish!
      </div>
      {!state.userProfile.enableNotifications && (
        <div className="buttons-notification-settings-container">
          <button
            className="button-enable-notifications"
            onClick={handleEnableNotifications}
          >
            Enable Notifications
          </button>
        </div>
      )}
      {messageErr !== "" && (
        <div className="enable-notifications-error">{messageErr}</div>
      )}
      {message !== "" && (
        <div className="enable-notifications-success">{message}</div>
      )}
      {state.userProfile.enableNotifications && (
        <div className="notification-settings-row-container">
          <div className="notification-settings-container">
            <div className="notification-settings-title">
              NOTIFICATION SETTINGS
            </div>
            <div className="notification-settings-row-section">
              <div className="notification-settings-label">
                Notification Frequency:
              </div>
              <div className="notification-settings-freq-options">
                <SelectNotificationFrequency></SelectNotificationFrequency>
              </div>
            </div>
            <div className="notification-settings-column-section">
              <div className="notification-settings-row-section">
                <div className="notification-settings-rooms-column-container">
                  <div className="notification-settings-rooms-title">
                    Available Rooms
                  </div>
                  {state.configData.lenght !== 0 &&
                    getAvailableRooms().map((i) => (
                      <div
                        className="notification-settings-room"
                        onClick={() => addRoomToSelected(i.roomName, i.id)}
                      >
                        {i.roomName}
                      </div>
                    ))}
                </div>
                <div className="notification-settings-rooms-column-container">
                  <div className="notification-settings-rooms-title">
                    Selected Rooms
                  </div>
                  {selectedRooms.lenght !== 0 &&
                    selectedRooms.map((i) => (
                      <div
                        className="notification-settings-room"
                        onClick={() => removeRoomFromSelected(i.roomConfigId)}
                      >
                        {i.roomName}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="notification-settings-buttons-container">
              <button className="button-save-notifications">Save Settings</button>
              <button className="button-disable-notifications">
                Disable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const filterData = (data, selectedWindow) => {
  const filteredData = data.filter((item) => item.window === selectedWindow);
  return filteredData;
};

export default NotificationSettingsForm;
