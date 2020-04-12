import * as React from "react";
import { isMobile } from "react-device-detect";

import { StyleContext } from "../contexts/StyleContext";
import { TerminalContext } from "../contexts/TerminalContext";

export const useEditorInput = (
  consoleFocused: boolean,
  editorInput: string,
  setEditorInput: any,
  setProcessCurrentLine: any
) => {
  const { getPreviousCommand, getNextCommand } = React.useContext(TerminalContext);

  const handleKeyDownEvent = (event: any) => {
    if (!consoleFocused) {
      return;
    }

    event.preventDefault();

    const eventKey = event.key;

    if (eventKey === "Enter") {
      setProcessCurrentLine(true);
      return;
    }

    let nextInput = null;

    if (eventKey === "Backspace") {
      nextInput = editorInput.slice(0, -1);
    } else if (eventKey === "ArrowUp") {
      nextInput = getPreviousCommand();
    } else if (eventKey === "ArrowDown") {
      nextInput = getNextCommand();
    } else {
      nextInput = eventKey && eventKey.length === 1
          ? editorInput + eventKey
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

export const useBufferedContent = (
  processCurrentLine: any,
  setProcessCurrentLine: any,
  prompt: string,
  currentText: any,
  setCurrentText: any,
  commands: any,
  errorMessage: any
) => {
  const { bufferedContent, setBufferedContent } = React.useContext(TerminalContext);
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

export const useCurrentLine = (
  consoleFocused: boolean,
  prompt: string,
  commands: any,
  errorMessage: any
) => {
  const style = React.useContext(StyleContext);
  const { appendCommandToHistory } = React.useContext(TerminalContext);
  const mobileInputRef = React.useRef(null);
  const [editorInput, setEditorInput] = React.useState("");
  const [processCurrentLine, setProcessCurrentLine] = React.useState(false);

  React.useEffect(
    () => {
      if (!isMobile) {
        return;
      }

      if (consoleFocused) {
        mobileInputRef.current.focus();
      }
    },
    [consoleFocused]
  );

  React.useEffect(
    () => {
      if (!processCurrentLine) {
        return;
      }
      appendCommandToHistory(editorInput);
    },
    [processCurrentLine]
  );

  const mobileInput = isMobile ? (
    <div className={style.mobileInput}>
      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={editorInput}
        onChange={(event) => setEditorInput(event.target.value)}
        ref={mobileInputRef}
      />
    </div>
  ) : null;

  const currentLine = (
    <>
      {mobileInput}
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

  useEditorInput(
    consoleFocused,
    editorInput,
    setEditorInput,
    setProcessCurrentLine
  );

  useBufferedContent(
    processCurrentLine,
    setProcessCurrentLine,
    prompt,
    editorInput,
    setEditorInput,
    commands,
    errorMessage
  );

  return currentLine;
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
