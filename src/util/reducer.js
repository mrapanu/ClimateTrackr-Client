import React, { createContext, useReducer } from "react";

export const Ctx = createContext();

const initialState = {
  isEditMode: false,
  isNight: false,
  isAdmin: false,
  roomData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT":
      return { ...state, isEditMode: !state.isEditMode };
    case "ISNIGHT":
      return { ...state, isNight: action.payload };
    case "ISADMIN":
      return { ...state, isAdmin: action.payload };
    case "LOGOUT":
      return initialState;
    case "UPDATE_ROOM_DATA":
      return { ...state, roomData: action.payload };
    default:
      return state;
  }
};

const CtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
};

export default CtxProvider;
