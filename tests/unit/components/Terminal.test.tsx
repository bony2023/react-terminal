import * as React from "react";
import { render } from "@testing-library/react"
import ContextProvider from "../../../src/contexts";
import { TerminalContextProvider } from "../../../src/contexts/TerminalContext";
import Terminal from "../../../src/components/Terminal";

let props: any;
const renderWrapper = () => (
  <ContextProvider>
    <TerminalContextProvider>
      <Terminal {...props} />
    </TerminalContextProvider>
  </ContextProvider>
);

describe("Terminal", () => {
  it("Terminal renders correctly", () => {
    const { container } = render(renderWrapper())
    expect(container).toMatchSnapshot();
  });

  it("Terminal doesn't render control buttons", () => {
    props = {
      showControlButtons: false,
    };
    const { container } = render(renderWrapper())
    expect(container).toMatchSnapshot();
  });

  it("Terminal doesn't render control bar", () => {
    props = {
      showControlBar: false,
    };
    const { container } = render(renderWrapper())
    expect(container).toMatchSnapshot();
  });
});
