import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './idea.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdeaEntity, MessageEntity } from '../database/database-entities';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { makeIdea } from '../shared/test-helpers/make-entities.test-utils';
import { NotFoundException } from '@nestjs/common';
import { IdeaCreateDto } from './models/idea-create.dto';
import { of } from 'rxjs';
import { IdeaUpdateDto } from './models/idea-update.dto';
import * as faker from 'faker';

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

  it('should fetch an idea by id', done => {
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
    const expectedIdea = makeIdea();
    const ideaCreateDto: IdeaCreateDto = {
      title: expectedIdea.title,
      difficulty: expectedIdea.difficulty,
      description: expectedIdea.description,
      tags: expectedIdea.tags.map(tag => tag.id)
    };
    userService.findOrCreate$.mockReturnValueOnce(of(expectedIdea.author));
    tagService.findByIds$.mockReturnValueOnce(of(expectedIdea.tags));

    ideaService.create$(ideaCreateDto, faker.random.uuid()).subscribe(idea => {
      expect(idea).toEqual({
        ...ideaCreateDto,
        tags: expectedIdea.tags,
        author: expectedIdea.author
      });
      done();
    });
  });

  it('should update an idea', done => {
    const expectedIdea = makeIdea();
    const ideaUpdateDto: IdeaUpdateDto = {
      id: expectedIdea.id,
      title: expectedIdea.title,
      difficulty: expectedIdea.difficulty,
      description: expectedIdea.description,
      tags: expectedIdea.tags.map(tag => tag.id)
    };
    tagService.findByIds$.mockReturnValueOnce(of(expectedIdea.tags));
    repository.findOne.mockImplementationOnce(idea => idea);

    ideaService.update$(ideaUpdateDto).subscribe(idea => {
      expect(idea).toEqual({ ...ideaUpdateDto, tags: expectedIdea.tags });
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
