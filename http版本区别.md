## http 1.0 1.1 2.0 3.0 的区别
http2 相对于 http1.1
1. 多路复用（Multiplexing）：

HTTP/2 支持多路复用，允许在同一连接上同时发送多个请求和响应。这减少了延迟，提高了页面加载速度。
在HTTP/1.1中，每个请求都需要等待前一个请求完成，无法并行传输。
2. 二进制帧（Binary Frames）：

HTTP/2 使用二进制格式传输数据，而不是HTTP/1.1的文本格式。二进制帧更为紧凑，减少了传输的大小，提高了效率。
二进制帧的引入使得协议更加高效，减少了解析的复杂性。
3. 首部压缩（Header Compression）：

HTTP/2使用HPACK算法对首部进行压缩，减小了首部的大小。这减少了带宽的使用，特别是对于重复的首部信息。
在HTTP/1.1中，每个请求和响应都携带一组文本形式的首部，导致了冗余和浪费。
4. 优先级（Priority）：

HTTP/2引入了请求和响应的优先级，允许客户端指定资源的优先级。服务器可以根据这些优先级信息调整资源传输的顺序，提高关键资源的加载速度。
```js
GET /example.jpg HTTP/2
Host: example.com
Priority: 1  //设置范围0-255  1表示最低优先级
```
HTTP/1.1中，资源的加载顺序由浏览器决定，无法明确指定。
5. 流量控制（Flow Control）：

HTTP/2引入了流量控制机制，允许接收方限制发送方的数据量，以防止过载。
```py
import hyper
from hyper.contrib import HTTP20Adapter

# 创建HTTP/2连接
conn = hyper.HTTP20Connection('example.com')
conn.connect()

# 在请求头中添加流量控制参数
headers = {'host': 'example.com', 'user-agent': 'my-app', 'accept': 'text/html'}

# 发送请求
stream_id = conn.request('GET', '/path', headers=headers)

# 获取数据流
stream = conn.streams[stream_id]

# 窗口控制：设置连接窗口大小
conn.window_manager.window_size = 65535  # 默认窗口大小为65535字节

# 流控制：设置流窗口大小
stream.local_window_manager.window_size = 65535  # 默认流窗口大小为65535字节

# 接收响应头
response = conn.get_response(stream_id)

# 处理响应数据
data = b''
while True:
    chunk = stream.data.recv(4096)  # 接收数据
    if not chunk:
        break
    data += chunk

# 处理数据，此处可以根据实际情况进行处理

# 关闭连接
conn.close()

```
这个例子中，我们使用hyper库创建了一个HTTP/2连接，并在请求头中添加了流量控制的参数。然后，我们设置了连接窗口大小和流窗口大小，以控制数据的发送和接收速率。最后，我们接收响应数据并处理。
HTTP/1.1无法在传输中对流量进行精确控制，可能导致网络拥塞。
6. 服务器推送（Server Push）：

HTTP/2支持服务器推送，允许服务器在客户端请求之前主动推送相关资源。这减少了客户端请求的次数，提高了加载速度。
```py
import hyper
from hyper.contrib import HTTP20Adapter

# 创建HTTP/2连接
conn = hyper.HTTP20Connection('example.com')
conn.connect()

# 在请求头中添加服务器推送相关信息
headers = {'host': 'example.com', 'user-agent': 'my-app', 'accept': 'text/html'}

# 发送请求，并允许服务器推送
stream_id = conn.request('GET', '/path', headers=headers, end_stream=False, priority=1, stream_id=0)

# 获取数据流
stream = conn.streams[stream_id]

# 服务器推送资源1
conn.push('/style.css', headers={'host': 'example.com'}, end_stream=True, stream_id=stream_id)

# 服务器推送资源2
conn.push('/image.jpg', headers={'host': 'example.com'}, end_stream=True, stream_id=stream_id)

# 接收响应头
response = conn.get_response(stream_id)

# 处理响应数据
data = b''
while True:
    chunk = stream.data.recv(4096)  # 接收数据
    if not chunk:
        break
    data += chunk

# 处理数据，此处可以根据实际情况进行处理

# 关闭连接
conn.close()

```
我们使用hyper库创建了一个HTTP/2连接，并发送了一个GET请求。在请求头中，我们设置了end_stream=False，表示请求头之后还会有数据。然后，我们使用conn.push()方法模拟了服务器推送资源1（style.css）和资源2（image.jpg）。最后，我们接收响应数据并处理。
HTTP/1.1中，服务器不能主动向客户端推送资源，而是必须等待客户端请求。
7. 安全性：

HTTP/2通常与TLS（Transport Layer Security）一起使用，因此加密了通信数据。虽然HTTP/1.1也可以使用TLS，但在HTTP/2中，使用加密是强制性的。
加密确保了数据的隐私和完整性，防止了窃听和篡改。
### http 1.0
### http1.1
1.1 相对于 1.0 的改进
## https 和 http 的区别
