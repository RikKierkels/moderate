import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { of } from 'rxjs';
import { IdeaEntity } from '../database/database-entities';
import { makeIdea, makeUser } from '../shared/test-helpers/test-data.helpers';
import { IdeaCreateDto, IdeaDto, IdeaUpdateDto } from './idea.model';
import { onNext } from '../shared/test-helpers/test-subscribe-helpers';

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

    it('should map the ideas as DTOs', done => {
      controller.findAll().subscribe(
        onNext(ideas => {
          ideas.forEach(idea => expect(idea instanceof IdeaDto).toBeTruthy());
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

    it('should map the idea to a DTO', done => {
      controller.find({ id: '1' }).subscribe(
        onNext(idea => {
          expect(idea instanceof IdeaDto).toBeTruthy();
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

    it('should map the returned idea to a DTO', done => {
      controller.create(ideaCreateDto, 'userId').subscribe(
        onNext(idea => {
          expect(idea instanceof IdeaDto).toBeTruthy();
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
        })
      );
    });

    it('should map the updated idea to a DTO', done => {
      controller.update(ideaUpdateDto).subscribe(
        onNext(idea => {
          expect(idea instanceof IdeaDto).toBeTruthy();
          done();
        })
      );
    });
  });

  describe('While deleting an idea', () => {
    beforeEach(() => {
      controller.delete({ id: '1' });
    });

    it('should delete the idea by id', () => {
      expect(service.delete$).toHaveBeenCalledTimes(1);
      expect(service.delete$).toHaveBeenCalledWith('1');
    });
  });
});
