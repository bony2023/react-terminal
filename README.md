<h1 align="center">
  <img src="https://react-terminal.sirv.com/static/terminal-logo-text.png" data-canonical-src="https://react-terminal.sirv.com/static/terminal-logo-text.png" width="145" height="50" />
</h1>

<p align="center">🚀 React component that renders a Terminal 🖥</p>

<p align="center">
  <a href="https://github.com/bony2023/react-terminal/actions?query=Build+and+Test"><img src="https://github.com/bony2023/react-terminal/workflows/Build%20and%20Test/badge.svg" data-canonical-src="https://github.com/bony2023/react-terminal/workflows/Build%20and%20Test/badge.svg"/></a>
  <a href="https://codecov.io/gh/bony2023/react-terminal"><img src="https://codecov.io/gh/bony2023/react-terminal/branch/master/graph/badge.svg?token=xt1kdpvlam" data-canonical-src="https://codecov.io/gh/bony2023/react-terminal/branch/master/graph/badge.svg?token=xt1kdpvlam"/></a>
  <a href="https://www.npmjs.com/package/react-terminal"><img src="https://img.shields.io/npm/v/react-terminal/latest" data-canonical-src="https://img.shields.io/npm/v/react-terminal/latest"/></a>
  <img src="https://img.shields.io/npm/l/react-terminal" data-canonical-src="https://img.shields.io/npm/l/react-terminal"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#props">Props</a> •
  <a href="#report-a-bug">Report a bug</a>
</p>

![Terminal png](https://react-terminal.sirv.com/static/terminal-dracula.png)

## Features
- Mobile support. 📱
- Customizable commands, prompt and error message. ✅
- Support callbacks(async/non-async) for commands. 🔄
- Command history using arrow up and down. 🔼
- Support for copy/paste. 📋
- In-built themes and support to create more. 🚀

## Installation
Install package with NPM or YARN and add it to your development dependencies:
```
npm install react-terminal
```
OR
```
yarn add react-terminal
```

## Usage
```
import { ReactTerminal } from "react-terminal";

function App(props) {
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

## Creating custom themes
The component comes with few in-built themes: `light`, `dark`, `material-light`, `material-dark`, `material-ocean`, `matrix` and `dracula`. You can also create custom themes by passing `themes` parameter in props, as follows:

```
<ReactTerminal
  commands={commands}
  themes={{
    my-custom-theme: {
      themeBGColor: "#272B36",
      themeToolbarColor: "#DBDBDB",
      themeColor: "#FFFEFC",
      themePromptColor: "#a917a8"
    }
  }}
  theme="my-custom-theme"
/>
```

## Props
| name | description | default
|--|--|--
| `welcomeMessage` | A welcome message to show at the start, before the prompt begins. Value can be either a string or JSX | null
| `prompt` | Terminal prompt | >>>
| `commands` | List of commands to be provided as a key value pair where value can be either a string, JSX/HTML tag or callback | null
| `errorMessage` | Message to show when unidentified command executed | "not found!"
| `enableInput` | Whether to enable user input | true
| `showControlBar` | Whether to show the top control bar | true
| `showControlButtons` | Whether to show the control buttons at the top bar of the terminal | true
| `theme` | Theme of the terminal | "light"
| `themes` | Themes object to supply custom themes | null

## In-built commands
| command | description |
|--|--|
| clear | clears the console |

## Report a bug
If you found a bug in this library, please file an GitHub issue [here](https://github.com/bony2023/react-terminal/issues).
