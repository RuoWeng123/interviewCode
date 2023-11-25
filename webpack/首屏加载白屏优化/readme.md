# 首屏优化
## 合并压缩资源，减少网络请求次数和文件大小
## 图片优化，使用适当的webp格式，减少图片大小
## 使用懒加载，延迟加载非可见区域
## 异步加载，先加载内容，后加载广告
例子： 
```js
function loadExternalScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script ${url}`));
    };

    document.head.appendChild(script);
  });
}

// 异步加载统计代码
loadExternalScript('https://example.com/analytics.js')
  .then(() => {
    // 统计代码加载完成后执行的逻辑
    console.log('Analytics script loaded');
  })
  .catch((error) => {
    console.error(error);
  });

// 异步加载广告代码
loadExternalScript('https://example.com/advertisement.js')
  .then(() => {
    // 广告代码加载完成后执行的逻辑
    console.log('Advertisement script loaded');
  })
  .catch((error) => {
    console.error(error);
  });

```
## 使用预加载，提前加载可见区域的资源
```html
<link rel="preload" href="https://example.com/analytics.js" as="script">
```
## css 放在页面头部，js放在页面底部
## 缓存策略，利用浏览器缓存

## 使用服务器SSR 渲染

## CDN 加速