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

export function createUID(
  size = 32,
  base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) {
  const len = base.length;
  const buf = [];
  let i = 0;

  while (i < size) {
    buf.push(base[Math.floor(Math.random() * len)]);
    i += 1;
  }
  return buf.join("");
}
