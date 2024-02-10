import { getAuthToken, getUsernameFromToken } from "./auth";

/* START OF ACCOUNT API CALLS SECTION */

export const getAccountsAsync = async (url, dispatch) => {
  const response = await fetch(`${url}Auth/GetUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.data === null) {
    dispatch({
      type: "UPDATE_ACCOUNT_DATA",
      payload: JSON.parse(JSON.stringify([])),
    });
  } else {
    const updatedAccounts = resData.data.filter(
      (i) => i.username !== getUsernameFromToken()
    );
    dispatch({
      type: "UPDATE_ACCOUNT_DATA",
      payload: JSON.parse(JSON.stringify(updatedAccounts)),
    });
  }
};

export const getUserProfileAsync = async (url, dispatch) => {
  const response = await fetch(`${url}Auth/GetProfileInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.data === null) {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: JSON.parse(JSON.stringify({})),
    });
  } else {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
  }
};

export const createUserAsync = async (
  username,
  password,
  type,
  url,
  setMessageErr,
  setMessageSuccess,
  dispatch,
  state
) => {
  const userData = {
    username: username,
    password: password,
    userType: type,
  };
  const response = await fetch(`${url}Auth/AddUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    const updatedAccounts = state.accountData.concat({
      username: username,
      password: password,
      role: type,
    });
    dispatch({
      type: "UPDATE_ACCOUNT_DATA",
      payload: JSON.parse(JSON.stringify(updatedAccounts)),
    });
    setMessageErr("");
    setMessageSuccess(resData.message);
  } else if (resData.errors !== undefined) {
    setMessageErr("Password must have 6 characters minimum.");
    setMessageSuccess("");
  } else {
    setMessageErr(resData.message);
    setMessageSuccess("");
  }
};

export const deleteUserAsync = async (username, url, dispatch, state) => {
  const response = await fetch(`${url}Auth/DeleteUser?username=` + username, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.success) {
    const updatedAccounts = state.accountData.filter(
      (i) => i.username !== username
    );
    dispatch({
      type: "UPDATE_ACCOUNT_DATA",
      payload: JSON.parse(JSON.stringify(updatedAccounts)),
    });
  }
};

export const changePasswordAsync = async (
  username,
  password,
  url,
  setMessage
) => {
  const userData = {
    username: username,
    newPassword: password,
  };
  const response = await fetch(`${url}Auth/ChangePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    setMessage(resData.message);
  }
};

export const updateProfileAsync = async (
  email,
  fullName,
  url,
  setMessage,
  setMessageErr,
  dispatch
) => {
  const userData = {
    email: email,
    fullName: fullName,
  };
  const response = await fetch(`${url}Auth/UpdateProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
    setMessage(resData.message);
  } else {
    setMessageErr(resData.message);
  }
};

export const changeUserPasswordAsync = async (
  username,
  oldPassword,
  newPassword,
  url,
  setMessageSuccess,
  setMessageError
) => {
  const userData = {
    username: username,
    newPassword: newPassword,
    oldPassword: oldPassword,
  };
  const response = await fetch(`${url}Auth/ResetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    setMessageSuccess(resData.message);
    localStorage.setItem("token", resData.data);
  } else if (resData.errors !== undefined) {
    setMessageError("Password must have 6 characters minimum.");
    setMessageSuccess("");
  } else {
    setMessageError(resData.message);
  }
};

export const updateEnableNotificationsAsync = async (
  url,
  enableNotifications,
  setMessage,
  setMessageErr,
  dispatch
) => {
  const response = await fetch(
    `${url}Auth/UpdateEnableNotifications?enableNotifications=` +
      enableNotifications,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
    setMessage(resData.message);
  } else {
    setMessageErr(resData.message);
  }
};

