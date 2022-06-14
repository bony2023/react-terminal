import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { ReactTerminal, TerminalContextProvider } from "../../../src";

describe('ReactTerminal', () => {
  test('renders ReactTerminal component', () => {
    render(
      <TerminalContextProvider>
          <ReactTerminal/>
      </TerminalContextProvider>
    );
  });

  test('selects terminal component', async () => {
    render(
      <TerminalContextProvider>
          <ReactTerminal/>
      </TerminalContextProvider>
    );
    
    await userEvent.click(screen.getByTestId('terminal'));
  });

  test('write some text on terminal component', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'invalid_command');
    expect(container.querySelector('.lineText')?.textContent).toBe('invalid_command');
  });

  test('execute an invalid command on terminal component returns default text', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'invalid_command');
    writeText(terminalContainer, 'Enter');
    expect(container.textContent).toContain('not found!');
  });

  test('execute a valid command on terminal component', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal commands={{ whoami: 'jackharper' }}/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'whoami');
    writeText(terminalContainer, 'Enter');
    expect(container.textContent).toContain('jackharper');
  });

  test('backspace deletes a character', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal commands={{ whoami: 'jackharper' }}/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'whoami');
    writeText(terminalContainer, 'Backspace');
    expect(container.textContent).toContain('whoam');
    writeText(terminalContainer, 'i');
    writeText(terminalContainer, 'Enter');
    expect(container.textContent).toContain('jackharper');
  });

  test('up arrow fetch previous command', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal commands={{ whoami: 'jackharper' }}/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'whoami');
    writeText(terminalContainer, 'Enter');
    writeText(terminalContainer, 'ArrowUp');
    expect(screen.getAllByText("whoami").length).toBe(2);
  });

  test('down arrow fetch next command', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal commands={{ whoami: 'jackharper' }}/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'ArrowUp');
    expect(container.querySelectorAll('.preWhiteSpace')[0].textContent).toBe('');
    expect(container.querySelectorAll('.preWhiteSpace')[1].textContent).toBe('');
    writeText(terminalContainer, 'whoami');
    writeText(terminalContainer, 'Enter');
    writeText(terminalContainer, 'ArrowUp');
    expect(screen.getAllByText("whoami").length).toBe(2);
    writeText(terminalContainer, 'ArrowUp');
    expect(screen.getAllByText("whoami").length).toBe(2);
    writeText(terminalContainer, 'ArrowDown');
    expect(screen.getAllByText("whoami").length).toBe(1);
    writeText(terminalContainer, 'ArrowDown');
    expect(screen.getAllByText("whoami").length).toBe(1);
  });

  test('arrow left/right moves the cursor', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal commands={{ whoami: 'jackharper' }}/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'whoami');
    writeText(terminalContainer, 'ArrowLeft');
    expect(container.querySelectorAll('.preWhiteSpace')[0].textContent).toBe('whoam');
    expect(container.querySelectorAll('.preWhiteSpace')[1].textContent).toBe('i');
    writeText(terminalContainer, 'ArrowRight');
    expect(container.querySelectorAll('.preWhiteSpace')[0].textContent).toBe('whoami');
    expect(container.querySelectorAll('.preWhiteSpace')[1].textContent).toBe('');
  });

  test('empty command does nothing', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal commands={{ whoami: 'jackharper' }}/>
      </TerminalContextProvider>
    );
    
    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, '');
    writeText(terminalContainer, 'Enter');
    expect(container.querySelectorAll('.preWhiteSpace')[0].textContent).toBe('');
    expect(container.querySelectorAll('.preWhiteSpace')[1].textContent).toBe('');
  });

  test('clear command clears the console', () => {
    const { container } = render(
      <TerminalContextProvider>
          <ReactTerminal/>
      </TerminalContextProvider>
    );

    const terminalContainer = screen.getByTestId('terminal')
    writeText(terminalContainer, 'invalid_command');
    writeText(terminalContainer, 'Enter');
    writeText(terminalContainer, 'clear');
    writeText(terminalContainer, 'Enter');
    expect(terminalContainer.textContent).toBe('>>>');
  });
});

function writeText(container: any, value: string, metaKey = false) {
  if (["Enter", "Backspace", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(value)) {
    fireEvent.keyDown(container, {
      metaKey: metaKey,
      key: value
    });
    return;
  }

  value.split('').forEach(char => {
    fireEvent.keyDown(container, {
      metaKey: metaKey,
      key: char
    });
  })
}
