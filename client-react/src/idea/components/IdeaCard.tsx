import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Idea } from '../../shared/interfaces/idea.interface';
import { truncate } from '../../shared/utils/truncate-text';
import IdeaTag from './IdeaTag';
import DifficultyRating from './DifficultyRating';
import { Column, Paragraph, Row } from '../../design/styled-components';

type Props = { idea: Idea };
export default function IdeaCard({ idea }: Props) {
  const createdAt = moment(idea.createdAt).format('MMMM DD');

  return (
    <StyledIdeaCard to={`/ideas/${idea.id}`}>
      <CardBody>
        <Title>{idea.title}</Title>
        <Description>{truncate(idea.description, 50)}</Description>

        <TagsContainer>
          {idea.tags.map(tag => (
            <IdeaTag key={tag.id} tag={tag} />
          ))}
        </TagsContainer>

        <ContainerSpaceBetween spaceBottom>
          <DifficultyRating difficulty={idea.difficulty} />
          <div>
            <ReplyCount>{idea.messageCount}</ReplyCount>
            <ReplyCountIcon icon="comment-alt" />
          </div>
        </ContainerSpaceBetween>

        <ContainerSpaceBetween spaceBottom={false}>
          <Author>Posted by {idea.author.username}</Author>
          <PostDate>{createdAt}</PostDate>
        </ContainerSpaceBetween>
      </CardBody>
    </StyledIdeaCard>
  );
}

const StyledIdeaCard = styled(Link)`
  position: relative;
  top: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.color.card};
  color: inherit;
  transition: all 0.1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CardBody = styled(Column)`
  height: 100%;
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSize.lg};
`;

const Description = styled(Paragraph)`
  flex-grow: 1;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TagsContainer = styled(Row)`
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ContainerSpaceBetween = styled(Row)<{ spaceBottom: boolean }>`
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${props => (props.spaceBottom ? props.theme.spacing.md : 0)};
`;

const Author = styled.span`
  font-size: ${props => props.theme.fontSize.sm};
  opacity: 0.7;
`;

const PostDate = styled.span`
  font-size: ${props => props.theme.fontSize.sm};
  opacity: 0.7;
`;

const ReplyCount = styled.span`
  font-size: ${props => props.theme.fontSize.sm};
  margin-right: ${props => props.theme.spacing.xs};
`;

const ReplyCountIcon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.sm};
`;
