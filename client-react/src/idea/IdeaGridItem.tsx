import React from 'react';
import { Link } from 'react-router-dom';
import './IdeaGridItem.scss';
import { Idea } from '../shared/interfaces/idea.interface';

type IdeaGridItemProps = { idea: Idea };
export default function IdeaGridItem({ idea }: IdeaGridItemProps): JSX.Element {
  return (
    <article className="idea-card">
      <Link to={`/ideas/${idea.id}`}>
        <h3>{idea.title}</h3>
      </Link>
      <span>
        {idea.createdAt}
        By
        {idea.author.username}
      </span>
      <Link to={`/ideas/${idea.id}`}>
        <p>{idea.description}</p>
      </Link>
    </article>
  );
}
