# vite.config.js 中配置性能优化
1. optimizeDeps 配置依赖优化，告诉vite那些依赖 预构建，减少生产构建包大小
```js
export default {
  optimizeDeps: {
    include: ['axios', 'lodash'],
  },
};
```
2. build 配置，
```js
export default {
  build: {
    // 启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 启用/禁用压缩
    minify: 'terser',
    // 生成 source map
    sourcemap: false,
  },
};

```
3. server 配置 
```js
export default {
  server: {
    // 启用/禁用 HMR
    hmr: {
      overlay: false,
    },
  },
};

```
4. esbuild 配置是否压缩
```js
export default {
  esbuild: {
    // 启用/禁用压缩
    minify: true,
    // 启用/禁用代码分割
    target: 'es2015',
  },
};
```
5. rollup 配置
```js
export default {
  rollupOptions: {
    // 启用/禁用代码分割
    output: {
      manualChunks: {
        lodash: ['lodash'],
      },
    },
  },
};
```
6. css 配置
```js
export default {
  css: {
    // 启用/禁用 CSS modules
    modules: true,
    // 启用/禁用 CSS 代码拆分
    codeSplit: true,
    // CSS 预处理器配置项
    preprocessorOptions: {
      scss: {
        // 全局共享的 scss 变量
        additionalData: `$injectedColor: orange;`,
      },
    },
  },
};
```
7. alias 配置 , 可减少 不必要的文件搜索
```js
export default {
  resolve: {
    alias: {
      '@': '/src',
    },
  },
};
```

8. plugin 引入 autoImport
```js 
  // 采用autoImport 比在 目标vue 中手动导入，性能提高20%
  AutoImport({
    resolvers: [ElementPlusResolver()],
    imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
    dirs: ['./src/components/**/*', './src/composables/**', './src/store/**', './types/**'],
    vueTemplate: true,
  }),
```