# 返回数组中目标对象下标
# 这是一个学习map 的例子
def sumTarget(arr, target):
    """
    :param arr: list
    :param target: int
    :return: list
    """
    if not arr:
        return []
    if len(arr) == 1:
        return []
    if len(arr) == 2:
        if arr[0] + arr[1] == target:
            return [0, 1]
        else:
            return []
    map = {}
    for i in range(len(arr)):
        diff = target - arr[i]
        if(diff in map):
            return [map.get(diff), i]
        else:
            map[arr[i]] = i
    return []

print(sumTarget([1, 2, 3, 4, 5, 6, 7, 8, 9], 10))