import React from 'react';
import { Link } from 'react-router-dom';
import './IdeaGridItem.scss';
import { Idea } from '../shared/interfaces/idea.interface';
import truncate from '../shared/utils/truncate';

type IdeaGridItemProps = { idea: Idea };
export default function IdeaGridItem({ idea }: IdeaGridItemProps): JSX.Element {
  return (
    <Link to={`/ideas/${idea.id}`} className="idea-card">
      <article>
        <h3 className="idea-card-title">{idea.title}</h3>
        <p className="idea-card-description">
          {truncate(idea.description, 50)}
        </p>

        <span>
          {idea.createdAt}
          By
          {idea.author.username}
        </span>
      </article>
    </Link>
  );
}
