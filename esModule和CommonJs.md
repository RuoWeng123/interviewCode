# ESModule 和 CommonJs 的差异
## 语法糖差异
```
// commonjs
const { a } = require('./a.js')

module.exports = {
  a
}

// esmodule
import { a } from './a.js'

export function a(){}
```
## 加载时机
1. esModule 在代码执行前加载所有模块，通过静态分析确定模块之间依赖关系。导入的模块是只读的，不允许修改。
2. commonjs， 运行时加载，导入模块是可变的，运行时可修改

## 异步加载
1. Esmodule 支持异步加载模块，import()函数，返回一个promise对象
```javascript
import('./a.js').then(res => {
  console.log(res)
})
```
2. CommonJs 通常是同步加载模块，也可以使用require.async()异步加载模块，但是只有少数实现了这个方法。 所以通常require()会阻断代码执行，直到模块加载完成

## 浏览器支持粒度不同
1. ESModule 浏览器支持
```js
<script type='module' src='main.js'></script>
```
2. Commonjs 主要用于服务器端，