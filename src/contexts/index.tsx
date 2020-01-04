import * as React from "react";
import { StyleContextProvider } from "./StyleContext";

export default function ContextProvider(props: any) {
  const { children } = props;

  return <StyleContextProvider>{children}</StyleContextProvider>;
}
