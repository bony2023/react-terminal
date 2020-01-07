import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";

export default function Controls(props: any) {
  const style = React.useContext(StyleContext);

  const { controlButtonLabels } = props;
  const { showControlButtons } = props;

  const controlButtons = showControlButtons
    ? controlButtonLabels.map((buttonLabel: string) => (
        <div
          key={buttonLabel}
          className={`${style.consoleCtrl} ${style[buttonLabel]}`}
        />
      ))
    : null;

  return <div className={style.controls}>{controlButtons}</div>;
}
