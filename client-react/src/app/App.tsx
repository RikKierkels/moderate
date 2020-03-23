import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../design/theme';
import { GlobalStyle } from '../design/global';
import { pageContainer } from '../design/styled-components';
import Toolbar from '../shared/Toolbar';
import IdeaOverview from '../idea/containers/IdeaOverview';
import IdeaCreate from '../idea/containers/IdeaCreate';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toolbar />
      <StyledApp>
        <Switch>
          <Redirect exact from="/" to="/ideas" />
          <Route exact path="/ideas">
            <IdeaOverview />
          </Route>
          <Route path="/ideas/create">
            <IdeaCreate />
          </Route>
          <Route path="/ideas/:id">
            <div>Hello from ideas/id</div>
          </Route>
        </Switch>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.main`
  padding: ${props => props.theme.spacing.lg};
  ${pageContainer}
`;
