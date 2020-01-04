import * as React from 'react';
import { StyleContext } from '../contexts/StyleContext';


export default function Editor(props: any) {
  const style = React.useContext(StyleContext) || Object;

  return (
    <div className={style.editor} {...props} />
  );
}
