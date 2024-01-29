# webpack 性能优化
1. 采用新版本webpack
2. 采用thread-loader, happypack, parallel-webpack来多进程打包
```js
// 配置 webpack
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'thread-loader',
          'babel-loader'
        ]
      }
    ]
  }
};
```
3. 采用cache-loader, 来缓存减少重复计算
```js
// 配置 webpack
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          'babel-loader'
        ]
      }
    ]
  }
};
```
4. 采用externals来提取第三方库, 这些库将不会被打包到最终的文件中;需要手动引入
```js
module.exports = {
  externals: {
    jquery: 'jQuery',
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_',
      var: '_',
    },
  },
};
```
5. 采用cdn来提取第三方库
```js
// webpack.config.js
module.exports = {
  externals: {
    // 将 jQuery 库托管在 CDN 上
    'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
  },
};

```
也可以将打包后的文件部署到 CDN 上
```js
// webpack.config.js
module.exports = {
  output: {
    publicPath: 'https://cdn.example.com/assets/', // CDN 路径
  },
};
```
6. 采用 source-map 开发环境可以定位错误
7. resolve 配置最小化模块查找范围
```js
module.exports = {
  resolve: {
    modules: ['node_modules', 'src'],
  }
};
```
8. 采用 DllPlugin 和 DllReferencePlugin 预编译资源模块; 通常用来处理 react, vue, jquery 等不会变化的第三方库
9. 采用 webpack-merge 将公共配置抽离
10. 采用 tree shaking 来移除无用代码
```js
module.exports = {
  mode: 'production',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  ],
};
```
11. 采用 scope hoisting 来减少函数声明代码和内存开销, 使用的时候需要注意，源码采用ES6
```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
```
12.  hard-source-webpack-plugin 来缓存中间结果，下次构建时会加快速度
```js
// 配置 webpack
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  plugins: [
    new HardSourceWebpackPlugin(),
  ],
};
```
13. 压缩代码
```js
// 安装 terser-webpack-plugin
npm install terser-webpack-plugin -D

// 配置 webpack
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```
