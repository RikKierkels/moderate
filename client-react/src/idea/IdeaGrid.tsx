import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Idea } from '../shared/interfaces/idea.interface';
import IdeaCard from './IdeaCard';
import config from '../shared/config/config';

export default function IdeaGrid() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<JSX.Element>();

  async function getIdeas(): Promise<void> {
    try {
      const response = await fetch(`${config.api.url}/ideas`);
      setIdeas(await response.json());
    } catch {
      setError(<div>Something went wrong while fetching the ideas.</div>);
    }
  }

  useEffect(() => {
    getIdeas();
  }, []);

  return (
    <StyledIdeaGrid>
      {ideas.map(idea => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
      {error ? <p>{error}</p> : null}
    </StyledIdeaGrid>
  );
}

const StyledIdeaGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${props => props.theme.spacing.lg};

  @media ${props => props.theme.breakpoint.medium} {
    grid-template-columns: 1fr;
  }
`;
