import React, { Component } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth0 } from './AuthContext';

/* eslint-disable */
export default function ProtectedRoute({ component, ...rest }: RouteProps) {
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
