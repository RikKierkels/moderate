import { IsAuthorOfMessageGuard } from './is-author-of-message.guard';

describe('IsAuthorOfMessageGuard', () => {
  it('should be defined', () => {
    expect(new IsAuthorOfMessageGuard()).toBeDefined();
  });
});
