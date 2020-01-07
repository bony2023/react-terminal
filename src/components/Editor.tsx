import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";
import {
  useCurrentLine,
  useBufferedContent,
  useScrollToBottom
} from "../hooks/editor";

export default function Editor(props: any) {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const [bufferedContent, setBufferedContent] = React.useState("");

  const {
    consoleFocused,
    prompt,
    commands,
    errorMessage
  } = props;

  const [
    currentLine,
    currentText,
    setCurrentText,
    processCurrentLine,
    setProcessCurrentLine
  ] = useCurrentLine(consoleFocused, prompt);

  useBufferedContent(
    processCurrentLine,
    setProcessCurrentLine,
    prompt,
    currentText,
    setCurrentText,
    bufferedContent,
    setBufferedContent,
    commands,
    errorMessage
  );

  useScrollToBottom(bufferedContent, wrapperRef);

  return (
    <div ref={wrapperRef} className={style.editor}>
      {bufferedContent}
      {currentLine}
    </div>
  );
}

Editor.defaultProps = {
  prompt: ">>>"
};
