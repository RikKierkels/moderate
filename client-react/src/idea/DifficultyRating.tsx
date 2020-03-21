import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../shared/config';

type DifficultyRatingProps = { difficulty: number };
export default function DifficultyRating({
  difficulty
}: DifficultyRatingProps) {
  let icons: JSX.Element[] = [];

  for (let i = 0; i < difficulty; i++) {
    icons = [...icons, <FontAwesomeIcon icon={['fas', 'star']} />];
  }

  for (let i = 0; i < config.idea.maxDifficulty - difficulty; i++) {
    icons = [...icons, <FontAwesomeIcon icon={['far', 'star']} />];
  }

  return <div>{icons}</div>;
}
