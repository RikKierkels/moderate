import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import IdeaCard from '../components/IdeaCard';
import { RootState } from '../../store/root-reducer';
import { fetchIdeasRequest } from '../../store/idea/actions';

const mapState = (state: RootState) => ({
  ideas: state.idea.ideas,
  error: state.idea.errorMessage
});
const mapDispatch = { fetchIdeas: fetchIdeasRequest };
const connector = connect(mapState, mapDispatch);
type IdeaGridProps = ConnectedProps<typeof connector>;

function IdeaGrid({ ideas, error, fetchIdeas }: IdeaGridProps) {
  useEffect(() => {
    fetchIdeas();
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

export default connector(IdeaGrid);

const StyledIdeaGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${props => props.theme.spacing.lg};

  @media ${props => props.theme.breakpoint.medium} {
    grid-template-columns: 1fr;
  }
`;
