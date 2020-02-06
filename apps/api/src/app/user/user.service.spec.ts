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
import { onNext } from '../shared/test-helpers/subscribe.test-utils';
import * as faker from 'faker';
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

  it('should find a user by id', done => {
    const expectedUser = makeUser();
    repository.findOne.mockReturnValueOnce(Promise.resolve(expectedUser));

    service.findOrCreate$(expectedUser.id).subscribe(user => {
      expect(user).toEqual(expectedUser);
      done();
    });
  });

  it("should create a user if the user can't be found", done => {
    const userProfile: User = {
      user_id: faker.random.uuid(),
      nickname: faker.internet.userName(),
      picture: faker.image.avatar()
    };

    managementClient.getUser.mockReturnValueOnce(Promise.resolve(userProfile));

    service.findOrCreate$(userProfile.user_id).subscribe(user => {
      expect(user).toEqual({
        id: userProfile.user_id,
        username: userProfile.nickname,
        picture: userProfile.picture
      });
      done();
    });
  });

  it('should throw an error if fetching the users profile goes wrong', done => {
    managementClient.getUser.mockReturnValueOnce(Promise.reject(''));

    service.findOrCreate$('User Id').subscribe({
      error: error => {
        expect(error instanceof BadRequestException).toBeTruthy();
        expect(error.message.message).toBe(
          'Something went wrong while fetching the user profile for user id: User Id.'
        );
        done();
      }
    });
  });
});
