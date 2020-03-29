import React from 'react';
import { useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import config from '../../shared/config/config';
import { StyledLabel } from '../../design/styled-components';

type Props = { name: string };
export default function DifficultyRatingField({ name }: Props) {
  const iconButtons: JSX.Element[] = [];
  const { maxDifficulty } = config.idea;
  const fullStar: IconProp = ['fas', 'star'];
  const emptyStar: IconProp = ['far', 'star'];

  const [_, meta, helpers] = useField<number>(name);
  const { value: currentDifficulty } = meta;
  const { setValue } = helpers;

  for (let difficulty = 1; difficulty <= maxDifficulty; difficulty++) {
    const icon = difficulty <= currentDifficulty ? fullStar : emptyStar;
    iconButtons.push(
      <IconButton key={difficulty} onClick={() => setValue(difficulty)}>
        <Icon icon={icon} />
      </IconButton>
    );
  }

  return (
    <>
      <StyledLabel spaceBottom={false}>difficulty</StyledLabel>
      <StyledDifficultyRating>{iconButtons}</StyledDifficultyRating>
    </>
  );
}

const StyledDifficultyRating = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
`;

const IconButton = styled.button.attrs({ type: 'button' })`
  border: 0;
  padding: 0;
  margin: 0;
  height: 100%;
  background: transparent;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  transition: 0.1s ease-out;

  &:hover,
  ${IconButton}:focus & {
    font-size: 250%;
  }
`;
