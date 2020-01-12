import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../database/mock-repository';

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
        expect(tags).toBe(tagEntities);
      });
    });
  });

  describe('When finding tags by their id', () => {
    it('should call the repository with the ids', () => {
      const ids = tagEntities.map(tag => tag.id);

      service.findByIds$(ids).subscribe(() => {
        expect(repository.findByIds).toHaveBeenCalledWith(['1', '2']);
      });
    });

    it('should return the tag entities for the ids', () => {});
  });
});
