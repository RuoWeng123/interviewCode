// 第一种节流，该方式会在第一次触发时立即执行，然后在每次触发后的 delay 时间内不会再执行
const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    return fn(...args);
  };
}

// 第二种节流，该方式会在第一次触发时不会立即执行，而是在 delay 时间后执行
const throttle_2 = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, delay);
    }
  };
}