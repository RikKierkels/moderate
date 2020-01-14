import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { of } from 'rxjs';
import { TagDto } from './tag.model';

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
    beforeEach(() => {
      const tagEntities = [{ id: '1', color: '#000000', name: 'Jest' }];
      service.findAll$.mockReturnValueOnce(of(tagEntities));
    });

    it('should retrieve all tags exactly once', () => {
      controller.findAll().subscribe({
        next: () => expect(service.findAll$).toHaveBeenCalledTimes(1),
        error: () => fail()
      });
    });

    it('should map found tags to DTOs', () => {
      controller.findAll().subscribe({
        next: tags => expect(tags instanceof TagDto).toBeTruthy(),
        error: () => fail()
      });
    });
  });
});
