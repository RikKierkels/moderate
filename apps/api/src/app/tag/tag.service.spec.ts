import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { NotFoundException } from '@nestjs/common';
import { onError, onNext } from '../shared/test-helpers/test-subscribe-helpers';
import { makeTag } from '../shared/test-helpers/test-data.helpers';

describe('TagService', () => {
  let service: TagService;
  let repository: MockType<Repository<TagEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(TagEntity),
          useValue: repositoryMockFactory()
        }
      ]
    }).compile();

    service = module.get(TagService);
    repository = module.get(getRepositoryToken(TagEntity));
  });

  describe('While fetching all tags', () => {
    let tagEntities: TagEntity[];

    beforeEach(() => {
      tagEntities = [
        makeTag('1', 'Jest', '#000000'),
        makeTag('2', 'Jasmine', '#ffffff')
      ];
      repository.find.mockReturnValueOnce(Promise.resolve(tagEntities));
    });

    it('should call the repository once', done => {
      service.findAll$().subscribe(
        onNext(() => {
          expect(repository.find).toHaveBeenCalledTimes(1);
          done();
        })
      );
    });

    it('should return all tag entities', done => {
      service.findAll$().subscribe(
        onNext(tags => {
          expect(tags).toEqual(tagEntities);
          done();
        })
      );
    });
  });

  describe('While finding tags by their id', () => {
    let tagEntity: TagEntity;

    beforeEach(() => {
      tagEntity = makeTag('1', 'Jest', '#000000');
      repository.findByIds.mockReturnValueOnce(Promise.resolve([tagEntity]));
    });

    it('should call the repository with the ids', done => {
      service.findByIds$(['1']).subscribe(
        onNext(() => {
          expect(repository.findByIds).toHaveBeenCalledWith(['1']);
          done();
        })
      );
    });

    it('should return the tag entities for the ids', done => {
      service.findByIds$(['1']).subscribe(
        onNext(tags => {
          expect(tags).toEqual([tagEntity]);
          done();
        })
      );
    });

    it('should throw an exception if one or more tags cannot be found', done => {
      service.findByIds$(['1', '2']).subscribe(
        onError(error => {
          expect(error instanceof NotFoundException).toBeTruthy();
          expect(error.message.message).toBe(
            'One or more tags with Ids: 1, 2 could not be found.'
          );
          done();
        })
      );
    });
  });
});
