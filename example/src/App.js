import * as React from "react";
import './App.css';
import { TerminalContextProvider } from "react-terminal";
import { ReactTerminal } from "react-terminal";

function App() {
  const [theme, setTheme] = React.useState("light");
  const [controlBar, setControlBar] = React.useState(true);
  const [controlButtons, setControlButtons] = React.useState(true);
  const [prompt, setPrompt] = React.useState(">>>");

  const commands = {
    help: (<span>
        <strong>clear</strong> - clears the console. <br/>
        <strong>change_prompt &lt;PROMPT&gt;</strong> - Change the prompt of the terminal. <br/>
        <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the terminal. Allowed themes - light, dark, material-light, material-dark, material-ocean, matrix and dracula. <br/>
        <strong>toggle_control_bar</strong> - Hides / Display the top control bar. <br/>
        <strong>toggle_control_buttons</strong> - Hides / Display the top buttons on control bar. <br/>
        <strong>evaluate_math_expression &lt;EXPR&gt;</strong> - Evaluates a mathematical expression (eg, <strong>4*4</strong>) by hitting a public API, api.mathjs.org.
      </span>),

    change_prompt: (prompt) => {
      setPrompt(prompt);
    },

    change_theme: (theme) => {
      const validThemes = ["light", "dark", "material-light", "material-dark", "material-ocean", "matrix", "dracula"]
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`
      }
      setTheme(theme);
    },

    toggle_control_bar: () => {
      setControlBar(!controlBar);
    },

    toggle_control_buttons: () => {
      setControlButtons(!controlButtons);
    },

    evaluate_math_expression: async (expr) => {
      const response = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`);
      return await response.text();
    }
  };

  const welcomeMessage = (<span>Type "help" for all available commands. <br /></span>);

  return (
    <div className="App">
      <TerminalContextProvider>
        <ReactTerminal
          prompt={prompt}
          theme={theme}
          showControlBar={controlBar}
          showControlButtons={controlButtons}
          welcomeMessage={welcomeMessage}
          commands={commands}/>
      </TerminalContextProvider>
    </div>
  );
}

export default App;
