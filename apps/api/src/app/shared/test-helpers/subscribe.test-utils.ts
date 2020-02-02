import { PartialObserver } from 'rxjs';

export const onNext = (assertFn): PartialObserver<any> => ({
  next: assertFn,
  error: () => fail()
});

export const onError = (assertFn): PartialObserver<any> => ({
  next: () => fail(),
  error: assertFn
});
