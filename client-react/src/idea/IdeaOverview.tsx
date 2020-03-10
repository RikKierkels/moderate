import React, { useEffect, useState } from 'react';
import { Idea } from '../shared/interfaces/idea.interface';

export default function IdeaOverview(): JSX.Element {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<JSX.Element>();

  async function getIdeas(): Promise<void> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ideas`);
      setIdeas(await response.json());
    } catch {
      setError(<div>Something went wrong while fetching the ideas.</div>);
    }
  }

  useEffect(() => {
    getIdeas();
  }, []);

  return <div>{error}</div>;
}
