import React from 'react';
import { Link } from 'react-router-dom';
import { Idea } from '../../../client-angular/src/app/shared/interfaces/idea.interface';

type IdeaGridItemProps = { idea: Idea };
export default function IdeaGridItem({ idea }: IdeaGridItemProps): JSX.Element {
  return (
    <article>
      <Link to="/blaat">
        <h3>{idea.title}</h3>
      </Link>
      <span>
        {idea.createdAt}
        By
        {idea.author.username}
      </span>
      <Link to="/blaat">
        <p>{idea.description}</p>
      </Link>
    </article>
  );
}
