import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import IdeaCard from '../components/IdeaCard';
import { RootState } from '../../app/root-reducer';
import { fetchIdeasRequest } from '../actions';

const mapState = (state: RootState) => ({
  ideas: state.idea.ideas,
  error: state.idea.errorMessage
});
const mapDispatch = { fetchIdeas: fetchIdeasRequest };
const connector = connect(mapState, mapDispatch);

type IdeaOverviewProps = ConnectedProps<typeof connector>;
function IdeaOverview({ ideas, error, fetchIdeas }: IdeaOverviewProps) {
  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return (
    <StyledIdeaOverview>
      {ideas.map(idea => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
      {error && <p>{error}</p>}
    </StyledIdeaOverview>
  );
}

export default connector(IdeaOverview);

const StyledIdeaOverview = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${props => props.theme.spacing.lg};

  @media ${props => props.theme.breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;
