import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import * as H from 'history';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import '@testing-library/jest-dom/extend-expect';
import { ContextValueType, useAuth0 } from '../AuthContext';

jest.mock('../AuthContext');
const authMock = useAuth0 as jest.Mock<ContextValueType>;

function renderRoutes(history: H.History): RenderResult {
  const protectedComponent = () => <div>Protected</div>;
  const homeComponent = () => <div>Home</div>;

  return render(
    <Router history={history}>
      <Route path="/" component={homeComponent} />
      <ProtectedRoute path="/protected" component={protectedComponent} />
    </Router>
  );
}

test('render the protected component if the user is authenticated', () => {
  authMock.mockReturnValue({ isAuthenticated: true });
  const history = createMemoryHistory();
  history.push('/protected');

  const { getByText } = renderRoutes(history);

  expect(history.location.pathname).toBe('/protected');
  expect(getByText(/protected/i)).toBeTruthy();
});

test('render the homepage if the user is not authenticated', () => {
  authMock.mockReturnValueOnce({ isAuthenticated: false });
  const history = createMemoryHistory();
  history.push('/protected');

  const { getByText } = renderRoutes(history);

  expect(history.location.pathname).toBe('/');
  expect(getByText(/home/i)).toBeTruthy();
});
