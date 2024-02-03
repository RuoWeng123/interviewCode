# 检查括号完整性 （）{}[]
def checkIsValidBracket(s):
    stack = []
    for i in s:
        if i == '(' or i == '{' or i == '[':
            stack.append(i)
        else:
            if len(stack) == 0:
                return False
            if i == ')' and stack[-1] != '(':
                return False
            if i == '}' and stack[-1] != '{':
                return False
            if i == ']' and stack[-1] != '[':
                return False
            else:
                stack.pop()
    
    return len(stack) == 0
                

# 测试
print(checkIsValidBracket('(([{]))'))

# 采用map 版本
# 学习 in 循环以及  判断是否为空
def checkIsValidBracket2(str):
    stack = []
    bracketMap = {')':'(', ']':'[', '}':'{'}

    for char in str:
        if(char in '([{'):
            stack.append(char)
        else:
            if not stack or stack.pop() != bracketMap[char]:
                return False
    
    return not stack

print(checkIsValidBracket2('({[()]})'))