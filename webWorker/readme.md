使用限制

同源限制
接口限制（window作用域下的部分方法不可使用，如DOM对象、window.alert和window.confirm等方法。）
文件限制（无法加载本地js文件，必须使用线上地址。）
记得关闭（worker会占用一定的系统资源，在相关的功能执行完之后，一定要记得关闭worker。）
使用时注意this指向

使用步骤
1. package.json 添加worker-loader 包
2. webpack loader 配置
```js
{
        test: /\.worker\.js$/,
        loader: "worker-loader",
        options:{
          esModule: true,
        }
      },
```
3. worker 编写
// getEntryMinPoint.worker.js

4. react 使用