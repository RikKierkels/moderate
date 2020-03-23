import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth0 } from './AuthContext';
import {
  Button,
  ButtonLink,
  Column,
  pageContainer,
  Paragraph,
  Row
} from '../design/styled-components';

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
      <ToolbarContainer>
        <Link to="/">
          <Brand>Moderate</Brand>
        </Link>
        {!isLoading && !user && (
          <Button onClick={loginWithRedirect}>Sign in</Button>
        )}
        {!isLoading && user && (
          <ProfileContainer>
            <SignOutContainer>
              <Paragraph>{user.nickname}</Paragraph>
              <SignOutButton onClick={logout}>Sign out</SignOutButton>
            </SignOutContainer>
            <Avatar src={user.picture} />
          </ProfileContainer>
        )}
      </ToolbarContainer>
    </StyledToolbar>
  );
}

const StyledToolbar = styled.header`
  height: ${props => props.theme.toolbar.height};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.color.card};
  font-family: Sen;
`;

const ToolbarContainer = styled(Row)`
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  ${pageContainer}
`;

const Brand = styled.h1`
  margin: 0;
  text-decoration: none;
`;

const ProfileContainer = styled(Row)`
  height: 100%;
`;

const SignOutContainer = styled(Column)`
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

const Avatar = styled.img`
  width: auto;
  height: 100%;
  border-radius: 50%;
  margin-left: ${props => props.theme.spacing.md};

  @media ${props => props.theme.breakpoint.xs} {
    display: none;
  }
`;

const SignOutButton = styled(ButtonLink)`
  font-size: ${props => props.theme.fontSize.sm};
  opacity: 0.7;
`;
