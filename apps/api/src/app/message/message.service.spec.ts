import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { IdeaService } from '../idea/idea.service';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { MessageEntity } from '../database/database-entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  makeAuthor,
  makeMessage
} from '../shared/test-helpers/test-data.helpers';
import { NotFoundException } from '@nestjs/common';

jest.mock('../user/user.service');
jest.mock('../idea/idea.service');

describe('MessageService', () => {
  let messageService: MessageService;
  let userService: jest.Mocked<UserService>;
  let ideaService: jest.Mocked<IdeaService>;
  let repository: MockType<Repository<MessageEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        UserService,
        IdeaService,
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: repositoryMockFactory()
        }
      ]
    }).compile();

    messageService = module.get(MessageService);
    userService = module.get(UserService);
    ideaService = module.get(IdeaService);
    repository = module.get(getRepositoryToken(MessageEntity));
  });

  describe('While finding a message by Id', () => {
    const options = { where: { isDeleted: false } };
    let messageEntity: MessageEntity;

    beforeEach(() => {
      messageEntity = makeMessage('1', 'Fake Message', makeAuthor());
    });

    it('should call the repository with the id', () => {
      repository.findOneOrFail.mockReturnValueOnce(
        Promise.resolve(messageEntity)
      );

      messageService.findById$('1').subscribe({
        next: () => {
          expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
          expect(repository.findOneOrFail).toHaveBeenCalledWith('1', options);
        },
        error: () => fail()
      });
    });

    it('should return the message entity for an existing id', () => {
      repository.findOneOrFail.mockReturnValueOnce(
        Promise.resolve(messageEntity)
      );

      messageService.findById$('1').subscribe({
        next: message => expect(message).toEqual(messageEntity),
        error: () => fail()
      });
    });

    it('should throw an error when a message cannot be found', () => {
      repository.findOneOrFail.mockReturnValueOnce(Promise.reject(''));

      messageService.findById$('2').subscribe({
        next: () => fail(),
        error: error => {
          expect(error instanceof NotFoundException).toBeTruthy();
          expect(error.message).toBe('Cannot find message with id: 2.');
        }
      });
    });
  });
});
