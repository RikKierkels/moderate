import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { IdeaService } from '../idea/idea.service';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import {
  IdeaEntity,
  MessageEntity,
  UserEntity
} from '../database/database-entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  makeUser,
  makeIdea,
  makeMessage
} from '../shared/test-helpers/test-data.helpers';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { onError, onNext } from '../shared/test-helpers/test-subscribe-helpers';
import { MessageCreateDto } from './models/message-create.dto';
import { MessageUpdateDto } from './models/message-update.dto';

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
      messageEntity = makeMessage('1', 'Fake Message', makeUser());
    });

    it('should call the repository with the id', done => {
      repository.findOneOrFail.mockReturnValueOnce(
        Promise.resolve(messageEntity)
      );

      messageService.findById$('1').subscribe(
        onNext(() => {
          expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
          expect(repository.findOneOrFail).toHaveBeenCalledWith('1', options);
          done();
        })
      );
    });

    it('should return the message entity for an existing id', done => {
      repository.findOneOrFail.mockReturnValueOnce(
        Promise.resolve(messageEntity)
      );

      messageService.findById$('1').subscribe(
        onNext(message => {
          expect(message).toEqual(messageEntity);
          done();
        })
      );
    });

    it('should throw an error when a message cannot be found', done => {
      repository.findOneOrFail.mockReturnValueOnce(Promise.reject(''));

      messageService.findById$('2').subscribe(
        onError(error => {
          expect(error instanceof NotFoundException).toBeTruthy();
          expect(error.message.message).toBe('Cannot find message with id: 2.');
          done();
        })
      );
    });
  });

  describe('While creating a message', () => {
    let messageCreateDto: MessageCreateDto;
    let ideaEntity: IdeaEntity;
    let author: UserEntity;

    beforeEach(() => {
      ideaEntity = makeIdea('1', 'Fake Idea');
      ideaService.findById$.mockReturnValueOnce(of(ideaEntity));

      author = makeUser();
      userService.findOrCreate$.mockReturnValueOnce(of(author));

      repository.create.mockReturnValueOnce({});
      repository.save.mockReturnValueOnce(
        Promise.resolve({ text: 'Fake Message' })
      );

      messageCreateDto = { ideaId: '1', text: 'Fake Message' };
    });

    it('should call the user service with the user id', done => {
      messageService.create$(messageCreateDto, 'userid').subscribe(
        onNext(() => {
          expect(userService.findOrCreate$).toHaveBeenCalledTimes(1);
          expect(userService.findOrCreate$).toHaveBeenCalledWith('userid');
          done();
        })
      );
    });

    it('should call the idea service with the idea id', done => {
      messageService.create$(messageCreateDto, 'userid').subscribe(
        onNext(() => {
          expect(ideaService.findById$).toHaveBeenCalledTimes(1);
          expect(ideaService.findById$).toHaveBeenCalledWith('1');
          done();
        })
      );
    });

    it('should add the idea and author to the message', done => {
      messageService.create$(messageCreateDto, 'userid').subscribe(
        onNext(() => {
          expect(repository.create).toHaveBeenCalledTimes(1);
          expect(repository.create).toHaveBeenCalledWith({
            ideaId: '1',
            text: 'Fake Message',
            idea: ideaEntity,
            author
          });
          done();
        })
      );
    });

    it('should return the saved message', done => {
      messageService.create$(messageCreateDto, 'userid').subscribe(
        onNext(message => {
          expect(message).toEqual({ text: 'Fake Message' });
          done();
        })
      );
    });
  });

  describe('While updating a message', () => {
    let messageUpdateDto: MessageUpdateDto;

    beforeEach(() => {
      messageUpdateDto = { id: '1', text: 'Fake Message' };
      repository.update.mockReturnValueOnce(Promise.resolve({}));
      repository.findOne.mockReturnValueOnce(
        Promise.resolve({ text: 'Fake Message' })
      );
    });

    it('should call the repository to update the message', done => {
      messageService.update$(messageUpdateDto).subscribe(
        onNext(() => {
          expect(repository.update).toHaveBeenCalledTimes(1);
          expect(repository.update).toHaveBeenCalledWith('1', {
            text: 'Fake Message'
          });
          done();
        })
      );
    });

    it('should return the updated message', done => {
      messageService.update$(messageUpdateDto).subscribe(
        onNext(message => {
          expect(message).toEqual({ text: 'Fake Message' });
          done();
        })
      );
    });
  });

  describe('While deleting a message', () => {
    beforeEach(() => {
      messageService.delete('1');
    });

    it('should call the repository to delete the message', () => {
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith('1', { isDeleted: true });
    });
  });
});
