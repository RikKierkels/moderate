import { IsAuthorGuard } from './is-author.guard';

describe('IsAuthorGuard', () => {
  it('should be defined', () => {
    expect(new IsAuthorGuard()).toBeDefined();
  });
});
