// 防抖函数
function debounce(func, wait) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait)
  }
}

// 支持立即执行 和取消
function debounce(func, wait, immediate) {
  var timeout, result
  var debounced = function () {
    var context = this
    var args = arguments
    
    // 每次新的尝试调用func，会使抛弃之前等待的func
    if (timeout) clearTimeout(timeout)
    
    // 如果允许新的调用尝试立即执行
    if (immediate) {
      // 如果之前尚没有调用尝试，那么此次调用可以立马执行，否则就需要等待
      var callNow = !timeout
      // 刷新timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      // 如果能被立即执行，立即执行
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }
  
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
