import * as React from "react";
import renderer from "react-test-renderer";
import ContextProvider from "../../src/contexts";
import { TerminalContextProvider } from "../../src/contexts/TerminalContext";
import Terminal from "../../src/components/Terminal";

let props: any;
const renderWrapper = () => (
  <ContextProvider>
    <TerminalContextProvider>
      <Terminal {...props} />
    </TerminalContextProvider>
  </ContextProvider>
);

it("Terminal renders correctly", () => {
  expect(renderer.create(renderWrapper()).toJSON()).toMatchSnapshot();
});
