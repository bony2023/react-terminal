<p align="center">
  <img src="https://react-terminal.sirv.com/static/terminal-logo-text.png" data-canonical-src="https://react-terminal.sirv.com/static/terminal-logo-text.png" width="145" height="50" />
</p>

<p align="center">🚀 React component that renders a Terminal 🖥</p>

<p align="center">
<a href="https://github.com/bony2023/react-terminal/actions?query=Build+and+Test"><img src="https://github.com/bony2023/react-terminal/workflows/Build%20and%20Test/badge.svg" data-canonical-src="https://github.com/bony2023/react-terminal/workflows/Build%20and%20Test/badge.svg"/></a>
<a href="https://www.npmjs.com/package/react-terminal"><img src="https://img.shields.io/npm/v/react-terminal/latest" data-canonical-src="https://img.shields.io/npm/v/react-terminal/latest"/></a>
<img src="https://img.shields.io/npm/l/react-terminal" data-canonical-src="https://img.shields.io/npm/l/react-terminal"/>
</p>

![Terminal png](https://react-terminal.sirv.com/static/terminal.png)

# Installation
Install package with NPM or YARN and add it to your development dependencies:
```
npm install --save-dev react-terminal
```
OR
```
yarn add --dev react-terminal
```

# Usage
```
import { ReactTerminal } from "react-terminal";

function MyComponent(props) {
  // Define commands here
  const commands = {
    whoami: "jackharper",
    cd: (directory) => `changed path to ${directory}`
  };

  return (
    <ReactTerminal
      commands={commands}
    />
  );
}
```

Also make sure to wrap the main mountpoint around the `TerminalContextProvider`. This retains the state even when the component is unmounted and then mounted back:
```
import { TerminalContextProvider } from "react-terminal";

ReactDOM.render(
  <TerminalContextProvider>
    <App/>
  </TerminalContextProvider>,
  rootElement
);
```

# Props
| name | description | default |
|--|--|--|
| theme | Colour theme of the terminal (light/dark) | "light" |
| showControlButtons | Whether to show the control buttons at the top of the terminal | true |
| prompt | Terminal prompt | >>>
| commands | List of commands to be provided as a key value pair where value can be either a string or callback | null
| welcomeMessage | A welcome message to show at the start, before the prompt begins | null
| errorMessage | Message to show when unidentified command executed | "not found!"

# Report a bug
If you found a bug in this library, please file an GitHub issue [here](https://github.com/bony2023/react-terminal/issues).