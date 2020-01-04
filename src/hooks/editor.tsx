import * as React from "react";
import { StyleContext } from "../contexts/StyleContext";

export const useCurrentLine = (consoleFocused: boolean) => {
  const style = React.useContext(StyleContext);
  const editAreaRef = React.createRef<HTMLDivElement>();
  const [caretSelected, setCaretSelected] = React.useState(true);

  React.useEffect(
    () => {
      if (consoleFocused) {
        editAreaRef.current.focus();
      }

      setCaretSelected(consoleFocused);
    },
    [consoleFocused]
  );

  const currentLine = (
    <>
      <span>&gt;&gt;&gt;</span>
      <div
        className={style.editArea}
        contentEditable
        suppressContentEditableWarning
        autoCapitalize="off"
        autoCorrect="off"
        ref={editAreaRef}
      >
        {caretSelected ? (
          <span className={style.caret}>
            <span className={style.caretAfter} />
          </span>
        ) : null}
      </div>
    </>
  );

  return currentLine;
};

export default {
  useCurrentLine
};
