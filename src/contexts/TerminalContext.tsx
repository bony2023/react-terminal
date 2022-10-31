import * as React from "react";

export type TerminalShell = {
  bufferedContent: React.ReactNode,
  temporaryContent: React.ReactNode,
  setBufferedContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setTemporaryContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  appendCommandToHistory: (command: string) => void,
  getNextCommand: () => string,
  getPreviousCommand: () => string,
}

export const TerminalContext = React.createContext<TerminalShell>({
  bufferedContent: "",
  temporaryContent: "",
  setBufferedContent: (node: React.ReactNode | React.SetStateAction<React.ReactNode>) => {},
  setTemporaryContent: (node: React.ReactNode | React.SetStateAction<React.ReactNode>) => {},
  appendCommandToHistory: () => {},
  getNextCommand: () => "",
  getPreviousCommand: () => ""
});

export const TerminalContextProvider = (props: any) => {
  const { children } = props;
  const [bufferedContent, setBufferedContent] = React.useState("");
  const [temporaryContent, setTemporaryContent] = React.useState("");
  const [commandsHistory, setCommandsHistory] = React.useState([]);
  const [historyPointer, setHistoryPointer] = React.useState(null);

  React.useEffect(() => {
    setHistoryPointer(commandsHistory.length);
  }, [commandsHistory]);

  const appendCommandToHistory = (command: string) => {
    if (!command) {
      return;
    }

    setCommandsHistory(commandsHistory.concat(command));
  };

  const getPreviousCommand = () => {
    if (historyPointer === 0) {
      if (commandsHistory.length === 0) {
        return "";
      }

      return commandsHistory[0];
    }

    const command = commandsHistory[historyPointer - 1];
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
    }

    return command;
  };

  const getNextCommand = () => {
    if (historyPointer + 1 <= commandsHistory.length) {
      const command = commandsHistory[historyPointer + 1];
      setHistoryPointer(historyPointer + 1);
      return command;
    }

    return "";
  };

  return (
    <TerminalContext.Provider
      value={{
        bufferedContent,
        temporaryContent,
        setTemporaryContent,
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
