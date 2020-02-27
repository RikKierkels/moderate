import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { IdeaService } from '../idea/idea.service';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { MessageEntity } from '../database/database-entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  makeIdea,
  makeMessage,
  makeUser
} from '../shared/test-helpers/make-entities.test-utils';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { MessageCreateDto } from './models/message-create.dto';
import { MessageUpdateDto } from './models/message-update.dto';
import * as faker from 'faker';

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

  it("should find a message by it's id", done => {
    const expectedMessage = makeMessage();
    repository.findOneOrFail.mockReturnValueOnce(
      Promise.resolve(expectedMessage)
    );

    messageService.findById$(expectedMessage.id).subscribe(message => {
      expect(message).toEqual(expectedMessage);
      done();
    });
  });

  it("should throw an error if a message can't be found", done => {
    repository.findOneOrFail.mockReturnValueOnce(Promise.reject(''));

    messageService.findById$('1').subscribe({
      error: error => {
        expect(error instanceof NotFoundException).toBeTruthy();
        expect(error.message.message).toBe('Cannot find message with id: 1.');
        done();
      }
    });
  });

  it('should create a new message', done => {
    const idea = makeIdea();
    const author = makeUser();
    const messageCreateDto: MessageCreateDto = {
      text: faker.lorem.paragraph(),
      ideaId: idea.id
    };
    userService.findOrCreate$.mockReturnValueOnce(of(author));
    ideaService.findById$.mockReturnValueOnce(of(idea));

    messageService.create$(messageCreateDto, author.id).subscribe(message => {
      expect(message).toEqual({
        ...messageCreateDto,
        idea,
        author
      });
      done();
    });
  });

  it('should update an existing message', done => {
    const expectedMessage = makeMessage();
    const messageUpdateDto: MessageUpdateDto = {
      id: expectedMessage.id,
      text: expectedMessage.text
    };
    repository.findOne.mockReturnValueOnce(Promise.resolve(expectedMessage));

    messageService.update$(messageUpdateDto).subscribe(message => {
      expect(message).toEqual(expectedMessage);
      done();
    });
  });

  it('should delete a message', () => {
    messageService.delete('1');

    expect(repository.update).toHaveBeenCalledWith('1', { isDeleted: true });
  });
});
