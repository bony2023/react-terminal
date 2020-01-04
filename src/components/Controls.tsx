import * as React from 'react';
import { StyleContext } from '../contexts/StyleContext';


export default function Controls(props: any) {
  const style = React.useContext(StyleContext) || Object;
  const { controls } = props;

  const controlButtons = controls.map((control: string) => <div key={control} className={`${style.consoleCtrl} ${style[control]}`} />);

  return (
    <div className={style.controls}>
      {controlButtons}
    </div>
  );
}

Controls.defaultProps = {
  controls: ['close', 'minimize', 'maximize'],
};
