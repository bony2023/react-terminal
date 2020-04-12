import * as React from "react";

export const TerminalContext = React.createContext(null);

export const TerminalContextProvider = (props: any) => {
  const { children } = props;
  const [bufferedContent, setBufferedContent] = React.useState("");
  const [commandsHistory, setCommandsHistory] = React.useState([]);
  const [historyPointer, setHistoryPointer] = React.useState(-1);

  const appendCommandToHistory = (command: string) => {
    if (!command) {
      return;
    }

    setHistoryPointer(commandsHistory.length);
    setCommandsHistory(commandsHistory.concat(command));
  };

  const getPreviousCommand = () => {
    if (historyPointer === -1) {
      return "";
    }

    const command = commandsHistory[historyPointer];
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
    }

    return command;
  };

  const getNextCommand = () => {
    if (historyPointer + 1 === commandsHistory.length) {
      return "";
    }

    const command = commandsHistory[historyPointer + 1];
    setHistoryPointer(historyPointer + 1);
    return command;
  };

  return (
    <TerminalContext.Provider
      value={{
        bufferedContent,
        setBufferedContent,
        appendCommandToHistory,
        getPreviousCommand,
        getNextCommand
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default {
  TerminalContext,
  TerminalContextProvider
};
