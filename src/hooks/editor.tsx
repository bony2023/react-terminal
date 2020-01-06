import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";

export const useEditorInput = (
  consoleFocused: boolean,
  editorInput: string,
  setEditorInput: any,
  setProcessCurrentLine: any
) => {
  const handleKeyDownEvent = (event: any) => {
    if (!consoleFocused) {
      return;
    }

    if (event.key === "Enter") {
      setProcessCurrentLine(true);
      return;
    }

    let nextInput = null;

    if (event.key === "Backspace") {
      nextInput = editorInput.slice(0, -1);
    } else {
      nextInput =
        event.key && event.key.length === 1
          ? editorInput + event.key
          : editorInput;
    }

    setEditorInput(nextInput);
    setProcessCurrentLine(false);
  };

  React.useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  });
};

export const useCurrentLine = (consoleFocused: boolean, prompt: string) => {
  const style = React.useContext(StyleContext);
  const [editorInput, setEditorInput] = React.useState("");
  const [processCurrentLine, setProcessCurrentLine] = React.useState(false);

  useEditorInput(
    consoleFocused,
    editorInput,
    setEditorInput,
    setProcessCurrentLine
  );

  const currentLine = (
    <>
      <span className={style.prompt}>{prompt}</span>
      <div className={style.lineText}>
        {editorInput}
        {consoleFocused ? (
          <span className={style.caret}>
            <span className={style.caretAfter} />
          </span>
        ) : null}
      </div>
    </>
  );

  return [
    currentLine,
    editorInput,
    setEditorInput,
    processCurrentLine,
    setProcessCurrentLine
  ];
};

export const useBufferedContent = (
  processCurrentLine: any,
  setProcessCurrentLine: any,
  prompt: string,
  currentText: any,
  setCurrentText: any,
  bufferedContent: any,
  setBufferedContent: any,
  commands: any,
  defaultErrorMessage: any
) => {
  const style = React.useContext(StyleContext);

  React.useEffect(
    () => {
      if (!processCurrentLine) {
        return;
      }

      const command = commands[currentText];
      // eslint-disable-next-line no-nested-ternary
      const output = currentText
        ? command
          ? typeof command === "function"
            ? command()
            : command
          : typeof defaultErrorMessage === "function"
            ? defaultErrorMessage()
            : defaultErrorMessage
        : "";

      const nextBufferedContent = (
        <>
          {bufferedContent}
          <span className={style.prompt}>{prompt}</span>
          <span className={style.lineText}>{currentText}</span>
          {output ? (
            <span>
              <br />
              {output}
            </span>
          ) : null}
          <br />
        </>
      );

      setBufferedContent(nextBufferedContent);
      setProcessCurrentLine(false);
      setCurrentText("");
    },
    [processCurrentLine]
  );
};

export const useScrollToBottom = (bufferedContent: any, wrapperRef: any) => {
  React.useEffect(
    () => {
      // eslint-disable-next-line no-param-reassign
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    },
    [bufferedContent]
  );
};
