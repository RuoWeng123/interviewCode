// webpack.config.js
const MyClickPlugin = require('./MyClickPlugin');

module.exports = {
  // ...
  plugins: [
    // 本机测试可以写在一个文件中，但是线上的话
    new MyClickPlugin([
      { type: 'el', value: 'button' },
      { type: 'class', value: 'myCustomClassName' },
    ]),
  ],
};


// 上面是初稿，生产环境需要动态监听，所以需要改造一下
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  let targetClassNames = [];

  // 根据需要设置监听的元素类名
  if (isProduction) {
    // 可以根据环境变量、配置文件等方式获取目标元素类名列表
    targetClassNames = process.env.TARGET_CLASS_NAMES.split(',');
  }

  const plugins = [
    // 其他插件...
  ];

  // 只在生产环境添加 MyClickPlugin，并传递目标元素类名列表
  if (isProduction) {
    plugins.push(new MyClickPlugin(targetClassNames));
  }

  return {
    // 其他配置...
    plugins: plugins,
  };
};
