import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import config from '../../shared/config/config';

type Props = { difficulty: number };
export default function DifficultyRating({ difficulty }: Props) {
  const icons: JSX.Element[] = [];
  const { maxDifficulty } = config.idea;
  const fullStar: IconProp = ['fas', 'star'];
  const emptyStar: IconProp = ['far', 'star'];

  for (let i = 1; i <= maxDifficulty; i++) {
    const icon = i <= difficulty ? fullStar : emptyStar;
    icons.push(<FontAwesomeIcon key={i} icon={icon} />);
  }

  return <StyledDifficultyRating>{icons}</StyledDifficultyRating>;
}

const StyledDifficultyRating = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
`;
