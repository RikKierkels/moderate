import React, { useEffect, useState } from 'react';
import './IdeaGrid.scss';
import { Idea } from '../shared/interfaces/idea.interface';
import IdeaGridItem from './IdeaGridItem';
import config from '../shared/config';

export default function IdeaGrid(): JSX.Element {
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
    <section className="idea-grid">
      {ideas.map(idea => (
        <IdeaGridItem key={idea.id} idea={idea} />
      ))}
      <p>{error}</p>
    </section>
  );
}
