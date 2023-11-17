# template是如何渲染到页面上的呢？
1. template -> ast
2. 优化一些永远不会变的节点，或者永远访问不到的节点。通过这些优化，可以减少后面的diff过程，提升patch的性能。
3. 生成Generate, 将ast 转化为字符串形式的js代码
4. 渲染，将字符串形式的js代码转化为真正的js代码，执行js代码，生成vnode； 然后diff，patch，更新视图
