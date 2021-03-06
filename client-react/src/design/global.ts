import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: ${props => props.theme.fontSize.md}
  }

  body {
    margin: 0;
    background-color: ${props => props.theme.color.body};
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.color.title};
  }

  a,
  button {
    color: inherit;
    text-decoration: inherit;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  input,
  textarea,
  select,
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                 sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.color.font};
  }
`;