export const changeTypeAsync = async (username, role, url, setMessage) => {
  const userData = {
    username: username,
    role: parseInt(role),
  };
  const response = await fetch(`${url}Auth/ChangeRole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  if (resData.success) {
    setMessage(resData.message);
  }
};

/* START OF USER NOTIFICATION SETTINGS API CALLS SECTION */

export const SetNotificationSettingsAsync = async (
  url,
  userEmail,
  frequency,
  userId,
  roomNames,
  setMessage,
  setMessageErr,
  dispatch
) => {
  const notificationSettings = {
    userEmail: userEmail,
    frequency: frequency,
    userId: userId,
    roomNames: roomNames,
  };
  const response = await fetch(
    `${url}NotificationSettings/AddNotificationSettings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
      body: JSON.stringify(notificationSettings),
    }
  );
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
    setMessage(resData.message);
  } else {
    setMessageErr(resData.message);
  }
};

/* START OF ROOM CONFIG API CALLS SECTION */

export const getRoomConfigDataAsync = async (url, dispatch) => {
  const response = await fetch(`${url}RoomConfig/GetConfig`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.data === null) {
    dispatch({ type: "UPDATE_ROOM_CONFIG", payload: [] });
  } else {
    dispatch({
      type: "UPDATE_ROOM_CONFIG",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
  }
};

export const getRoomsFromWindowAsync = async (url, windowNumber, dispatch) => {
  dispatch({ type: "UPDATE_ROOM_DATA", payload: [] });
  const response = await fetch(
    `${url}RoomConfig/GetRoomsFromWindow?window=` + windowNumber,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  const resData = await response.json();
  if (resData.data === null) {
    dispatch({ type: "UPDATE_ROOM_DATA", payload: [] });
  } else {
    dispatch({
      type: "UPDATE_ROOM_DATA",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
  }
};

export const addRoomAsync = async (window, roomFromInput, url, dispatch) => {
  const roomData = {
    window: window,
    roomName: roomFromInput,
  };
  const response = await fetch(`${url}RoomConfig/AddRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(roomData),
  });
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_ROOM_DATA",
      payload: resData.data,
    });
  }
};

export const deleteRoomAsync = async (id, url, dispatch) => {
  const response = await fetch(`${url}RoomConfig/DeleteRoom?roomId=` + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  dispatch({
    type: "UPDATE_ROOM_DATA",
    payload: JSON.parse(JSON.stringify(resData.data)),
  });
};

export const renameRoomAsync = async (
  id,
  roomFromInput,
  url,
  state,
  dispatch
) => {
  const roomData = {
    id: id,
    name: roomFromInput,
  };
  const response = await fetch(`${url}RoomConfig/RenameRoom`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(roomData),
  });
  const resData = await response.json();
  if (resData.success) {
    const updatedState = state.roomData.map((i) => {
      if (i.id === id) {
        i.roomName = resData.data.roomName;
      }
      return i;
    });
    dispatch({
      type: "UPDATE_ROOM_DATA",
      payload: updatedState,
    });
  }
};

/* END OF ROOM CONFIG API CALLS SECTION */

/* START OF TEMPERATURE & HUMIDITY API CALLS SECTION */

export const getThCurrentDataAsync = async (roomName, setTemp, setHum, url) => {
  const time = new Date();
  const convertedTime =
    time.toLocaleDateString() +
    " " +
    time.toLocaleTimeString(undefined, { hour12: false });
  const response = await fetch(
    `${url}TempAndHum/GetCurrentData?currenttime=` +
      convertedTime.slice(0, 19).replace("T", " ") +
      "&room=" +
      roomName,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  const resData = await response.json();
  if (resData.data === null) {
    setTemp("NA");
    setHum("NA");
  } else {
    setTemp(Math.floor(resData.data.temperature) + "°C");
    setHum(Math.floor(resData.data.humidity) + "%");
  }
};

export const getThCurrentAsync = async (roomName, setTemp, setHum, url) => {
  const time = new Date();
  const convertedTime =
    time.toLocaleDateString() +
    " " +
    time.toLocaleTimeString(undefined, { hour12: false });
  const response = await fetch(
    `${url}TempAndHum/GetCurrentData?currenttime=` +
      convertedTime.slice(0, 19).replace("T", " ") +
      "&room=" +
      roomName,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  const resData = await response.json();
  if (resData.data === null) {
    setTemp("NA");
    setHum("NA");
  } else {
    setTemp(resData.data.temperature + "°C");
    setHum(resData.data.humidity + "%");
  }
};

export const getThByIntervalAsync = async (
  room,
  apiUrl,
  timeRange,
  setData
) => {
  const start = new Date();
  const end = new Date(start.getTime() - timeRange);
  const convertedEnd =
    end.toLocaleDateString() +
    " " +
    end.toLocaleTimeString(undefined, { hour12: false });
  const convertedStart =
    start.toLocaleDateString() +
    " " +
    start.toLocaleTimeString(undefined, { hour12: false });

  try {
    const response = await fetch(
      `${apiUrl}TempAndHum/GetByDate?timeStart=` +
        convertedEnd.slice(0, 19).replace("T", " ") +
        "&timeEnd=" +
        convertedStart.slice(0, 19).replace("T", " ") +
        "&room=" +
        room,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
      }
    );
    const resData = await response.json();
    if (resData.data === null) {
      setData([]);
    } else {
      setData(JSON.parse(JSON.stringify(resData.data)));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getThByIntervalCustomAsync = async (
  room,
  apiUrl,
  from,
  to,
  setData
) => {
  const start = new Date(to.getTime());
  const end = new Date(from.getTime());
  const convertedEnd =
    end.toLocaleDateString() +
    " " +
    end.toLocaleTimeString(undefined, { hour12: false });
  const convertedStart =
    start.toLocaleDateString() +
    " " +
    start.toLocaleTimeString(undefined, { hour12: false });
  try {
    const response = await fetch(
      `${apiUrl}TempAndHum/GetByDate?timeStart=` +
        convertedEnd.slice(0, 19).replace("T", " ") +
        "&timeEnd=" +
        convertedStart.slice(0, 19).replace("T", " ") +
        "&room=" +
        room,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
      }
    );
    const resData = await response.json();
    if (resData.data === null) {
      setData([]);
    } else {
      setData(JSON.parse(JSON.stringify(resData.data)));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/* END OF TEMPERATURE & HUMIDITY API CALLS SECTION */

/* START OF SMTP SETTINGS API CALLS SECTION */

export const saveSmtpSettingsAsync = async (
  smtpSettings,
  url,
  setMessage,
  setMessageErr,
  dispatch
) => {
  const response = await fetch(`${url}Email/SaveSmtpSettings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(smtpSettings),
  });
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_SMTP_SETTINGS",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
    setMessage(resData.message);
  } else {
    dispatch({
      type: "UPDATE_SMTP_SETTINGS",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
    setMessageErr(resData.message);
  }
};

export const getSmtpSettingsAsync = async (url, dispatch) => {
  const response = await fetch(`${url}Email/GetSmtpSettings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  const resData = await response.json();
  if (resData.success) {
    dispatch({
      type: "UPDATE_SMTP_SETTINGS",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
  } else {
    dispatch({
      type: "UPDATE_SMTP_SETTINGS",
      payload: JSON.parse(JSON.stringify(resData.data)),
    });
  }
};

export const sendTestEmailAsync = async (
  recipient,
  url,
  setMessage,
  setMessageErr
) => {
  const response = await fetch(`${url}Email/SendTestEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify({ recipient: recipient }),
  });
  const resData = await response.json();
  if (resData.success) {
    setMessage(resData.message);
  } else {
    setMessageErr(resData.message);
  }
};

/* END OF SMTP SETTINGS API CALLS SECTION */

/* START OF HISTORY API CALLS SECTION */

export const getHistoryAsync = async (url, setHistoryData, setMessage) => {
  const response = await fetch(
    `${url}History/GetHistory`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  const resData = await response.json();
  if (resData.data === null) {
    setHistoryData([]);
    setMessage("There is no data in history.")  
  } else {
    setHistoryData(resData.data);
    setMessage("");
  }
};
