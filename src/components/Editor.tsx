import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { TerminalContext } from "../contexts/TerminalContext";
import {
  useCurrentLine,
  useScrollToBottom,
} from "../hooks/editor";

export default function Editor(props: any) {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const { bufferedContent } = React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    consoleFocused,
    prompt,
    commands,
    welcomeMessage,
    errorMessage
  } = props;

  const currentLine = useCurrentLine(
    consoleFocused,
    prompt,
    commands,
    errorMessage
  );

  return (
    <div ref={wrapperRef} className={style.editor}>
      {welcomeMessage}
      {bufferedContent}
      {currentLine}
    </div>
  );
}
