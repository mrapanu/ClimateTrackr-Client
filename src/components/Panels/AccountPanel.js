import React, { useState, useEffect, useContext } from "react";
import { Ctx } from "../../util/reducer";
import { getAccountsAsync } from "../../util/api";
import AddAccountForm from "../Forms/AddAccountForm";
import AccountItem from "../Items/AccountItem";
import "./AccountPanel.css";

const AccountPanel = () => {
  const [addAccount, setAddAccount] = useState(false);
  const { state, dispatch } = useContext(Ctx);
  useEffect(() => {
    getAccountsAsync(state.url, dispatch);
    const intervalId = setInterval(() => {
      getAccountsAsync(state.url, dispatch);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [state.url, dispatch]);

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
        return <AccountItem key={i.id} data={i}></AccountItem>;
      })}
      {addAccount && <AddAccountForm></AddAccountForm>}
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

export default AccountPanel;
