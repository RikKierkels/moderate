import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { of } from 'rxjs';
import {
  MessageCreateDto,
  MessageDto,
  MessageUpdateDto
} from './message.model';
import {
  makeAuthor,
  makeMessage
} from '../shared/test-helpers/test-data.helpers';
import { MessageEntity } from '../database/database-entities';

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

  describe('While creating a message', () => {
    let messageCreateDto: MessageCreateDto;
    let messageEntity: MessageEntity;

    beforeEach(() => {
      messageCreateDto = { ideaId: 'idea1', text: 'Fake Message' };
      messageEntity = makeMessage('1', 'Fake Message', makeAuthor());
      service.create$.mockReturnValueOnce(of(messageEntity));
    });

    it('should call the message service', () => {
      controller.create(messageCreateDto, 'github:userid').subscribe({
        next: () => {
          expect(service.create$).toHaveBeenCalledTimes(1);
          expect(service.create$).toHaveBeenCalledWith(
            messageCreateDto,
            'github:userid'
          );
        },
        error: () => fail()
      });
    });

    it('should map the created message to a DTO', () => {
      controller.create(messageCreateDto, 'github:userid').subscribe({
        next: actualMessage =>
          expect(actualMessage instanceof MessageDto).toBeTruthy(),
        error: () => fail()
      });
    });
  });
});
