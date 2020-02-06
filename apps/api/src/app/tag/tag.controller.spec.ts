import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { makeTag } from '../shared/test-helpers/make-entities.test-utils';
import { of } from 'rxjs';

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

  it('should fetch all the tags', done => {
    const expectedTags = [makeTag(), makeTag()];
    service.findAll$.mockReturnValueOnce(of(expectedTags));

    controller.findAll().subscribe(tags => {
      expect(tags).toEqual(expectedTags);
      done();
    });
  });
});
