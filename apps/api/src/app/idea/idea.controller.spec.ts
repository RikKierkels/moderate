import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { of } from 'rxjs';
import { IdeaCreateDto } from './models/idea-create.dto';
import { IdeaUpdateDto } from './models/idea-update.dto';
import { makeIdea } from '../shared/test-helpers/make-entities.test-utils';
import * as faker from 'faker';

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
    const ideas = [makeIdea(), makeIdea()];
    service.findAll$.mockReturnValueOnce(of(ideas));

    controller.findAll().subscribe(response => {
      expect(response).toEqual(ideas);
      done();
    });
  });

  it('should fetch an idea by id', done => {
    const idea = makeIdea();
    service.findById$.mockReturnValueOnce(of(idea));

    controller.find({ id: idea.id }).subscribe(response => {
      expect(response).toEqual(idea);
      done();
    });
  });

  it('should create an idea', done => {
    const idea = makeIdea();
    const ideaCreateDto: IdeaCreateDto = {
      title: idea.title,
      difficulty: idea.difficulty,
      description: idea.description,
      tags: ['1']
    };
    service.create$.mockReturnValueOnce(of(idea));

    controller
      .create(ideaCreateDto, faker.random.uuid())
      .subscribe(response => {
        expect(response).toEqual(idea);
        done();
      });
  });

  it('should update an idea', done => {
    const idea = makeIdea();
    const ideaUpdateDto: IdeaUpdateDto = {
      id: idea.id,
      title: idea.title,
      difficulty: idea.difficulty,
      description: idea.description,
      tags: ['1']
    };
    service.update$.mockReturnValueOnce(of(idea));

    controller.update(ideaUpdateDto).subscribe(response => {
      expect(response).toEqual(idea);
      done();
    });
  });

  it('should delete an idea', () => {
    const idea = makeIdea();
    service.delete$.mockReturnValueOnce(of(idea));

    controller.delete({ id: idea.id });

    expect(service.delete$).toHaveBeenCalledWith(idea.id);
  });
});
