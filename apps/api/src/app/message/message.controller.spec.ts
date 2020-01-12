import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

jest.mock('./message.service');

describe('Message Controller', () => {
  let controller: MessageController;
  let service: jest.Mocked<MessageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService]
    }).compile();

    controller = module.get(MessageController);
    service = module.get(MessageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
