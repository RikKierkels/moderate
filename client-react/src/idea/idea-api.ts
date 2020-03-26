import { Idea, IdeaToCreate } from '../shared/interfaces/idea.interface';
import config from '../shared/config/config';

function makeHeaders(token: string) {
  return {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': `Bearer ${token}`
    })
  };
}

async function getIdeas(): Promise<Idea[] | Error> {
  try {
    const response = await fetch(`${config.api.url}/ideas`);
    return await response.json();
  } catch {
    throw new Error('Something went wrong while fetching the ideas.');
  }
}

async function createIdea(
  idea: IdeaToCreate,
  token: string
): Promise<boolean | Error> {
  try {
    const headers = makeHeaders(token);
    const response = await fetch(`${config.api.url}/ideas`, {
      method: 'post',
      ...headers,
      body: JSON.stringify(idea)
    });
    return response.ok;
  } catch (e) {
    throw new Error(e.message);
  }
}

export { getIdeas, createIdea };
