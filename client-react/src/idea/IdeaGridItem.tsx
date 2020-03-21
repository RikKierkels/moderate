import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Idea } from '../shared/interfaces/idea.interface';
import truncate from '../shared/utils/truncate';
import './IdeaGridItem.scss';
import IdeaTag from './IdeaTag';
import DifficultyRating from './DifficultyRating';

type IdeaGridItemProps = { idea: Idea };
export default function IdeaGridItem({ idea }: IdeaGridItemProps) {
  const createdAt = moment(idea.createdAt).format('MMMM DD');

  return (
    <Link to={`/ideas/${idea.id}`} className="card">
      <article className="card-container">
        <h3 className="card-title">{idea.title}</h3>
        <p className="card-description">{truncate(idea.description, 50)}</p>

        <div className="card-tags-container">
          {idea.tags.map(tag => (
            <IdeaTag key={tag.id} tag={tag} />
          ))}
        </div>

        <DifficultyRating difficulty={idea.difficulty} />

        <div className="card-replies-container">
          <span className="card-replies-count">{idea.messageCount}</span>
          <FontAwesomeIcon icon="comment-alt" className="card-replies-icon" />
        </div>

        <div className="card-details-container">
          <span className="card-creator">Posted by {idea.author.username}</span>
          <span className="card-date">{createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
