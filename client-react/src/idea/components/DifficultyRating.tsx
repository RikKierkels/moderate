import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import config from '../../shared/config/config';

type Props = { difficulty: number };
export default function DifficultyRating({ difficulty }: Props) {
  let icons: JSX.Element[] = [];

  for (let i = 0; i < difficulty; i++) {
    icons = [...icons, <FontAwesomeIcon key={i} icon={['fas', 'star']} />];
  }

  for (let i = config.idea.maxDifficulty; i > difficulty; i--) {
    icons = [...icons, <FontAwesomeIcon key={i} icon={['far', 'star']} />];
  }

  return <StyledDifficultyRating>{icons}</StyledDifficultyRating>;
}

const StyledDifficultyRating = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
`;
