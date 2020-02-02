import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { of } from 'rxjs';
import { IdeaEntity } from '../database/database-entities';
import {
  makeIdea,
  makeUser
} from '../shared/test-helpers/make-entities.test-utils';
import { onNext } from '../shared/test-helpers/subscribe.test-utils';
import { IdeaCreateDto } from './models/idea-create.dto';
import { IdeaUpdateDto } from './models/idea-update.dto';

jest.mock('./idea.service');

const ideaEntities: IdeaEntity[] = [
  makeIdea('1', 'Fake Title', 'Fake Description', 1, makeUser()),
  makeIdea('2', 'Fake Title', 'Fake Description', 1, makeUser())
];

describe('idea Controller', () => {
  let controller: IdeaController;
  let service: jest.Mocked<IdeaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaController],
      providers: [IdeaService]
    }).compile();

    controller = module.get(IdeaController);
    service = module.get(IdeaService);
  });

  describe('While fetching all ideas', () => {
    beforeEach(() => {
      service.findAll$.mockReturnValueOnce(of(ideaEntities));
    });

    it('should return all ideas', done => {
      controller.findAll().subscribe(
        onNext(ideas => {
          expect(ideas).toEqual(ideaEntities);
          done();
        })
      );
    });
  });

  describe('While fetching an idea by id', () => {
    beforeEach(() => {
      service.findById$.mockReturnValueOnce(of(ideaEntities[0]));
    });

    it('should call the service with the id', done => {
      controller.find({ id: '1' }).subscribe(
        onNext(() => {
          expect(service.findById$).toHaveBeenCalledTimes(1);
          expect(service.findById$).toHaveBeenCalledWith('1');
          done();
        })
      );
    });

    it('should return the found idea', done => {
      controller.find({ id: '1' }).subscribe(
        onNext(idea => {
          expect(idea).toEqual(ideaEntities[0]);
          done();
        })
      );
    });
  });

  describe('While creating an idea', () => {
    let ideaCreateDto: IdeaCreateDto;

    beforeEach(() => {
      ideaCreateDto = { title: 'Fake Idea' } as IdeaCreateDto;
      service.create$.mockReturnValueOnce(of(ideaEntities[0]));
    });

    it('should call the service with the correct params', done => {
      controller.create(ideaCreateDto, 'userId').subscribe(
        onNext(() => {
          expect(service.create$).toHaveBeenCalledTimes(1);
          expect(service.create$).toHaveBeenCalledWith(ideaCreateDto, 'userId');
          done();
        })
      );
    });

    it('should return the created idea', done => {
      controller.create(ideaCreateDto, 'userId').subscribe(
        onNext(idea => {
          expect(idea).toEqual(ideaEntities[0]);
          done();
        })
      );
    });
  });

  describe('While updating an idea', () => {
    let ideaUpdateDto: IdeaUpdateDto;

    beforeEach(() => {
      ideaUpdateDto = { id: '1', title: 'Fake Idea' } as IdeaUpdateDto;
      service.update$.mockReturnValueOnce(of(ideaEntities[0]));
    });

    it('should call the service with the idea to update', done => {
      controller.update(ideaUpdateDto).subscribe(
        onNext(() => {
          expect(service.update$).toHaveBeenCalledTimes(1);
          expect(service.update$).toHaveBeenCalledWith(ideaUpdateDto);
          done();
        })
      );
    });

    it('should return the updated idea', done => {
      controller.update(ideaUpdateDto).subscribe(
        onNext(idea => {
          expect(idea).toEqual(ideaEntities[0]);
          done();
        })
      );
    });
  });

  describe('While deleting an idea', () => {
    beforeEach(() => {
      service.delete$.mockReturnValueOnce(of(ideaEntities[0]));
      controller.delete({ id: '1' });
    });

    it('should delete the idea by id', () => {
      expect(service.delete$).toHaveBeenCalledTimes(1);
      expect(service.delete$).toHaveBeenCalledWith('1');
    });
  });
});
