import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../shared/interfaces/tag.interface';

type Props = { tag: Tag };
export default function IdeaTag({ tag }: Props) {
  return (
    <StyledIdeaTag>
      <TagCircle color={tag.color} />
      <TagName>{tag.name}</TagName>
    </StyledIdeaTag>
  );
}

const StyledIdeaTag = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSize.sm};
`;

const TagCircle = styled.span<{ color: string }>`
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const TagName = styled.span`
  margin-left: ${props => props.theme.spacing.sm};
`;
