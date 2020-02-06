import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { makeTag } from '../shared/test-helpers/make-entities.test-utils';
import { of } from 'rxjs';

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

  it('should fetch all the tag', done => {
    const expectedTags = [makeTag(), makeTag()];
    repository.find.mockReturnValueOnce(of(expectedTags));

    service.findAll$().subscribe(tags => {
      expect(tags).toEqual(expectedTags);
      done();
    });
  });

  it('should find tags by their ids', done => {
    const expectedTags = [makeTag(), makeTag()];
    repository.findByIds.mockReturnValueOnce(Promise.resolve(expectedTags));

    const ids = expectedTags.map(tag => tag.id);
    service.findByIds$(ids).subscribe(tags => {
      expect(tags).toEqual(expectedTags);
      done();
    });
  });

  it("should throw an error if one or more tags can't be found", done => {
    const expectedTags = [makeTag(), makeTag()];
    repository.findByIds.mockReturnValueOnce(Promise.resolve(expectedTags));

    const ids = expectedTags.map(tag => tag.id);
    service.findByIds$([...ids, 'Fake Id']).subscribe(tags => {
      expect(tags).toEqual(expectedTags);
      done();
    });
  });
});
