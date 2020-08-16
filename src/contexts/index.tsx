import * as React from "react";
import { StyleContextProvider } from "./StyleContext";
import { ThemeContextProvider } from "./ThemeContext";

export default function ContextProvider(props: any) {
  const { children } = props;

  return (
    <StyleContextProvider>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </StyleContextProvider>
  );
}
