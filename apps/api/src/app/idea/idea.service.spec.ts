import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './idea.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdeaEntity, MessageEntity } from '../database/database-entities';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { makeIdea } from '../shared/test-helpers/test-data.helpers';
import { onError, onNext } from '../shared/test-helpers/test-subscribe-helpers';
import { NotFoundException } from '@nestjs/common';

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

  describe('While fetching all ideas', () => {
    let ideaEntities: IdeaEntity[];

    beforeEach(() => {
      ideaEntities = [
        makeIdea('1', 'Fake Idea 1'),
        makeIdea('2', 'Fake Idea 2')
      ];

      repository.find.mockReturnValueOnce(Promise.resolve(ideaEntities));
    });

    it('should call the repository exactly once', done => {
      ideaService.findAll$().subscribe(
        onNext(() => {
          expect(repository.find).toHaveBeenCalledTimes(1);
          expect(repository.find).toHaveBeenCalledWith({
            where: { isDeleted: false }
          });
          done();
        })
      );
    });

    it('should return all idea entities', done => {
      ideaService.findAll$().subscribe(
        onNext(ideas => {
          expect(ideas).toEqual(ideaEntities);
          done();
        })
      );
    });
  });

  describe('While fetching one idea', () => {
    let ideaEntity: IdeaEntity;

    beforeEach(() => {
      ideaEntity = makeIdea('1', 'Fake Idea 1');
    });

    describe('that exists', () => {
      beforeEach(() => {
        repository.findOneOrFail.mockReturnValueOnce(
          Promise.resolve(ideaEntity)
        );
      });

      it('should call the repository with id', done => {
        ideaService.findById$('1').subscribe(
          onNext(() => {
            expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
            expect(repository.findOneOrFail).toHaveBeenCalledWith('1', {
              where: { isDeleted: false }
            });
            done();
          })
        );
      });

      it('should return the idea', done => {
        ideaService.findById$('1').subscribe(
          onNext(idea => {
            expect(idea).toEqual(ideaEntity);
            done();
          })
        );
      });
    });

    describe('that does not exist', () => {
      beforeEach(() => {
        repository.findOneOrFail.mockReturnValueOnce(Promise.reject(''));
      });

      it('should throw an error', done => {
        ideaService.findById$('1').subscribe(
          onError(error => {
            expect(error instanceof NotFoundException).toBeTruthy();
            expect(error.message.message).toBe('Cannot find idea with id: 1.');
            done();
          })
        );
      });
    });
  });
});
