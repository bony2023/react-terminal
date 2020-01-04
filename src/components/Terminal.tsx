import * as React from 'react';
import { StyleContext } from '../contexts/StyleContext';

import Controls from './Controls';
import Editor from './Editor';


export default function Terminal(props: any) {
  const style = React.useContext(StyleContext);
  const { controls, editor } = props;

  return (
    <div className={style.terminal}>
      <Controls {...controls} />
      <Editor {...editor} />
    </div>
  );
}
