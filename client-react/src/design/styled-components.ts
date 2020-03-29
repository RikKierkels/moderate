import styled, { css } from 'styled-components';

export const pageContainer = css`
  max-width: ${props => props.theme.app.maxWidth};
  margin: auto;
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Paragraph = styled.p`
  margin: 0;
`;

export const Button = styled.button.attrs({ type: 'button' })`
  border: 1px solid transparent;
  border-radius: 3px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.color.primary};
  color: white;
  font-size: ${props => props.theme.fontSize.md};
  font-family: Sen;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.1s ease-out;

  &:hover {
    border: 1px solid ${props => props.theme.color.primary};
    color: ${props => props.theme.color.primary};
    background-color: white;
  }
`;

export const ButtonLink = styled.button.attrs({ type: 'button' })`
  border: 0;
  padding: 0;
  color: ${props => props.theme.color.font};
  background-color: transparent;
  font-family: Sen;
  text-decoration: underline;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.1s ease-out;

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledField = css`
  border-radius: 3px;
  border: 1px solid ${props => props.theme.color.border};
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSize.md};
`;

export const StyledLabel = styled.label<{ spaceBottom: boolean }>`
  margin-bottom: ${props => (props.spaceBottom ? props.theme.spacing.sm : 0)};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: bold;
  text-transform: uppercase;
`;

export const Error = styled.p`
  margin-top: -${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  color: red;
`;
