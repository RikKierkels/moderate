import { PartialObserver } from 'rxjs';

export const onNext = (assertFn): PartialObserver<any> => ({
  next: assertFn,
  error: () => fail()
});

export const onError = (assetFn): PartialObserver<any> => ({
  next: () => fail(),
  error: assetFn
});
