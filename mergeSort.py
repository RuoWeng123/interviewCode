def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    print(arr,'original data')

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    print(left, right)

    return merge(left, right)


def merge(left, right):
    print('----')
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


arr = [9, 5, 7, 2, 4, 1, 8, 6, 3]
sorted_arr = merge_sort(arr)
print(sorted_arr)