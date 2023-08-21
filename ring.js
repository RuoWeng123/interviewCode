const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 60;
const lineWidth = 10;
const startAngle = -0.5 * Math.PI; // 12点钟方向
const endAngle = startAngle + 2 * Math.PI; // 一周

function drawProgressCircle(progress) {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'green');
  gradient.addColorStop(1, 'red');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'lightgray';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + progress * 2 * Math.PI);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = gradient;
  ctx.stroke();
}

// 调用示例，表示50%的进度
drawProgressCircle(0.5);