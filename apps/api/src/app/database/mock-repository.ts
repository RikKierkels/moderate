import { Repository } from 'typeorm';
import 'jest';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    findByIds: jest.fn(),
    update: jest.fn(),
    save: jest.fn()
  })
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
