import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { of } from 'rxjs';
import { TagDto } from './tag.model';

const tagEntities: TagEntity[] = [{ id: '1', color: '#000000', name: 'Jest' }];

describe('Tag Controller', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        TagService,
        {
          provide: getRepositoryToken(TagEntity),
          useValue: null
        }
      ]
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  describe('finding all tags', () => {
    it('should map found tags to dtos', () => {
      jest.spyOn(service, 'findAll$').mockReturnValueOnce(of(tagEntities));

      controller.findAll().subscribe(tags => {
        expect(tags instanceof TagDto).toBeTruthy();
      });
    });
  });
});
