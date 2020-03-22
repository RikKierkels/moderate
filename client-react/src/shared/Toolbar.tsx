import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from './AuthContext';

export default function Toolbar() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user
  } = useAuth0();

  return (
    <StyledToolbar>
      {!isLoading && !user && (
        <button type="button" onClick={loginWithRedirect}>
          Sign in
        </button>
      )}
      {!isLoading && user && (
        <button type="button" onClick={logout}>
          Sign out
        </button>
      )}
      {isAuthenticated}
    </StyledToolbar>
  );
}

const StyledToolbar = styled.header`
  display: flex;
  justify-content: flex-end;
  height: ${props => props.theme.toolbar.height};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.color.card};
`;
