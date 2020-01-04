import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Terminal from '../../src/components/Terminal';
import * as ContextProvider from '../../src/contexts';

it('Terminal renders correctly', () => {
  const props = {};
  const tree = renderer
    .create(<ContextProvider.default><Terminal {...props} /></ContextProvider.default>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
