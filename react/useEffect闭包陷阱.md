## 看题
```js
import { useEffect, useState } from 'react';

function Dong() {

    const [count,setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count + 1);
        }, 500);
    }, []);

    useEffect(() => {
        setInterval(() => {
            console.log(count);
        }, 500);
    }, []);

    return <div>guang</div>;
}

export default Dong;

```
我看期望这个打印是 0，1，2，3，4； 但是实际打印的都是0；    
为什么？useEffect, useMemo, useCallback 都有依赖的deps,只有deps变了，才需要重新执行传入的函数；
这是闭包陷阱    
产生的原因是useEffect使用了某个state，但是没有加到deps中，导致还是用的旧的state；
解决办法：设置正确的deps,同时需要清理定时器，或者事件监听