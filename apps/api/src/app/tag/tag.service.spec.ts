import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { NotFoundException } from '@nestjs/common';

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

  describe('when fetching all tags', () => {
    beforeEach(() => {
      repository.find.mockReturnValueOnce(Promise.resolve(tagEntities));
    });

    it('should call the repository once', () => {
      service.findAll$().subscribe(() => {
        expect(repository.find).toHaveBeenCalledTimes(1);
      });
    });

    it('should return all tag entities', () => {
      service.findAll$().subscribe(tags => {
        expect(tags).toEqual(tagEntities);
      });
    });
  });

  describe('When finding tags by their id', () => {
    const expectedTag = tagEntities[0];

    beforeEach(() => {
      repository.findByIds.mockReturnValueOnce(Promise.resolve(expectedTag));
    });

    it('should call the repository with the ids', () => {
      service.findByIds$(['1', '2']).subscribe(() => {
        expect(repository.findByIds).toHaveBeenCalledWith(['1', '2']);
      });
    });

    it('should return the tag entities for the ids', () => {
      service.findByIds$([expectedTag.id]).subscribe(tag => {
        expect(tag).toEqual(expectedTag);
      });
    });

    it('should throw an exception if one or more tags cannot be found', () => {
      service.findByIds$(['1', '2']).subscribe({
        error: error => {
          expect(error instanceof NotFoundException).toBeTruthy();
          expect(error.message).toBe(
            'One or more tags with Ids: 1, 2 could not be found.'
          );
        }
      });
    });
  });
});
