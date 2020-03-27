import { Idea, IdeaToCreate } from '../shared/interfaces/idea.interface';
import config from '../shared/config/config';
import { makeHeaders } from '../shared/utils/api-utils';
import { Tag } from '../shared/interfaces/tag.interface';

async function getIdeas(): Promise<Idea[] | Error> {
  try {
    const response = await fetch(`${config.api.url}/ideas`);
    return await response.json();
  } catch {
    throw new Error('Something went wrong while fetching the ideas.');
  }
}

async function getTags(): Promise<Tag[] | Error> {
  try {
    const response = await fetch(`${config.api.url}/tags`);
    return await response.json();
  } catch {
    throw new Error('Something went wrong while fetching the tags.');
  }
}

async function createIdea(
  idea: IdeaToCreate,
  token: string
): Promise<boolean | Error> {
  try {
    const response = await fetch(`${config.api.url}/ideas`, {
      method: 'post',
      ...makeHeaders(token),
      body: JSON.stringify(idea)
    });
    return response.ok;
  } catch (e) {
    throw new Error(e.message);
  }
}

export { getIdeas, getTags, createIdea };
