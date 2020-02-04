import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { of } from 'rxjs';
import { makeMessage } from '../shared/test-helpers/make-entities.test-utils';
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

  it('should create a message', done => {
    const expectedMessage = makeMessage();
    const messageCreateDto: MessageCreateDto = {
      ideaId: '1',
      text: expectedMessage.text
    };
    service.create$.mockReturnValueOnce(of(expectedMessage));

    controller
      .create(messageCreateDto, expectedMessage.author.id)
      .subscribe(response => {
        expect(response).toEqual(expectedMessage);
        done();
      });
  });

  it('should update a message', done => {
    const expectedMessage = makeMessage();
    const messageUpdateDto: MessageUpdateDto = {
      id: expectedMessage.id,
      text: expectedMessage.text
    };
    service.update$.mockReturnValueOnce(of(expectedMessage));

    controller.update(messageUpdateDto).subscribe(response => {
      expect(response).toEqual(expectedMessage);
      done();
    });
  });

  it('should delete a message', () => {
    controller.delete({ id: '1' });

    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
