import * as React from "react";
import defaultThemes from "../themes";

export const ThemeContext = React.createContext(null);

export const ThemeContextProvider = (props: any) => {
  const { children } = props;
  const themes = {...defaultThemes, ...(children.props.themes || {})};
  const currentTheme = themes[children.props.theme] || themes["light"];

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default {
  ThemeContext,
  ThemeContextProvider
};
