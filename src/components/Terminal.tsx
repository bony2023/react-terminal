import * as React from "react";
import PropTypes from "prop-types";
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
    welcomeMessage,
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
          welcomeMessage={welcomeMessage}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

Terminal.propTypes = {
  theme: PropTypes.string,
  showControlButtons: PropTypes.bool,
  controlButtonLabels: PropTypes.arrayOf(PropTypes.string),
  prompt: PropTypes.string,
  commands: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  welcomeMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  errorMessage: PropTypes.string
};

Terminal.defaultProps = {
  theme: "light",
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  welcomeMessage: "",
  errorMessage: "not found!",
};
