import React, { useState, useEffect, useContext } from "react";
import AccountForm from "./AccountForm";
import "./AccountPanel.css";
import AccountItem from "./AccountItem";
import { getAuthToken, getUsernameFromToken } from "../util/auth";
import { Ctx } from "../util/reducer";

const AccountPanel = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [addAccount, setAddAccount] = useState(false);
  const { state, dispatch } = useContext(Ctx);
  useEffect(() => {
    getAccountsAsync(apiUrl, dispatch);
    const intervalId = setInterval(() => {
      getAccountsAsync(apiUrl, dispatch);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [apiUrl, dispatch]);

  const onAddAccountForm = () => {
    setAddAccount(!addAccount);
  };
  return (
    <div className="account-panel-container">
      <div className="center-items">
        {state.accountData.length === 0 && (
          <div className="account-panel-paragraph">
            No additional accounts exist, except for this one. To create a new
            account, click the button below.
          </div>
        )}
      </div>
      {state.accountData.map((i) => {
        return <AccountItem data={i}></AccountItem>;
      })}
      {addAccount && <AccountForm></AccountForm>}
      <div className="center-items">
        {addAccount ? (
          <button
            className="button-cancel-add-account"
            onClick={onAddAccountForm}
          >
            Cancel
          </button>
        ) : (
          <button className="button-add-account" onClick={onAddAccountForm}>
            Add New Account
          </button>
        )}
      </div>
    </div>
  );
};

const getAccountsAsync = async (url, dispatch) => {
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

export default AccountPanel;
