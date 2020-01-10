import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Type } from '@nestjs/common';
import { ValueProvider } from '@nestjs/common/interfaces';
import { Repository, UpdateResult } from 'typeorm';

function mockRepositoryProvider<T>(entity: Type<T>): ValueProvider {
  return {
    provide: getRepositoryToken(entity),
    useValue: {
      find: (): Promise<T[]> => null,
      findOne: (): Promise<T> => null,
      findOneOrFail: (): Promise<T> => null,
      findByIds: (): Promise<T[]> => null,
      update: (): Promise<UpdateResult> => null,
      save: (): Promise<T[]> => null
    }
  };
}

const tagEntities: TagEntity[] = [
  { id: '1', color: '#000000', name: 'Jest' },
  { id: '2', color: '#ffffff', name: 'Jasmine' }
];

describe('TagService', () => {
  let service: TagService;
  let repository: Repository<TagEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService, mockRepositoryProvider<TagEntity>(TagEntity)]
    }).compile();

    service = module.get<TagService>(TagService);
    repository = module.get<Repository<TagEntity>>(
      getRepositoryToken(TagEntity)
    );
  });

  describe('finding all tags', () => {
    it('should return all tags', () => {
      jest
        .spyOn(repository, 'find')
        .mockReturnValueOnce(Promise.resolve(tagEntities));
    });
  });
});
