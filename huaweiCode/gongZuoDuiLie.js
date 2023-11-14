/**
 * 工作队列, 提交任务后，执行者从队列中取出任务执行，队列减1， 如果队列满了，之前提交的任务会被丢弃，新任务加入队列
 * @param <number[]> N  奇数位表示任务提交时刻，偶数位表示任务执行时间
 * @param <number> k 工作队列最大长度
 * @param <number> m 执行者的数量
 * @return {moment: number, giveUp: number}
 */

function processTasks(N, k, m) {
  let queue = [];  // 任务队列
  let moment = 0;  // 当前时刻
  let giveUp = 0;  // 被丢弃的任务数量
  let actuatorList = new Array(m).fill({
    isUsing: false,
    moment: 0,
  });

  const checkIsAbleActuator = (submitTime) => {
    //修正执行器状态，如果 执行器时间 小于 任务开始时间，执行器修改为可用
    actuatorList.forEach((item) => {
      if(item.moment < submitTime){
        item.isUsing = false;
      }
    });
    return actuatorList.some((item) => item.isUsing === false);
  }
  // 修改队列中 任务的提交时间为 执行器最快的时间
  const updateQueueFastestSubmitTime = (queue) =>{
    actuatorList.sort((a, b) => a.moment - b.moment);
    actuatorList[0].isUsing = false;
    queue.forEach((item) => {
      item.submitTime = actuatorList[0].moment;
    });
  }
  const pushActuator = (submitTime, executeTime, fromQueue) => {
    // fromQueue =true 表示来自队列中，不需要submitTime
    if(fromQueue){
      let index = actuatorList.findIndex((item) => item.isUsing === false);
      if(index === -1){
        index = 0;
      }
      actuatorList[index] = {
        isUsing: true,
        moment: actuatorList[index].moment + executeTime,
      }
      
    }else{
      let index = actuatorList.findIndex((item) => item.isUsing === false);
      if(index === -1) {
        index = 0;
      }
      actuatorList[index]= {
        isUsing: true,
        moment : submitTime + executeTime,
      }
    }
  }


  for (let i = 0; i < N.length; i += 2) {
    const submitTime = N[i];
    const executeTime = N[i + 1];
    // 执行器有空余
    if(checkIsAbleActuator(submitTime)){
      // 检查队列中有数据，先用队里中的
      if(queue.length > 0){
        let first = queue.shift();
        pushActuator(first.submitTime, first.executeTime, true);
      }else{
        // 队列中没有数据，直接用提交的任务
        pushActuator(submitTime, executeTime, false);
      }
    }else{
      // 执行器没有空余 
      // 第一步检查队列是否有空余
      if(queue.length <k){
        queue.push({submitTime, executeTime});
      }else{
        queue.shift();
        giveUp++;
        queue.push({submitTime, executeTime});
      }
    }
  }

  // 处理剩余队列中的任务
  while (queue.length > 0) {
    updateQueueFastestSubmitTime(queue);
    console.log('newQueue', queue);
    let first = queue.shift();
    pushActuator(first.submitTime, first.executeTime, true);
  }

  console.log(actuatorList);
  return { moment: Math.max(...actuatorList.map(v => v.moment)), giveUp };
}

// 示例用法
const result = processTasks([1, 3, 2, 2, 3, 3], 3, 2);
console.log(result);
