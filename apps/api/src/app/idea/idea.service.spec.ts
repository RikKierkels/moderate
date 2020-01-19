import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './idea.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdeaEntity, MessageEntity } from '../database/database-entities';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';

jest.mock('../user/user.service');
jest.mock('../tag/tag.service');

describe('IdeaService', () => {
  let ideaService: IdeaService;
  let userService: jest.Mocked<UserService>;
  let tagService: jest.Mocked<TagService>;
  let repository: MockType<Repository<MessageEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeaService,
        UserService,
        TagService,
        {
          provide: getRepositoryToken(IdeaEntity),
          useValue: repositoryMockFactory()
        }
      ]
    }).compile();

    ideaService = module.get(IdeaService);
    userService = module.get(UserService);
    tagService = module.get(TagService);
    repository = module.get(getRepositoryToken(IdeaEntity));
  });

  it('should be defined', () => {
    expect(ideaService).toBeDefined();
  });
});
