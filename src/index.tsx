import * as React from 'react';
import * as Terminal from './components/Terminal';
import * as ContextProvider from './contexts';


export default function ReactTerminal(props: any): any {
  return (
    <ContextProvider.default>
      <Terminal.default props={props} />
    </ContextProvider.default>
  );
}
