import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tags } from './data';
import {
  IdeaEntity,
  MessageEntity,
  TagEntity
} from '../app/database/database-entities';

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

  async seed() {
    await this.clearDatabase();
    this.seedTags();
    await this.seedIdeas();
  }

  private async clearDatabase() {
    await this.ideaRepository.delete({});
    await this.tagRepository.delete({});
    await this.messageRepository.delete({});
  }

  private seedTags(): void {
    for (const tag of tags) {
      this.tagRepository.create(tag);
    }
  }

  private async seedIdeas() {
    for (const { name } of tags) {
      const tag = await this.tagRepository.findOneOrFail({ name });

      for (let i = 0; i < this.ideasPerTagCount; i++) {
        const idea = this.createIdea(tag, i);
        this.ideaRepository.create(idea);
      }
    }
  }

  private createIdea(tag: TagEntity, index: number): Partial<IdeaEntity> {
    return {
      title: '123',
      description: '123',
      difficulty: index,
      authorId: '123',
      tags: []
    };
  }
}
