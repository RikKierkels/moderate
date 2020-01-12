import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { of } from 'rxjs';
import { MessageCreateDto, MessageDto } from './message.model';
import { MessageEntity } from '../database/database-entities';

jest.mock('./message.service');

const userId = 'user1';
const messageCreateDto: MessageCreateDto = {
  ideaId: 'idea1',
  text: 'Fake Message'
};
const messageEntity: Partial<MessageEntity> = {
  id: '1',
  text: messageCreateDto.text,
  author: { id: userId, username: '', picture: '', ideas: [], messages: [] },
  createdAt: new Date()
};

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

  describe('While creating a message', () => {
    beforeEach(() => {
      service.create$.mockReturnValueOnce(of(messageEntity as MessageEntity));
    });

    it('should call the message service', () => {
      controller.create(messageCreateDto, userId).subscribe({
        next: () => {
          expect(service.create$).toHaveBeenCalledTimes(1);
          expect(service.create$).toHaveBeenCalledWith(
            messageCreateDto,
            userId
          );
        },
        error: () => fail()
      });
    });

    it('should map the created message to a DTO', () => {
      controller.create(messageCreateDto, userId).subscribe({
        next: actualMessage =>
          expect(actualMessage instanceof MessageDto).toBeTruthy(),
        error: () => fail()
      });
    });
  });
});
