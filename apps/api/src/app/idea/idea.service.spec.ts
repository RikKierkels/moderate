import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './idea.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  IdeaEntity,
  MessageEntity,
  TagEntity,
  UserEntity
} from '../database/database-entities';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import {
  makeIdea,
  makeMessage,
  makeTag,
  makeUser
} from '../shared/test-helpers/make-entities.test-utils';
import { onError, onNext } from '../shared/test-helpers/subscribe.test-utils';
import { NotFoundException } from '@nestjs/common';
import { IdeaCreateDto } from './models/idea-create.dto';
import { of } from 'rxjs';
import { IdeaUpdateDto } from './models/idea-update.dto';

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

  describe('While creating a new Idea', () => {
    let ideaCreateDto: IdeaCreateDto;
    let user: UserEntity;
    let tags: TagEntity[];
    let ideaEntity: IdeaEntity;

    beforeEach(() => {
      ideaCreateDto = {
        title: 'Fake Idea',
        description: 'Super Fake',
        difficulty: 5,
        tags: ['1']
      };

      user = makeUser('github123');
      userService.findOrCreate$.mockReturnValueOnce(of(user));

      tags = [makeTag('1', 'Jest', '#000000')];
      tagService.findByIds$.mockReturnValueOnce(of(tags));

      ideaEntity = makeIdea('1', 'Fake Idea');
      repository.create.mockReturnValueOnce({});
      repository.save.mockReturnValueOnce(Promise.resolve(ideaEntity));
    });

    it('should call the user service with the user id', done => {
      ideaService.create$(ideaCreateDto, 'github123').subscribe(
        onNext(() => {
          expect(userService.findOrCreate$).toHaveBeenCalledTimes(1);
          expect(userService.findOrCreate$).toHaveBeenCalledWith('github123');
          done();
        })
      );
    });

    it('should call the tag service with the tag ids', done => {
      ideaService.create$(ideaCreateDto, 'github123').subscribe(
        onNext(() => {
          expect(tagService.findByIds$).toHaveBeenCalledTimes(1);
          expect(tagService.findByIds$).toHaveBeenCalledWith(['1']);
          done();
        })
      );
    });

    it('should add the user and tags to the idea', done => {
      ideaService.create$(ideaCreateDto, 'github123').subscribe(
        onNext(() => {
          expect(repository.create).toHaveBeenCalledTimes(1);
          expect(repository.create).toHaveBeenCalledWith({
            ...ideaCreateDto,
            tags,
            author: user
          });
          done();
        })
      );
    });

    it('should return the created idea', done => {
      ideaService.create$(ideaCreateDto, 'github123').subscribe(
        onNext(idea => {
          expect(idea).toEqual(ideaEntity);
          done();
        })
      );
    });
  });

  describe('While updating an idea', () => {
    let ideaUpdateDto: IdeaUpdateDto;
    let ideaEntity: IdeaEntity;
    let tags: TagEntity[];

    beforeEach(() => {
      ideaUpdateDto = {
        id: '1',
        title: 'Fake Idea',
        description: 'Omega Fake',
        difficulty: 5,
        tags: ['1']
      };

      tags = [makeTag('1', 'Jest', '#000000')];
      tagService.findByIds$.mockReturnValueOnce(of(tags));

      ideaEntity = makeIdea('1', 'Fake Idea');
      repository.create.mockReturnValueOnce(ideaEntity);
      repository.save.mockReturnValueOnce(Promise.resolve(ideaEntity));
      repository.findOne.mockReturnValueOnce(Promise.resolve(ideaEntity));
    });

    it('should fetch the tags from the tag service', done => {
      ideaService.update$(ideaUpdateDto).subscribe(
        onNext(() => {
          expect(tagService.findByIds$).toHaveBeenCalledTimes(1);
          expect(tagService.findByIds$).toHaveBeenCalledWith(['1']);
          done();
        })
      );
    });

    it('should add the found tags to the idea', done => {
      ideaService.update$(ideaUpdateDto).subscribe(
        onNext(() => {
          expect(repository.create).toHaveBeenCalledTimes(1);
          expect(repository.create).toHaveBeenCalledWith({
            ...ideaUpdateDto,
            tags
          });
          done();
        })
      );
    });

    it('should save the idea', done => {
      ideaService.update$(ideaUpdateDto).subscribe(
        onNext(() => {
          expect(repository.save).toHaveBeenCalledTimes(1);
          expect(repository.save).toHaveBeenCalledWith(ideaEntity);
          done();
        })
      );
    });

    it('should fetch the updated idea', done => {
      ideaService.update$(ideaUpdateDto).subscribe(
        onNext(() => {
          expect(repository.findOne).toHaveBeenCalledTimes(1);
          expect(repository.findOne).toHaveBeenCalledWith('1');
          done();
        })
      );
    });

    it('should return the updated idea', done => {
      ideaService.update$(ideaUpdateDto).subscribe(
        onNext(idea => {
          expect(idea).toEqual(ideaEntity);
          done();
        })
      );
    });
  });

  describe('While deleting an idea', () => {
    let ideaEntity: IdeaEntity;

    beforeEach(() => {
      ideaEntity = makeIdea('1', 'Fake Idea', 'Mega Fake', 5, makeUser(), [
        makeMessage('1', 'Fake Message 1'),
        makeMessage('1', 'Fake Message 2')
      ]);

      repository.findOneOrFail.mockReturnValueOnce(of(ideaEntity));
      repository.save.mockImplementationOnce(entity => of(entity));
    });

    it('should flag the idea as deleted', done => {
      ideaService.delete$('1').subscribe(
        onNext(idea => {
          expect(idea.isDeleted).toBeTruthy();
          done();
        })
      );
    });

    it('should flag all messages of the idea as deleted', done => {
      ideaService.delete$('1').subscribe(
        onNext(idea => {
          idea.messages.forEach(message => {
            expect(message.isDeleted).toBeTruthy();
          });
          done();
        })
      );
    });

    it('should soft delete the idea', done => {
      ideaService.delete$('1').subscribe(
        onNext(() => {
          expect(repository.save).toHaveBeenCalledTimes(1);
          done();
        })
      );
    });
  });
});
