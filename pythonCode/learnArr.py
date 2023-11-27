// 如何创建数组
import numpy as np
# sort
arr = [3, 2, 1]
arr.sort()
print(arr)  # 输出：[1, 2, 3]

# push (append in Python)
arr.append(4)
print(arr)  # 输出：[1, 2, 3, 4]

# pop
value = arr.pop()
print(value)  # 输出：4

# shift (pop at first index in Python)
value = arr.pop(0)
print(value)  # 输出：1

# unshift (insert at first index in Python)
arr.insert(0, 5)
print(arr)  # 输出：[5, 2, 3]

# forEach (for loop in Python)
for i in arr:
  print(i)

# map
arr = list(map(lambda x: x * 2, arr))
print(arr)  # 输出：[10, 4, 6]

# every (all in Python)
print(all(i > 0 for i in arr))  # 输出：True

# some (any in Python)
print(any(i > 10 for i in arr))  # 输出：False

# reverse
arr.reverse()
print(arr)  # 输出：[6, 4, 10]

# fill
arr = [0] * 5
print(arr)  # 输出：[0, 0, 0, 0, 0]

# from (list in Python)
arr = list("12345")
print(arr)  # 输出：['1', '2', '3', '4', '5']


arr2 = [{'id': 1, 'name': 'name1', 'age': 1}, {'id': 2, 'name': 'name2', 'age': 2}]
#  filtered_arr = [item for item in arr2 if item['id'] == 1]
filtered_arr = []
for item in arr2:
    if item['id'] == 1:
        filtered_arr.append(item)
print(filtered_arr)  # 输出：[{'id': 1, 'name': 'name1', 'age': 1}]