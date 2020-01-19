import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { of } from 'rxjs';
import {
  makeMessage,
  makeUser
} from '../shared/test-helpers/test-data.helpers';
import { MessageEntity } from '../database/database-entities';
import { onNext } from '../shared/test-helpers/test-subscribe-helpers';
import { MessageCreateDto } from './models/message-create.dto';
import { MessageUpdateDto } from './models/message-update.dto';

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
      messageEntity = makeMessage('1', 'Fake Message', makeUser());
      service.create$.mockReturnValueOnce(of(messageEntity));
    });

    it('should call the message service with the correct params', done => {
      controller.create(messageCreateDto, 'userid').subscribe(
        onNext(() => {
          expect(service.create$).toHaveBeenCalledTimes(1);
          expect(service.create$).toHaveBeenCalledWith(
            messageCreateDto,
            'userid'
          );
          done();
        })
      );
    });

    it('should return the created message', done => {
      controller.create(messageCreateDto, 'userId').subscribe(
        onNext(message => {
          expect(message).toEqual(messageEntity);
          done();
        })
      );
    });
  });

  describe('While updating a message', () => {
    let messageUpdateDto: MessageUpdateDto;
    let messageEntity: MessageEntity;

    beforeEach(() => {
      messageUpdateDto = { id: '1', text: 'Fake Message' };
      messageEntity = makeMessage('1', 'Fake Message', makeUser());
      service.update$.mockReturnValueOnce(of(messageEntity));
    });

    it('should call the message service with the update DTO', done => {
      controller.update(messageUpdateDto).subscribe(
        onNext(() => {
          expect(service.update$).toHaveBeenCalledTimes(1);
          expect(service.update$).toHaveBeenCalledWith(messageUpdateDto);
          done();
        })
      );
    });

    it('should return the updated message', done => {
      controller.update(messageUpdateDto).subscribe(
        onNext(message => {
          expect(message).toEqual(messageEntity);
          done();
        })
      );
    });
  });

  describe('While deleting a message', () => {
    beforeEach(() => {
      controller.delete({ id: '1' });
    });

    it('should call the message service with the message id', () => {
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
