# 这里主要用于学习 python 函数定义，以及结构
# 快拍
def quickSort(arr):
  if(len(arr) < 2):
    return arr
  else:
    pivot = arr[0]
    left = [i for i in arr[1:] if i <= pivot]
    right = [i for i in arr[1:] if i > pivot]
    return quickSort(left) + [pivot] + quickSort(right)


# 检查效果
print(quickSort([10, 5, 2, 3]))  # 输出：[2, 3, 5, 10]


