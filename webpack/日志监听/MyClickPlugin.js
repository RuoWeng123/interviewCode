// MyClickPlugin.js
const babel = require('@babel/core');
const fs = require('fs');

class MyClickPlugin {
  constructor(options) {
    this.options = options || [];
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyClickPlugin', (compilation, callback) => {
      // 遍历每个模块
      compilation.modules.forEach(module => {
        // 获取模块的源代码
        const sourceCode = module._source._value;

        // 使用 Babel 转换源代码，应用我们的插件并传递参数
        const transformedCode = babel.transform(sourceCode, {
          plugins: [[require('./babel-plugin-listen-to-click'), this.options]],
        }).code;

        // 将转换后的代码写回模块
        module._source._value = transformedCode;
      });

      // 完成插件逻辑
      callback();
    });
  }
}

module.exports = MyClickPlugin;
