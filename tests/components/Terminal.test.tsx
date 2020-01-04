import * as React from "react";
import renderer from "react-test-renderer";
import * as ContextProvider from "../../src/contexts";
import Terminal from "../../src/components/Terminal";

let props: any;
const renderWrapper = () =>
  renderer.create(
    <ContextProvider.default>
      <Terminal {...props} />
    </ContextProvider.default>
  );

it("Terminal renders correctly", () => {
  expect(renderWrapper().toJSON()).toMatchSnapshot();
});
