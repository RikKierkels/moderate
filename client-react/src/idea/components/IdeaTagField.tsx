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

  function isSelected(id: string): boolean {
    return selectedTags.some(selectedId => selectedId === id);
  }

  function toggleTag(id: string): void {
    if (isSelected(id)) {
      const newSelectedTags = selectedTags.filter(tagId => tagId !== id);
      return setTags(newSelectedTags);
    }

    return setTags([...selectedTags, id]);
  }

  return (
    <StyledIdeaTagField>
      {tags.map(tag => (
        <TagButton
          key={tag.id}
          selected={isSelected(tag.id)}
          onClick={() => toggleTag(tag.id)}
        >
          <IdeaTag tag={tag} />
        </TagButton>
      ))}
    </StyledIdeaTagField>
  );
}

const StyledIdeaTagField = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -${props => props.theme.spacing.xs};
`;

const TagButton = styled.button<{ selected: boolean }>`
  display: flex;
  width: calc(25% - ${props => props.theme.spacing.xs} * 2);
  border: 1px solid
    ${props => (props.selected ? 'transparent' : props.theme.color.border)};
  border-radius: 3px;
  margin: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props =>
    props.selected ? props.theme.color.secondary : 'white'};
  color: ${props => (props.selected ? 'white' : props.theme.color.font)};
  cursor: pointer;
  transition: background-color 0.1s ease-out;

  @media ${props => props.theme.breakpoint.sm} {
    width: calc(50% - ${props => props.theme.spacing.xs} * 2);
  }
`;
