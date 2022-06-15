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
    caret,
    theme,
    showControlBar,
    showControlButtons,
    controlButtonLabels,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    enableInput,
    defaultHandler
  } = props;

  const controls = showControlBar ? <Controls
    consoleFocused={consoleFocused}
    showControlButtons={showControlButtons}
    controlButtonLabels={controlButtonLabels}/> : null;

  const editor = <Editor
    caret={caret}
    consoleFocused={consoleFocused}
    prompt={prompt}
    commands={commands}
    welcomeMessage={welcomeMessage}
    errorMessage={errorMessage}
    enableInput={enableInput}
    showControlBar={showControlBar}
    defaultHandler={defaultHandler}/>

  return (
    <div
      ref={wrapperRef}
      id={style.terminalContainer}
      className={style[`theme--${theme}`]}
      data-testid="terminal"
    >
      <div className={`${style.terminal}`} style={{ background: themeStyles.themeToolbarColor, color: themeStyles.themeColor }}>
        {controls}
        {editor}
      </div>
    </div>
  );
}

Terminal.propTypes = {
  enableInput:PropTypes.bool,
  caret: PropTypes.bool,
  theme: PropTypes.string,
  showControlBar: PropTypes.bool,
  showControlButtons: PropTypes.bool,
  controlButtonLabels: PropTypes.arrayOf(PropTypes.string),
  prompt: PropTypes.string,
  commands: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ])),
  welcomeMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  defaultHandler: PropTypes.func
};

Terminal.defaultProps = {
  enableInput: true,
  caret: true,
  theme: "light",
  showControlBar: true,
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  welcomeMessage: "",
  errorMessage: "not found!",
  defaultHandler: null,
};
