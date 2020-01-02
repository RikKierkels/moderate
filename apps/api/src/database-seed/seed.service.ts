import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  IdeaEntity,
  MessageEntity,
  TagEntity,
  UserEntity
} from '../app/database/database-entities';
import {
  SEED_CONFIG_TOKEN,
  TAG_SEED_TOKEN,
  USER_SEED_TOKEN
} from './seed.constants';
import { SeedConfig } from './seed-config.interface';
import * as faker from 'faker';

@Injectable()
export class SeedService {
  constructor(
    @Inject(SEED_CONFIG_TOKEN) private readonly config: SeedConfig,
    @Inject(TAG_SEED_TOKEN) private readonly tags: Partial<TagEntity>[],
    @Inject(USER_SEED_TOKEN)
    private readonly users: Partial<UserEntity>[],
    private readonly connection: Connection,
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  static randomItem(items: any): any {
    return items[Math.floor(Math.random() * items.length)];
  }

  static randomNumberBetween(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async seed(): Promise<void> {
    await this.dropAndSyncDatabase();

    const users = await this.userRepository.save(this.users);
    const tags = await this.tagRepository.save(this.tags);

    await this.seedIdeas(users, tags);
  }

  private async dropAndSyncDatabase(): Promise<void> {
    const shouldDropBeforeSync = true;
    await this.connection.synchronize(shouldDropBeforeSync);
  }

  private async seedIdeas(
    users: UserEntity[],
    tags: TagEntity[]
  ): Promise<void> {
    for (const user of users) {
      for (let i = 0; i < this.config.ideaPerUserCount; i++) {
        let messages = this.makeMessagesForIdea(users);
        messages = await this.messageRepository.save(messages);

        const idea = this.makeIdea(user, tags, messages as MessageEntity[]);
        await this.ideaRepository.save(idea);
      }
    }
  }

  private makeMessagesForIdea(users: UserEntity[]): Partial<MessageEntity>[] {
    const messages = [];

    for (let i = 0; i < this.config.messagePerIdeaCount; i++) {
      const author = SeedService.randomItem(users);
      messages.push(this.makeMessage(author));
    }

    return messages;
  }

  private makeMessage(author: UserEntity): Partial<MessageEntity> {
    return {
      text: faker.hacker.phrase(),
      author
    };
  }

  private makeIdea(
    user: UserEntity,
    tags: TagEntity[],
    messages: MessageEntity[]
  ): Partial<IdeaEntity> {
    return {
      title: faker.hacker.phrase(),
      description: faker.lorem.paragraph(),
      difficulty: SeedService.randomNumberBetween(1, 5),
      author: user,
      replies: messages,
      tags: [SeedService.randomItem(tags)]
    };
  }
}
