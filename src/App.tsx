/*
 * @Author: kingford
 * @Date: 2021-10-22 09:16:53
 * @LastEditTime: 2021-10-25 20:35:33
 */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "@/pages/login";

function App() {
  return (
    <div className="App">
      <Login></Login>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
