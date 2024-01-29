// symbol 类型值，基本就是字符串，但是传入相同的参数，返回的值也不相等
// 使用场景：作为对象的属性名，防止属性名冲突，或者全局常量
// 由于symbol 对象，基本都是全聚德，故这个函数应该全局 注册
(function (){
  let symbolFlag = 0;
 
  var generateName = (function(){
    return function(descString){
      return '@@' + descString + '_' + symbolFlag++;
    }
  })();

  var SymbolPolyfill = function symbol(descString){
    if(this instanceof symbol){
      throw new TypeError('Symbol is not a constructor');
    }
    var desc = descString === undefined ? undefined : String(descString);
    var symbol = Object.create({
      toString: function(){
        return this.__Name__;
      },
      valueOf: function(){
        return this;
      }
    });
    Object.defineProperties(symbol, {
      '__Description__': {
        value: desc,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__Name__': {
        value: generateName(desc),
        writable: false,
        enumerable: false,
        configurable: false
      }
    });
    return symbol;
  }
  let forMap = {};
  Object.defineProperties(SymbolPolyfill, {
    'for': {
      value: function (description) {
        var desc = description === undefined ? undefined : String(description);
        return forMap[desc] ? forMap[desc] : forMap[desc] = SymbolPolyfill(desc);
      },
      writable: true,
      enumerable: false,
      configurable: true,
    },
    'keyFor': {
      value: function (symb) {
        for (var key in forMap) {
          if (forMap[key] === symb) return key;
        }
      },
      writable: true,
      enumerable: false,
      configurable: true,
    }
  });

  window.SymbolPolyfill = SymbolPolyfill;
})();
