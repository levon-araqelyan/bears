export const debounceService = (callback, delay = 1000) => {
  let isFunctionIsCalled = null;

  return (...args) => {
    if (isFunctionIsCalled) {
      clearTimeout(isFunctionIsCalled);
    }

    isFunctionIsCalled = setTimeout(() => {
      isFunctionIsCalled = null;
      callback(...args);
    }, delay);
  };
};
