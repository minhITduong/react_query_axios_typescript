import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import Tutorial from "./types/Tutorial";
import TutorialService from "./services/TutorialService";

function App() {
  return (
    <div className="App">
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
