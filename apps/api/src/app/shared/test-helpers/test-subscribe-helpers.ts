export const onNext = assertFn => ({
  next: assertFn,
  error: () => fail()
});

export const onError = assetFn => ({
  next: () => fail(),
  error: assetFn
});
