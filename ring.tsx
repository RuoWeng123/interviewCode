/*
   这是一个圆环样式的进度条
*/
import React, { useEffect } from 'react';
import styles from './index.module.less';
interface Props {
  percent: number;
  trailColor: string;
  strokeColorStart: string;
  strokeColorEnd: string;
  strokeWidth: number;
  width: number;
}

export const NgRingProgress = (props: Props) => {
  const {percent, trailColor= '#2C2C3C', strokeColorStart='#125C2F', strokeColorEnd='#42F379', strokeWidth, width} = props;
  useEffect(() => {
    const canvas = document.getElementById('myCanvas');
    if(!canvas) return;
    // @ts-ignore
    const ctx = canvas.getContext('2d');

    const centerX = width /2;
    const centerY = width / 2;
    const radius = width / 3;
    const lineWidth = strokeWidth;
    const startAngle = -0.5 * Math.PI; // 12点钟方向
    const endAngle = startAngle + 2 * Math.PI; // 一周
    const drawProgressCircle = (progress: number) =>{
      ctx.clearRect(0, 0, width, width);

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = trailColor;
      ctx.stroke();

      if(progress > 0){
        let gradient = null;
        if(progress === 1){
          gradient = ctx.createLinearGradient(width, 0, 0, width);
          gradient.addColorStop(0, strokeColorStart);
          gradient.addColorStop(1, strokeColorEnd);
        }else{
          gradient = ctx.createConicGradient(startAngle, centerX, centerY);
          gradient.addColorStop(0, strokeColorStart);
          gradient.addColorStop(progress, strokeColorEnd);
          gradient.addColorStop(1, strokeColorStart);
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + progress * 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = gradient;
        if(progress < 0.95){
          ctx.lineCap = 'round';
        }else{
          ctx.lineCap = 'butt';
        }
        ctx.stroke();
      }
    };

    drawProgressCircle(percent/100);
  }, [percent, width, strokeWidth]);

  return (
    <div className={styles.ng_ring} style={{width: width, height: width}}>
      <canvas id="myCanvas" width={width} height={width}/>
      <span className={styles.text}>{percent}%</span>
    </div>
  );
};