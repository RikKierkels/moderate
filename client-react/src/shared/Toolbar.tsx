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
        <Nav>
          <li>
            <Link to="/">
              <Brand>Moderate</Brand>
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/ideas/create">New Idea</NavLink>
            </li>
          )}
        </Nav>
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

  @media ${props => props.theme.breakpoint.xs} {
    height: auto;
  }
`;

const ToolbarContainer = styled(Row)`
  ${pageContainer}
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};

  @media ${props => props.theme.breakpoint.xs} {
    align-items: flex-start;
  }
`;

const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
`;

const NavLink = styled(Link)`
  display: inline-block;
  text-decoration: underline;
`;

const Brand = styled.h1`
  margin-bottom: 0;
  margin-right: ${props => props.theme.spacing.lg};
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
