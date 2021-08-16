<h1 align="center">
  <img src="https://react-terminal.sirv.com/static/terminal-logo-text.png" data-canonical-src="https://react-terminal.sirv.com/static/terminal-logo-text.png" width="145" height="50" />
</h1>

<p align="center">🚀 React component that renders a Terminal 🖥</p>

<p align="center">
  <a href="https://github.com/bony2023/react-terminal/actions?query=Build+and+Test"><img src="https://github.com/bony2023/react-terminal/workflows/Build%20and%20Test/badge.svg" data-canonical-src="https://github.com/bony2023/react-terminal/workflows/Build%20and%20Test/badge.svg"/></a>
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
- In-built light, dark and dracula theme. 🚀

## Installation
Install package with NPM or YARN and add it to your development dependencies:
```
npm install --save-dev react-terminal
```
OR
```
yarn add --dev react-terminal
```

## Usage
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

If you want to style the output, use HTML tags:
```
const commands = {
  basic: "I am unstyled",
  styled: () => (
    <span style={{fontWeight: "bold"}}>
      <span>Awesomely styled...</span> <br />
      <span>...on multiple lines.</span>
    </span>
  )
}
```

## Creating custom themes
The component comes with few in-built themes: light, dark and dracula. You can create a custom themes by passing `themes` parameter in props, as follows:

```
<ReactTerminal
  commands={commands}
  themes={{
    myCustomTheme: {
      themeBGColor: "#272B36",
      themeToolbarColor: "#DBDBDB",
      themeColor: "#FFFEFC",
      themePromptColor: "#a917a8"
    }
  }}
  theme="myCustomTheme"
/>
```

## Props
| name | description | default |
|--|--|--|
| theme | Theme of the terminal | "light" |
| themes | Themes object to supply custom themes | null |
| showControlButtons | Whether to show the control buttons at the top of the terminal | true |
| prompt | Terminal prompt | >>>
| commands | List of commands to be provided as a key value pair where value can be either a string or callback | null
| welcomeMessage | A welcome message to show at the start, before the prompt begins | null
| errorMessage | Message to show when unidentified command executed | "not found!"

## In-built commands
| command | description |
|--|--|
| clear | clears the console |

## Report a bug
If you found a bug in this library, please file an GitHub issue [here](https://github.com/bony2023/react-terminal/issues).
