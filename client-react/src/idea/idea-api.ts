import { Idea, IdeaCreate } from '../shared/interfaces/idea.interface';
import config from '../shared/config/config';
import { makeHeaders } from '../shared/utils/api-utils';

async function getAll(): Promise<Idea[] | Error> {
  try {
    const response = await fetch(`${config.api.url}/ideas`);
    return await response.json();
  } catch {
    throw new Error('Something went wrong while fetching the ideas.');
  }
}

async function create(
  idea: IdeaCreate,
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

export { getAll, create };
