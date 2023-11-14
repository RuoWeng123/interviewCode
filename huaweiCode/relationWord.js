// 从现有的队列中，根据前缀找到对应的关联词，没有找到返回前缀

function getRelationWord(str, prefix) {
  let queue = str.split(' ');
  if(queue.some(item => item.includes('`'))){
    queue = queue.map(item => item.replace('`', ' '));
  }
  // 将队列中的词按照字典序排序，并去重
  queue = Array.from(new Set(queue.sort()));
  let result = prefix;
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].startsWith(prefix)) {
      result = queue[i];
      break;
    }
  }
  return result;
}

let str = 'hello world hello huawei I love ypu';

