import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tags } from './data';
import {
  IdeaEntity,
  MessageEntity,
  TagEntity
} from '../app/database/database-entities';
import * as faker from 'faker';

@Injectable()
export class SeedService {
  ideasPerTagCount = 5;

  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}

  async seed(): Promise<void> {
    await this.clearDatabase();
    await this.seedTags();
    await this.seedIdeas();
  }

  private async clearDatabase(): Promise<void> {
    await this.ideaRepository.delete({});
    await this.tagRepository.delete({});
    await this.messageRepository.delete({});
  }

  private async seedTags(): Promise<void> {
    for (const tag of tags) {
      await this.tagRepository.save(tag);
    }
  }

  private async seedIdeas(): Promise<void> {
    for (const { name } of tags) {
      const tag = await this.tagRepository.findOneOrFail({ name });

      for (let i = 0; i < this.ideasPerTagCount; i++) {
        const idea = this.createIdea(tag, i);
        await this.ideaRepository.save(idea);
      }
    }
  }

  private createIdea(tag: TagEntity, index: number): Partial<IdeaEntity> {
    return {
      title: faker.hacker.phrase(),
      description: faker.lorem.paragraph(),
      difficulty: index + 1,
      authorId: faker.random.uuid(),
      tags: [tag]
    };
  }
}
