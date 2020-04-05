function makeHeaders(token: string) {
  return {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': `Bearer ${token}`
    })
  };
}

export { makeHeaders };
