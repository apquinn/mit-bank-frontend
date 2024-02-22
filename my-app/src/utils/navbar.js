import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavbarItem from "../components/NavbarItem.js";
import { handleLogout } from "./endpoints/auth.js";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  if (window.history) {
    window.addEventListener("hashchange", myFunction);
  }

  let token = localStorage.getItem("token");
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      document.getElementById("logout-button").style.display = "inline";
      document.getElementById("li-deposit").style.display = "inline";
      document.getElementById("li-withdrawl").style.display = "inline";
      document.getElementById("li-transfer").style.display = "inline";
      document.getElementById("li-alldata").style.display = "inline";
    } else {
      document.getElementById("logout-button").style.display = "none";
      document.getElementById("li-deposit").style.display = "none";
      document.getElementById("li-withdrawl").style.display = "none";
      document.getElementById("li-transfer").style.display = "none";
      document.getElementById("li-alldata").style.display = "none";
    }
  }, [token]);

  function myFunction() {
    document.getElementById("createaccount").classList.remove("active");
    document.getElementById("login").classList.remove("active");
    document.getElementById("deposit").classList.remove("active");
    document.getElementById("withdrawl").classList.remove("active");
    document.getElementById("transfer").classList.remove("active");
    document.getElementById("alldata").classList.remove("active");
    if (window.location.hash === "#/createaccount/")
      document.getElementById("createaccount").classList.add("active");
    else if (window.location.hash === "#/login/")
      document.getElementById("login").classList.add("active");
    else if (window.location.hash === "#/deposit/")
      document.getElementById("deposit").classList.add("active");
    else if (window.location.hash === "#/withdrawl/")
      document.getElementById("withdrawl").classList.add("active");
    else if (window.location.hash === "#/transfer/")
      document.getElementById("transfer").classList.add("active");
    else if (window.location.hash === "#/alldata/")
      document.getElementById("alldata").classList.add("active");
  }

  const handleLogoutLocal = async () => {
    handleLogout(localStorage.getItem("email"));
  };

  let email = "";
  if (localStorage.getItem("token")) {
    const decoded = jwtDecode(localStorage.getItem("token"));
    email = decoded.email;
  } else {
    email = "";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-tabs">
            <NavbarItem
              message="Use this page to create new accounts at the bank"
              link="createaccount"
              title="Create Account"
            />
            <NavbarItem
              message="Use this page to login to your bank account"
              link="login"
              title="Login"
            />
            <NavbarItem
              message="Use this page to make a deposit into your account. You must be logged in to make a deposit."
              link="deposit"
              title="Deposit"
            />
            <NavbarItem
              message="Use this page to make a withdrawl from your account. You must be logged in to make a withdrawl."
              link="withdrawl"
              title="Withdraw"
            />
            <NavbarItem
              message="Use this page to transfer money to another user."
              link="transfer"
              title="Transfer"
            />
            <NavbarItem
              message="This page will display all the data for users and accounts"
              link="alldata"
              title="View All Data"
            />
          </ul>
        </div>
        <div
          className="navbar-text"
          style={{ float: "right", display: "inline-block" }}
        >
          <a href="/#/profile">
            <span id="account-name">{email}</span>
          </a>{" "}
          &nbsp; &nbsp;{" "}
          <a href="/#/login/" id="logout-button" onClick={handleLogoutLocal}>
            logout
          </a>
          &nbsp; &nbsp;
        </div>
      </nav>
    </>
  );
}