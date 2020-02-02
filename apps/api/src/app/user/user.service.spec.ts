import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MockType, repositoryMockFactory } from '../database/mock-repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/database-entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ManagementClient, User } from 'auth0';
import { MANAGEMENT_CLIENT_TOKEN } from '../shared/constants';
import { makeUser } from '../shared/test-helpers/make-entities.test-utils';
import { of } from 'rxjs';
import { onError, onNext } from '../shared/test-helpers/subscribe.test-utils';
import { BadRequestException } from '@nestjs/common';

const managementClientMockFactory: () => MockType<ManagementClient> = jest.fn(
  () => ({
    getUser: jest.fn()
  })
);

describe('UserService', () => {
  let service: UserService;
  let repository: MockType<Repository<UserEntity>>;
  let managementClient: MockType<ManagementClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repositoryMockFactory()
        },
        {
          provide: MANAGEMENT_CLIENT_TOKEN,
          useValue: managementClientMockFactory()
        }
      ]
    }).compile();

    service = module.get(UserService);
    repository = module.get(getRepositoryToken(UserEntity));
    managementClient = module.get(MANAGEMENT_CLIENT_TOKEN);
  });

  describe('While fetching a user', () => {
    describe('that exists', () => {
      let userEntity: UserEntity;

      beforeEach(() => {
        userEntity = makeUser();
        repository.findOne.mockReturnValueOnce(of(userEntity));
      });

      it('should return the user', done => {
        service.findOrCreate$(userEntity.id).subscribe(
          onNext(user => {
            expect(user).toEqual(userEntity);
            done();
          })
        );
      });
    });

    describe('that does not exist', () => {
      let userEntity: UserEntity;
      let userProfile: User;

      beforeEach(() => {
        userEntity = makeUser();
        userProfile = {
          user_id: userEntity.id,
          nickname: userEntity.username,
          picture: userEntity.picture
        };

        managementClient.getUser.mockReturnValueOnce(
          Promise.resolve(userProfile)
        );

        repository.findOne.mockReturnValueOnce(of(null));
        repository.create.mockReturnValueOnce({});
        repository.save.mockReturnValueOnce(of(userEntity));
      });

      it('should fetch the user from the auth0 management client', done => {
        service.findOrCreate$('1').subscribe(
          onNext(() => {
            expect(managementClient.getUser).toHaveBeenCalledTimes(1);
            expect(managementClient.getUser).toHaveBeenCalledWith({ id: '1' });
            done();
          })
        );
      });

      it('should create a user profile from the retrieved user', done => {
        service.findOrCreate$('1').subscribe(
          onNext(() => {
            expect(repository.create).toHaveBeenCalledTimes(1);
            expect(repository.create).toHaveBeenCalledWith({
              id: userProfile.user_id,
              username: userProfile.nickname,
              picture: userProfile.picture
            });
            done();
          })
        );
      });

      it('should return the created user', done => {
        service.findOrCreate$('1').subscribe(
          onNext(user => {
            expect(user).toEqual(userEntity);
            done();
          })
        );
      });
    });
  });
});
