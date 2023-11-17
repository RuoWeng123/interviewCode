# vue 路由工作原理
* URL 监听： Vue Router 会监听 URL 的变化，当 URL 发生变化时，会根据当前的 URL 来匹配对应的路由。  
* 路由匹配： Vue Router 会预先定义一组路由，每个路由都映射到一个组件。当 URL 发生变化时，Vue Router 会遍历所有的路由，找到和当前 URL 匹配的路由。  
* 组件渲染： 当找到匹配的路由后，Vue Router 会获取该路由对应的组件，并将其渲染到 <router-view> 组件的位置。  
* 导航守卫： Vue Router 提供了导航守卫功能，可以在路由改变前进行一些操作，例如验证用户权限、取消数据请求、重定向等。  
* 路由元信息： Vue Router 允许在路由对象上添加 meta 字段，用于存储路由的元信息，例如是否需要登录权限等。  
* 路由模式： Vue Router 支持两种路由模式：hash 模式和 history 模式。hash 模式使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。history 模式利用了 HTML5 History API，提供了类似于真实 URL 的用户体验。  
* 路由传参： Vue Router 提供了多种方式来传递参数，包括通过 URL 的动态片段、查询参数、路由的 props 等。
# hash 和 history的区别
1. URL 格式： hash 模式的 URL 中会包含一个 #，例如 http://www.example.com/#/page1`。`history 模式的 URL 则看起来更像传统的 URL，例如 `http://www.example.com/page1`。  
2. 兼容性： hash 模式基于 URL 的 hash，它在所有浏览器中都被支持，包括不支持 HTML5 History API 的旧浏览器。history 模式基于 HTML5 History API，它在现代浏览器中被支持，但在旧浏览器中可能不被支持。  
3. 服务器配置： hash 模式下，服务器只需要处理根 URL 的请求，因为 hash 后的部分不会被发送到服务器。history 模式下，服务器需要对所有可能的 URL 都进行处理，通常需要后端进行相应的配置，以确保所有的 URL 都能正确地返回应用的入口 HTML 文件。  
4. 用户体验： history 模式的 URL 看起来更美观，更像传统的 URL，因为它没有 #。而 hash 模式的 URL 中包含 #，可能会让 URL 看起来比较奇怪。  
5. 页面滚动行为： hash 模式下，改变 hash 不会触发页面滚动，但可以通过监听 hashchange 事件来手动处理滚动；history 模式下，浏览器会尝试模拟常规页面的滚动行为，但这通常需要额外的配置才能正常工作。 
