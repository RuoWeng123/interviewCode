# vite 启动项目的流程
1. 找到vite.config.js 文件，读取配置
2. 启动开发服务器，采用原生ESM模块化，不需要打包
3. 当浏览器请求一个js模块时，vite会对其处理，如果是一个vue文件，会先编译成js，再返回给浏览器
4. 浏览器解析js文件，如果遇到import语句，再次发起请求，重复上述步骤
5. 热模块更新，当文件发生变化时，vite将变化的模块发送给客户端，无需刷新整个页面

# vite 原理
1. 在开发模式下，Vite 使用 esbuild 进行预构建，这是因为 esbuild 使用 Go 编写，并且使用原生的 js 解析器和词法分析器，因此比传统的基于 JavaScript 的打包工具（如 webpack 和 Rollup）快得多。预构建步骤会跳过 node_modules 中的依赖项，因为这些依赖项通常是 ES5，并且包含大量的冗余代码，预构建可以将这些依赖项转换为更小的 ESM 模块。  
2. 在生产模式下，Vite 使用 Rollup 进行打包。Rollup 是一种高效的模块打包器，它使用的是 JavaScript 的静态导入语法，这使得 Rollup 可以在打包时进行“tree-shaking”以去除冗余代码。此外，由于 Vite 在开发模式下已经进行了预构建，所以在生产模式下，Rollup 只需要打包预构建的结果，这大大提高了打包速度
```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      // Rollup 配置
    }
  },
  esbuild: {
    // esbuild 配置
  }
})
```
# vite 优势 对比 webpack
