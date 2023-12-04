function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  var copy = obj.constructor();

  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = deepClone(obj[attr]);
    }
  }

  return copy;
}
// 兼容正则 和 function 的情况
function deepClone2(obj) {
  if (obj === null) {
    return obj;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (typeof obj === 'function') {
    return new Function('return ' + obj.toString())();
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  var copy = obj.constructor();

  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = deepClone(obj[attr]);
    }
  }

  return copy;
}