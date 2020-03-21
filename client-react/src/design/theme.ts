import { DefaultTheme } from 'styled-components';

const spacing: DefaultTheme['spacing'] = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xlg: '4rem'
};

const breakpoint: DefaultTheme['breakpoint'] = {
  small: '(max-width: 600px)',
  medium: '(max-width: 800px)'
};

const fontSize: DefaultTheme['fontSize'] = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xlg: '24px'
};

const color: DefaultTheme['color'] = {
  title: '#333',
  font: '#444',
  body: '#f5f7f8'
};

const theme: DefaultTheme = {
  spacing,
  breakpoint,
  fontSize,
  color
};

export default theme;
