import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { of } from 'rxjs';
import { onNext } from '../shared/test-helpers/test-subscribe-helpers';

jest.mock('./tag.service');

const tagEntities = [{ id: '1', color: '#000000', name: 'Jest' }];

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
    beforeEach(() => {
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
