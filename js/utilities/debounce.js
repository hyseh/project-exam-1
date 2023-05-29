export const debounce = (func, delay = 100) => {
  let timeout = false;
  let wait = delay;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};
