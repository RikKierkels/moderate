import { DefaultTheme } from 'styled-components';

const spacing: DefaultTheme['spacing'] = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xlg: '4rem'
};

const breakpoint: DefaultTheme['breakpoint'] = {
  xs: '(max-width: 500px)',
  sm: '(max-width: 600px)',
  md: '(max-width: 800px)'
};

const fontSize: DefaultTheme['fontSize'] = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xlg: '24px'
};

const color: DefaultTheme['color'] = {
  title: '#222222',
  font: '#484848',
  body: '#f5f7f8',
  card: '#fff',
  border: '#ebebeb',
  primary: '#ff5a5f',
  secondary: '#00a699'
};

const app: DefaultTheme['app'] = { maxWidth: '1280px' };
const toolbar: DefaultTheme['toolbar'] = { height: '75px' };

const theme: DefaultTheme = {
  spacing,
  breakpoint,
  fontSize,
  color,
  app,
  toolbar
};

export default theme;
