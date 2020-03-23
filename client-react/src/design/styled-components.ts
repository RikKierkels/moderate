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
  border: 1px solid ${props => props.theme.color.font};
  border-radius: 3px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: transparent;
  font-size: ${props => props.theme.fontSize.md};
  font-family: Sen;
  cursor: pointer;
  transition: opacity 0.1s ease-out;

  &:hover {
    opacity: 0.5;
  }
`;

export const ButtonLink = styled(Button)`
  border: 0;
  padding: 0;
  text-decoration: underline;
`;
