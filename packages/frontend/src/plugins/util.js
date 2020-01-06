export function debounce(fn, interval) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    const context = this;
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, interval);
  };
}
