# useMemo 定义
useMemo(factory, dependencies) 会在依赖项 dependencies 变化时，重新计算 factory 的值，返回 factory 的值。

执行过程如下：
- 首次执行时，执行 factory，返回 factory 的值，将factory 值存储起来
- 如果依赖性没有变化，直接返回值
- 如果依赖性变化，重新执行 factory，返回 factory 的值，将factory 值存储起来


## 使用场景，如果组件依赖factory的值，并且这个值需要复杂的运算才能得到，那么可以使用 useMemo 来缓存这个值，避免不必要的运算

## useMemo 通过减少 复杂计算来优化性能
