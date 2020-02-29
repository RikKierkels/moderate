import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './idea.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import {
  makeIdea,
  makeTag,
  makeUser
} from '../shared/test-helpers/make-entities.test-utils';
import { NotFoundException } from '@nestjs/common';
import { IdeaCreateDto } from './models/idea-create.dto';
import { of } from 'rxjs';
import { IdeaUpdateDto } from './models/idea-update.dto';
import * as faker from 'faker';
import { random } from 'lodash';
import { IdeaEntity } from '../database/entities/idea.entity';
import { MessageEntity } from '../database/entities/message.entity';

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

  it('should fetch all ideas', done => {
    const expectedIdeas = [makeIdea(), makeIdea()];
    repository.find.mockReturnValueOnce(Promise.resolve(expectedIdeas));

    ideaService.findAll$().subscribe(ideas => {
      expect(ideas).toEqual(expectedIdeas);
      done();
    });
  });

  it("should fetch an idea by it's id", done => {
    const expectedIdea = makeIdea();
    repository.findOneOrFail.mockReturnValueOnce(Promise.resolve(expectedIdea));

    ideaService.findById$(expectedIdea.id).subscribe(idea => {
      expect(idea).toEqual(expectedIdea);
      done();
    });
  });

  it("should throw an error if an idea can't be found", done => {
    const expectedIdea = makeIdea();
    repository.findOneOrFail.mockReturnValueOnce(Promise.reject(''));

    ideaService.findById$(expectedIdea.id).subscribe({
      error: error => {
        expect(error instanceof NotFoundException).toBeTruthy();
        expect(error.message.message).toBe(
          `Cannot find idea with id: ${expectedIdea.id}.`
        );
        done();
      }
    });
  });

  it('should create a new idea', done => {
    const expectedUser = makeUser();
    const expectedTags = [makeTag(), makeTag()];
    const ideaCreateDto: IdeaCreateDto = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(),
      difficulty: random(1, 5),
      tags: expectedTags.map(tag => tag.id)
    };
    userService.findOrCreate$.mockReturnValueOnce(of(expectedUser));
    tagService.findByIds$.mockReturnValueOnce(of(expectedTags));

    ideaService.create$(ideaCreateDto, expectedUser.id).subscribe(idea => {
      expect(idea).toEqual({
        ...ideaCreateDto,
        tags: expectedTags,
        author: expectedUser
      });
      done();
    });
  });

  it('should update an idea', done => {
    const expectedTags = [makeTag(), makeTag()];
    const ideaUpdateDto: IdeaUpdateDto = {
      id: faker.random.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(),
      difficulty: random(1, 5),
      tags: expectedTags.map(tag => tag.id)
    };
    tagService.findByIds$.mockReturnValueOnce(of(expectedTags));
    repository.findOne.mockImplementationOnce(idea => idea);

    ideaService.update$(ideaUpdateDto).subscribe(idea => {
      expect(repository.save).toHaveBeenCalledWith({
        ...ideaUpdateDto,
        tags: expectedTags
      });
      done();
    });
  });

  it('should flag the idea and messages as deleted', done => {
    const expectedIdea = makeIdea();
    repository.findOneOrFail.mockReturnValueOnce(Promise.resolve(expectedIdea));

    ideaService.delete$(expectedIdea.id).subscribe(idea => {
      expect(idea.isDeleted).toBeTruthy();
      idea.messages.forEach(message => expect(message.isDeleted).toBeTruthy());
      done();
    });
  });
});
