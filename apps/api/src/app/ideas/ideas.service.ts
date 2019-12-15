import { Injectable } from '@nestjs/common';
import { Idea, Ideas } from '@moderate/api-interfaces';
import { IdeaNotFoundException } from '../shared/exceptions';

@Injectable()
export class IdeasService {
  private readonly ideas: Ideas = {
    1: {
      id: 1,
      title: 'The first idea',
      description: 'The first description',
      difficulty: 3,
      tags: ['full-stack']
    },
    2: {
      id: 1,
      title: 'The second idea',
      description: 'The second description',
      difficulty: 4,
      tags: ['javascript']
    },
    3: {
      id: 1,
      title: 'The third idea',
      description: 'The third description',
      difficulty: 2,
      tags: ['typescript']
    }
  };

  findAll(): Ideas {
    return this.ideas;
  }

  find(id: number): Idea {
    const idea = this.ideas[id];

    if (!idea) {
      throw new IdeaNotFoundException(`Cannot find idea with id: ${id}.`);
    }

    return idea;
  }

  create(idea: Idea): void {
    const id = new Date().valueOf();
    this.ideas[id] = { ...idea, id };
  }

  update(updateIdea: Idea): void {
    const { id } = updateIdea;

    if (!this.ideas[id]) {
      throw new IdeaNotFoundException(
        `Cannot find idea with id: ${id} to update.`
      );
    }

    this.ideas[id] = updateIdea;
  }

  delete(id: number): void {
    const idea = this.ideas[id];

    if (!idea) {
      throw new IdeaNotFoundException(
        `Cannot find idea with id: ${id} to delete.`
      );
    }

    delete this.ideas[id];
  }
}
