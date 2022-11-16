const fakeRequest = async <T>(fakeData?: T, timeout = 500): Promise<T | null> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(fakeData ?? null), timeout)
  );

export default fakeRequest;
