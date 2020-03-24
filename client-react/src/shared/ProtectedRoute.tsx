import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth0 } from './AuthContext';

/* eslint-disable */
export default function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
