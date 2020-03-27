import React from 'react';
import { useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import config from '../../shared/config/config';

type Props = { name: string };
export default function DifficultyRatingField({ name }: Props) {
  let icons: JSX.Element[] = [];
  const { maxDifficulty } = config.idea;

  const [field, meta, helpers] = useField<number>(name);
  const { value } = meta;
  const { setValue } = helpers;

  for (let difficulty = 1; difficulty <= value; difficulty++) {
    icons = [
      ...icons,
      <IconButton key={difficulty} onClick={() => setValue(difficulty)}>
        <Icon icon={['fas', 'star']} />
      </IconButton>
    ];
  }

  for (let difficulty = value + 1; difficulty <= maxDifficulty; difficulty++) {
    icons = [
      ...icons,
      <IconButton key={difficulty} onClick={() => setValue(difficulty)}>
        <Icon icon={['far', 'star']} />
      </IconButton>
    ];
  }

  return <StyledDifficultyRating>{icons}</StyledDifficultyRating>;
}

const StyledDifficultyRating = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
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
