import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";
import { useCurrentLine } from "../hooks/editor";

export default function Editor(props: any) {
  const style = React.useContext(StyleContext);
  const { consoleFocused } = props;
  const currentLine = useCurrentLine(consoleFocused);

  return <div className={style.editor}>{currentLine}</div>;
}
