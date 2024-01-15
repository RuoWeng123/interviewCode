# electron 面试题
## 生命周期
1. will-finish-launching 当 Electron 完成基础的启动的时候，会触发 will-finish-launching 事件，通常在这里 做启动崩溃报告和自动更新
2. ready  electon初始化完成，并准备号创建窗口，可以执行窗口初始化相关的操作
3. activate 窗口首次激活调用，包括从从程序坞打开，cmd+tab 不会激活。
4. did-become-active 切换到应用时触发
5. web-contents-created 当webContents被创建时触发
6. browser-window-created 当BrowserWindow被创建时触发
7. window-all-closed 当所有窗口都被关闭时触发
8. before-quit 尝试关闭应用时触发
9. will-quit 应用将要退出时触发
10. quit 在window中，因为系统关闭、重启而导致程序关闭。before-quit 和quit 事件不会被触发


## browserWindow 事件


## render 事件


## electron 主进程和渲染进程通信
1. render 渲染进程到  main 主进程
```js
// preload.js
const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})

// renderer.js
window.electronAPI.setTitle('hello')

// main.js
ipcMain.on('set-title', (event, title) =>{
  console.log('从 render  获取到的数据')
})
```

2. main 进程 到  renderer 进程
```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value)
})

// main.js
// main 发送数据
mainWindow.webContents.send('update-conter', 1)
// main 接收数据
ipcMain.on('counter-value', (event, value) => {
  console.log('从 render  获取到的数据')
})

// renderer.js
window.electronAPI.onUpdateCounter((value) => {
  console.log('从 main  获取到的数据')
})
```

3. 双向通信  invoke handle
```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})

// renderer.js
window.electronAPI.openFile().then((result) => {
  console.log(result)
})

// main.js
ipcMain.handle('dialog:openFile', () => {return '123'})
```