import * as React from "react";
import DisplayAmountForm from "./components/DisplayAmountForm.js";
import handleTransaction from "./components/handleTransaction.js";
import Card from "./components/SCard.js";
import { useEffect } from "react";
import axios from "axios";
import DisplayAccountSelection from "./components/DisplayAccountSelection.js";

export default function Transfer() {
  const [balance, setBalance] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [emailRecipient, setEmailRecipient] = React.useState("");
  const [accountRecipient, setAccountRecipient] = React.useState("");

  useEffect(() => {
    if (email !== "" && account !== "") {
      var url = `http://localhost:3001/get-balance/${email}/${Date.now()}/${account}`;
      axios.get(url).then((res) => {
        let localBalance = res.data.balance
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setBalance(localBalance);
      });
    } else {
      setBalance(0);
    }

    /*
    if (emailRecipient !== "") {
      axios.get(`http://localhost:3001/get-users/${email}`).then((res) => {
        removeOptions("recipientUserSelect");
        addOption("recipientUserSelect", "");
        options = res.data.trans;
        for (let i = 0; i < options.length; i++) {
          addOption("recipientUserSelect", options[i].name);
        }
      });
    }
		*/
  }, [account, email]);

  return (
    <>
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          <>
            <DisplayAccountSelection
              setEmail={setEmail}
              onChangeAction={(e) => setAccount(e.target.value)}
              displayUser={false}
              type="email"
              setAccount={setAccount}
            />
            <DisplayAmountForm
              balance={balance}
              type="Transfer"
              amount={amount}
              setAmount={setAmount}
              handleOnclick={() =>
                handleTransaction(
                  "Transfer",
                  email,
                  account,
                  setAmount,
                  balance,
                  setBalance,
                  emailRecipient,
                  accountRecipient,
                  setStatus
                )
              }
              select={
                <>
                  <DisplayAccountSelection
                    setEmail={setEmailRecipient}
                    onChangeAction={(e) => setAccountRecipient(e.target.value)}
                    displayUser={true}
                    type="recipient"
                    setAccount={setAccountRecipient}
                  />
                  <br />
                </>
              }
            />
          </>
        }
      />
    </>
  );
}
