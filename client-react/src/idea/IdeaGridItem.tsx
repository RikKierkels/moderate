import React from 'react';
import { Link } from 'react-router-dom';
import './IdeaGridItem.scss';
import moment from 'moment';
import { Idea } from '../shared/interfaces/idea.interface';
import truncate from '../shared/utils/truncate';

type IdeaGridItemProps = { idea: Idea };
export default function IdeaGridItem({ idea }: IdeaGridItemProps): JSX.Element {
  const createdAt = moment(idea.createdAt).format('MMMM DD');

  return (
    <Link to={`/ideas/${idea.id}`} className="idea-card">
      <article className="idea-card-container">
        <h3 className="idea-card-title">{idea.title}</h3>
        <p className="idea-card-description">
          {truncate(idea.description, 50)}
        </p>

        <div className="idea-card-details-container">
          <span className="idea-card-post">
            Posted by {idea.author.username}
          </span>
          <span className="idea-card-date">{createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
