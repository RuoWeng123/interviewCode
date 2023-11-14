function solve_method(m, n, job_times) {
  // 将作业处理时间按升序排序
  job_times.sort((a, b) => a - b);
  // 初始化流水线的处理时间为0
  const pipelines = Array(m).fill(0);

  for (let i = 0; i < n; i++) {
    // 找到处理时间最短的流水线
    const min_pipeline = Math.min(...pipelines);
    const index = pipelines.indexOf(min_pipeline);
    // 将当前作业分配给最短处理时间的流水线
    pipelines[index] += job_times[i];
  }

  const total_time = Math.max(...pipelines);

  return total_time;
}

if (require.main === module) {
  console.log(solve_method(3, 5, [8, 4, 3, 2, 10]) === 13);
}
