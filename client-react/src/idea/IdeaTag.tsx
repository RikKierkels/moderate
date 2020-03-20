import React from 'react';
import './IdeaTag.scss';
import { Tag } from '../shared/interfaces/tag.interface';

type TagProps = { tag: Tag };
export default function IdeaTag({ tag }: TagProps): JSX.Element {
  return (
    <div className="tag-container">
      <span className="tag-circle" style={{ backgroundColor: tag.color }} />
      <span className="tag-name">{tag.name}</span>
    </div>
  );
}
