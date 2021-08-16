import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { TerminalContext } from "../contexts/TerminalContext";
import {
  useCurrentLine,
  useScrollToBottom,
} from "../hooks/editor";

export default function Editor(props: any) {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);
  const { bufferedContent } = React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    enableInput,
    caret,
    consoleFocused,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    curvedTop
  } = props;

  const currentLine = useCurrentLine(
    caret,
    consoleFocused,
    prompt,
    commands,
    errorMessage, 
    enableInput
  );

  return (
    <div ref={wrapperRef} className={`${style.editor} ${curvedTop ? style.curvedTop : null}`} style={{ background: themeStyles.themeBGColor }}>
      {welcomeMessage}
      {bufferedContent}
      {currentLine}
    </div>
  );
}
