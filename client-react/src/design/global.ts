import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${props => props.theme.fontSize.md}
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                 sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.color.body};
    color: ${props => props.theme.color.font};
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
`;
