import * as React from 'react';
import { StyleContext } from '../contexts/StyleContext';

import Controls from './Controls';
import Editor from './Editor';


export default function Terminal(props: any) {
  const [consoleFocused, setConsoleFocused] = React.useState(true);
  const style = React.useContext(StyleContext);

  // Get all props destructively
  const { controls, editor } = props;
  const { theme } = props;

  return (
    <div
      onClick={() => setConsoleFocused(true)}
      onKeyDown={() => setConsoleFocused(true)}
      onBlur={() => setConsoleFocused(false)}
      id={style.themeContainer}
      className={style[`theme--${theme}`]}
    >
      <div className={`${style.terminal}`}>
        <Controls consoleFocused={consoleFocused} {...controls} />
        <Editor
          consoleFocused={consoleFocused}
          {...editor}
        />
      </div>
    </div>
  );
}

Terminal.defaultProps = {
  theme: 'light',
};
