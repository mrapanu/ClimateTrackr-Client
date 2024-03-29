import React, { createContext, useReducer } from "react";

export const Ctx = createContext();

const initialState = {
  url: process.env.REACT_APP_API_URL,
  isEditMode: false,
  isNight: false,
  isLoggedIn: false,
  isAdmin: false,
  configData: [],
  roomData: [],
  accountData: [],
  userProfile: {},
  smtpSettings: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT":
      return { ...state, isEditMode: !state.isEditMode };
    case "ISNIGHT":
      return { ...state, isNight: action.payload };
    case "ISADMIN":
      return { ...state, isAdmin: action.payload };
    case "ISLOGGEDIN":
      return { ...state, isLoggedIn: action.payload };
    case "LOGOUT":
      return initialState;
    case "UPDATE_ROOM_CONFIG":
      return { ...state, configData: action.payload };
    case "UPDATE_ROOM_DATA":
      return { ...state, roomData: action.payload };
    case "UPDATE_ACCOUNT_DATA":
      return { ...state, accountData: action.payload };
    case "UPDATE_USER_PROFILE":
      return { ...state, userProfile: action.payload };
    case "UPDATE_SMTP_SETTINGS":
      return { ...state, smtpSettings: action.payload };
    default:
      return state;
  }
};

const CtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
};

export default CtxProvider;
