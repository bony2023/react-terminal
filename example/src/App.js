import * as React from "react";
import "./App.css";
import { TerminalContextProvider } from "react-terminal";
import Terminal from "./Terminal";

const App = () => {
  return (
    <div className="App">
      <TerminalContextProvider>
        <Terminal/>
      </TerminalContextProvider>
    </div>
  );
}

export default App;
