import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/theme';

export const withContexts = (Component, props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...props} />
    </ThemeProvider>
  );
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withContexts(App), div);
  ReactDOM.unmountComponentAtNode(div);
});
