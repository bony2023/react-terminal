import * as React from "react";
import { render } from "@testing-library/react"
import ContextProvider from "../../../src/contexts";
import { TerminalContextProvider } from "../../../src/contexts/TerminalContext";
import Editor from "../../../src/components/Editor";

let props: any;
const renderWrapper = () => (
  <ContextProvider>
    <TerminalContextProvider>
      <Editor {...props} />
    </TerminalContextProvider>
  </ContextProvider>
);

describe("Editor", () => {
  it("Editor renders correctly", () => {
    props = {
      consoleFocused: false,
      prompt: "$",
      commands: {},
      welcomeMessage: "",
      errorMessage: ""
    };

    const { container } = render(renderWrapper())
    expect(container).toMatchSnapshot();
  });
});
