import * as React from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useClickOutsideEvent } from "../hooks/terminal";

import Controls from "./Controls";
import Editor from "./Editor";

export default function Terminal(props: any) {
  const wrapperRef = React.useRef(null);
  const [consoleFocused, setConsoleFocused] = React.useState(!isMobile);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);

  useClickOutsideEvent(wrapperRef, consoleFocused, setConsoleFocused);

  // Get all props destructively
  const {
    caret,  //caret prop
    theme,
    showControlButtons,
    controlButtonLabels,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    enableInput //enableInput prop
  } = props;

  return (
    <div
      ref={wrapperRef}
      id={style.terminalContainer}
      className={style[`theme--${theme}`]}
    >
      <div className={`${style.terminal}`} style={{ background: themeStyles.themeToolbarColor, color: themeStyles.themeColor }}>
        <Controls
          consoleFocused={consoleFocused}
          showControlButtons={showControlButtons}
          controlButtonLabels={controlButtonLabels}
        />
        <Editor
          caret={caret}  // caret prop
          consoleFocused={consoleFocused}
          prompt={prompt}
          commands={commands}
          welcomeMessage={welcomeMessage}
          errorMessage={errorMessage}
          enableInput={enableInput} //enableInput prop
        />
      </div>
    </div>
  );
}

Terminal.propTypes = {
  enableInput:PropTypes.bool,  //added both props with their types
  caret: PropTypes.bool,
  theme: PropTypes.string,
  showControlButtons: PropTypes.bool,
  controlButtonLabels: PropTypes.arrayOf(PropTypes.string),
  prompt: PropTypes.string,
  commands: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ])),
  welcomeMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  errorMessage: PropTypes.string
};

Terminal.defaultProps = {
  enableInput: true, //Input and caret are enabled by default
  caret: true,
  theme: "light",
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  welcomeMessage: "",
  errorMessage: "not found!",
};
