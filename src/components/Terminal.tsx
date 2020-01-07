import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";
import { useClickOutsideEvent } from "../hooks/terminal";

import Controls from "./Controls";
import Editor from "./Editor";

export default function Terminal(props: any) {
  const wrapperRef = React.useRef(null);
  const [consoleFocused, setConsoleFocused] = React.useState(true);
  const style = React.useContext(StyleContext);

  useClickOutsideEvent(wrapperRef, setConsoleFocused);

  // Get all props destructively
  const {
    theme,
    showControlButtons,
    controlButtonLabels,
    prompt,
    commands,
    errorMessage
  } = props;

  return (
    <div
      ref={wrapperRef}
      id={style.terminalContainer}
      className={style[`theme--${theme}`]}
    >
      <div className={`${style.terminal}`}>
        <Controls
          consoleFocused={consoleFocused}
          showControlButtons={showControlButtons}
          controlButtonLabels={controlButtonLabels}
        />
        <Editor
          consoleFocused={consoleFocused}
          prompt={prompt}
          commands={commands}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

Terminal.defaultProps = {
  theme: "light",
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  errorMessage: "not found!",
};
