import * as React from "react";

export const TerminalContext = React.createContext(null);

export const TerminalContextProvider = (props: any) => {
  const { children } = props;
  const [bufferedContent, setBufferedContent] = React.useState("");

  return (
    <TerminalContext.Provider value={[bufferedContent, setBufferedContent]}>
      {children}
    </TerminalContext.Provider>
  );
};

export default {
  TerminalContext,
  TerminalContextProvider
};
