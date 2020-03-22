import React from 'react';
import styled from 'styled-components';

export default function Toolbar() {
  return <StyledToolbar></StyledToolbar>;
}

const StyledToolbar = styled.header`
  display: flex;
  justify-content: flex-end;
  height: ${props => props.theme.toolbar.height};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.color.card};
`;
