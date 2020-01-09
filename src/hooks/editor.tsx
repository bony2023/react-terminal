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

    event.preventDefault();

    if (event.key === "Enter") {
      setProcessCurrentLine(true);
      return;
    }

    let nextInput = null;

    if (event.key === "Backspace") {
      nextInput = editorInput.slice(0, -1);
    } else {
      nextInput = event.key && event.key.length === 1
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
        <span className={style.preWhiteSpace}>{editorInput}</span>
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
  errorMessage: any
) => {
  const style = React.useContext(StyleContext);

  React.useEffect(
    () => {
      if (!processCurrentLine) {
        return;
      }

      const [command, ...rest] = currentText.trim().split(" ");
      let output = "";

      if (currentText) {
        const commandArguments = rest.join(" ");

        if (command && commands[command]) {
          const executor = commands[command];

          if (typeof executor === "function") {
            output = executor(commandArguments);
          } else {
            output = executor;
          }
        } else if (typeof errorMessage === "function") {
          output = errorMessage(commandArguments);
        } else {
          output = errorMessage;
        }
      }

      const nextBufferedContent = (
        <>
          {bufferedContent}
          <span className={style.prompt}>{prompt}</span>
          <span className={`${style.lineText} ${style.preWhiteSpace}`}>{currentText}</span>
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

export const useScrollToBottom = (changesToWatch: any, wrapperRef: any) => {
  React.useEffect(
    () => {
      // eslint-disable-next-line no-param-reassign
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    },
    [changesToWatch]
  );
};
