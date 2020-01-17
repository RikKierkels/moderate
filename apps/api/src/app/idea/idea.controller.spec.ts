import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { of } from 'rxjs';
import { IdeaEntity } from '../database/database-entities';
import { makeIdea, makeUser } from '../shared/test-helpers/test-data.helpers';
import { IdeaDto } from './idea.model';
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
});
