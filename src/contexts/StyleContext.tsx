import * as React from "react";
import * as style from "../index.scss";

export const styles = style.default;
export const StyleContext = React.createContext(null);

export const StyleContextProvider = (props: any) => {
  const { children } = props;

  return (
    <StyleContext.Provider value={styles}>{children}</StyleContext.Provider>
  );
};

export default {
  StyleContext,
  StyleContextProvider
};
