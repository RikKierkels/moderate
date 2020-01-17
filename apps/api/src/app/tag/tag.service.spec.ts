import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { NotFoundException } from '@nestjs/common';
import { onError, onNext } from '../shared/test-helpers/test-subscribe-helpers';

const tagEntities: TagEntity[] = [
  { id: '1', color: '#000000', name: 'Jest' },
  { id: '2', color: '#ffffff', name: 'Jasmine' }
];

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
    beforeEach(() => {
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
    const expectedTag = tagEntities[0];

    beforeEach(() => {
      repository.findByIds.mockReturnValueOnce(Promise.resolve([expectedTag]));
    });

    it('should call the repository with the ids', done => {
      service.findByIds$([expectedTag.id]).subscribe(
        onNext(() => {
          expect(repository.findByIds).toHaveBeenCalledWith([expectedTag.id]);
          done();
        })
      );
    });

    it('should return the tag entities for the ids', done => {
      service.findByIds$([expectedTag.id]).subscribe(
        onNext(tags => {
          expect(tags).toEqual([expectedTag]);
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
