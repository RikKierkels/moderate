import { Test, TestingModule } from '@nestjs/testing';
import { IdeasController } from './ideas.controller';

describe('Idea Controller', () => {
  let controller: IdeasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeasController]
    }).compile();

    controller = module.get<IdeasController>(IdeasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
