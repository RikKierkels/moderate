import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { of } from 'rxjs';
import { IdeaCreateDto } from './models/idea-create.dto';
import { IdeaUpdateDto } from './models/idea-update.dto';
import { makeIdea } from '../shared/test-helpers/make-entities.test-utils';

jest.mock('./idea.service');

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

  it('should fetch all ideas', done => {
    const expectedIdeas = [makeIdea(), makeIdea()];
    service.findAll$.mockReturnValueOnce(of(expectedIdeas));

    controller.findAll().subscribe(response => {
      expect(response).toEqual(expectedIdeas);
      done();
    });
  });

  it("should fetch an idea by it's id", done => {
    const expectedIdea = makeIdea();
    service.findById$.mockReturnValueOnce(of(expectedIdea));

    controller.find({ id: expectedIdea.id }).subscribe(response => {
      expect(response).toEqual(expectedIdea);
      done();
    });
  });

  it('should create an idea', done => {
    const expectedIdea = makeIdea();
    const ideaCreateDto: IdeaCreateDto = {
      title: expectedIdea.title,
      difficulty: expectedIdea.difficulty,
      description: expectedIdea.description,
      tags: expectedIdea.tags.map(tag => tag.id)
    };
    service.create$.mockReturnValueOnce(of(expectedIdea));

    controller
      .create(ideaCreateDto, expectedIdea.author.id)
      .subscribe(response => {
        expect(response).toEqual(expectedIdea);
        done();
      });
  });

  it('should update an idea', done => {
    const expectedIdea = makeIdea();
    const ideaUpdateDto: IdeaUpdateDto = {
      id: expectedIdea.id,
      title: expectedIdea.title,
      difficulty: expectedIdea.difficulty,
      description: expectedIdea.description,
      tags: expectedIdea.tags.map(tag => tag.id)
    };
    service.update$.mockReturnValueOnce(of(expectedIdea));

    controller.update(ideaUpdateDto).subscribe(response => {
      expect(response).toEqual(expectedIdea);
      done();
    });
  });

  it('should delete an idea', () => {
    const expectedIdea = makeIdea();
    service.delete$.mockReturnValueOnce(of(expectedIdea));

    controller.delete({ id: expectedIdea.id });

    expect(service.delete$).toHaveBeenCalledWith(expectedIdea.id);
  });
});
