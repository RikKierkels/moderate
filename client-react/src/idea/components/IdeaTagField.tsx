import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { Tag } from '../../shared/interfaces/tag.interface';
import IdeaTag from './IdeaTag';

type Props = { tags: Tag[]; name: string };
export default function IdeaTagField({ tags, name }: Props) {
  const [field, meta, helpers] = useField<string[]>(name);
  const { value: selectedTags } = meta;
  const { setValue: setTags } = helpers;

  function toggleTag(id: string) {
    if (selectedTags.some(selectedId => selectedId === id)) {
      const newSelectedTags = selectedTags.filter(tagId => tagId !== id);
      return setTags(newSelectedTags);
    }

    return setTags([...selectedTags, id]);
  }

  return (
    <StyledIdeaTagField>
      {tags.map(tag => (
        <TagButton key={tag.id} onClick={() => toggleTag(tag.id)}>
          <IdeaTag tag={tag} />
        </TagButton>
      ))}
    </StyledIdeaTagField>
  );
}

const StyledIdeaTagField = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.color.font};
`;
