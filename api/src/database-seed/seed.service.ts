import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { SEED_CONFIG_TOKEN, TAG_SEED_TOKEN } from './seed.constants';
import { SeedConfig } from './seed-config.interface';
import * as faker from 'faker';
import { random, range } from 'lodash';
import { UserEntity } from '../app/database/entities/user.entity';
import { IdeaEntity } from '../app/database/entities/idea.entity';
import { TagEntity } from '../app/database/entities/tag.entity';
import { MessageEntity } from '../app/database/entities/message.entity';

@Injectable()
export class SeedService {
  constructor(
    @Inject(SEED_CONFIG_TOKEN) private readonly config: SeedConfig,
    @Inject(TAG_SEED_TOKEN) private readonly tags: Array<Partial<TagEntity>>,
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

  async seed(): Promise<void> {
    await this.dropAndSyncDatabase();

    const tags = await this.tagRepository.save(this.tags);
    const users = await this.seedUsers();

    for (const user of users) {
      await this.seedIdeas(user, users, tags);
    }
  }

  private async dropAndSyncDatabase(): Promise<void> {
    const shouldDropBeforeSync = true;
    return this.connection.synchronize(shouldDropBeforeSync);
  }

  private async seedUsers(): Promise<UserEntity[]> {
    const users = range(0, this.config.userCount).map(() => {
      return this.userRepository.create({
        id: faker.random.number(),
        username: faker.internet.userName(),
        picture: faker.image.avatar()
      });
    });

    return this.userRepository.save(users);
  }

  private async seedIdeas(
    author: UserEntity,
    users: UserEntity[],
    tags: TagEntity[]
  ): Promise<IdeaEntity[]> {
    const ideas = range(0, this.config.ideasPerUserCount).map(() => {
      const messages = this.createMessagesForIdea(users);
      return this.createIdea(author, tags, messages);
    });

    return this.ideaRepository.save(ideas);
  }

  private createMessagesForIdea(users: UserEntity[]): MessageEntity[] {
    return range(0, this.config.messagesPerIdeaCount).map(() => {
      const author = users[random(0, users.length - 1)];

      return this.messageRepository.create({
        text: faker.hacker.phrase(),
        author
      });
    });
  }

  private createIdea(
    author: UserEntity,
    tags: TagEntity[],
    messages: MessageEntity[]
  ): IdeaEntity {
    return this.ideaRepository.create({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(),
      difficulty: random(1, 5),
      author,
      messages,
      tags: [tags[random(0, tags.length - 1)]]
    });
  }
}
