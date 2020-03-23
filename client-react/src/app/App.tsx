import React from 'react';
import { Redirect, Switch } from 'react-router';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../design/theme';
import { GlobalStyle } from '../design/global';
import { routes } from '../router/routes';
import RouteWithSubRoutes from '../router/RouteWithSubRoutes';
import { pageContainer } from '../design/styled-components';
import Toolbar from '../shared/Toolbar';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toolbar />
      <StyledApp>
        <Switch>
          <Redirect exact from="/" to="/ideas" />
          {routes.map((route, i) => (
            <RouteWithSubRoutes
              key={i}
              path={route.path}
              component={route.component}
              routes={route.routes}
            />
          ))}
        </Switch>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.main`
  padding: ${props => props.theme.spacing.lg};
  ${pageContainer}
`;
