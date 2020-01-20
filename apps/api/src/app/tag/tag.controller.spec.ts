import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { of } from 'rxjs';
import { onNext } from '../shared/test-helpers/test-subscribe-helpers';
import { TagEntity } from '../database/database-entities';
import { makeTag } from '../shared/test-helpers/test-data.helpers';

jest.mock('./tag.service');

describe('Tag Controller', () => {
  let controller: TagController;
  let service: jest.Mocked<TagService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService]
    }).compile();

    controller = module.get(TagController);
    service = module.get(TagService);
  });

  describe('while fetching all tags', () => {
    let tagEntities: TagEntity[];

    beforeEach(() => {
      tagEntities = [makeTag('1', 'Jest', '#000000')];
      service.findAll$.mockReturnValueOnce(of(tagEntities));
    });

    it('should retrieve all tags exactly once', done => {
      controller.findAll().subscribe(
        onNext(() => {
          expect(service.findAll$).toHaveBeenCalledTimes(1);
          done();
        })
      );
    });

    it('should return the tags', done => {
      controller.findAll().subscribe(
        onNext(tags => {
          expect(tags).toEqual(tagEntities);
          done();
        })
      );
    });
  });
});
