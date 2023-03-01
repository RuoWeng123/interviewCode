/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mathjs = require('mathjs');

// 如果修改了getMinPoint计算方法 请修改相关的版本号 以防使用旧的缓存
export const LOCALSURFENTRYPOINT_VERSION = '0.1.20220314';
export const add = (a,b) => a+b;
export const getMinPoint = (target, volume, planId) => {
  const { x, y, z } = target;
  const { i: iTarget, j: jTarget, k: kTarget } = worldToVoxel(volume, x, y, z);

  // console.log('target ras', x, y, z, 'target voxel', iTarget, jTarget, kTarget);

  const size = 256;

  // let minData: number[] | undefined;
  // let minDistance: number | undefined;
  const result = [];

  // 计算全部的头皮点与靶点的距离
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        // k, i, j 算法转Volume有问题，经过测试得到用k, i, j 特定情况下顺序固定
        // 正常volume header有顺序记录 我们算法改过后 这个丢失了
        const val = getIntensityValueSimple(volume, k, i, j);
        if (val) {
          const distance = ((i - iTarget) ** 2 + (j - jTarget) ** 2 + (k - kTarget) ** 2) ** 0.5;
          result.push([i, j, k, distance, val]);
          /* if (minDistance === undefined || distance < minDistance) {
           minDistance = distance;
           minData = [i, j, k, distance, val];
           } */
        }
      }
    }
  }

  const sortResult = result.sort((a, b) => a[3] - b[3]);

  // 取距离靶点最近的100个头皮点 用于接下来的计算
  const minDatas = sortResult.length >= 100 ? sortResult.slice(0, 100) : sortResult;

  // const min = sortResult.length ? sortResult[0] : undefined;
  if (minDatas.length) {
    // 计算出最合理的头皮进入点
    const entryPoint = countEntryPoint(minDatas, volume, iTarget, jTarget, kTarget);
    // const entryPoint = [36, 161, 142];

    // i j k坐标转回 surface xyz坐标。顺序同样不固定
    const minPoint = voxelToWorld(volume, entryPoint[2], entryPoint[0], entryPoint[1]);

    return minPoint;
  }

  return;
};

// 计算一组最近的点 延长至头皮 再取最近的一点
const countMinPoint = (minDatas, volume, iTarget, jTarget, kTarget) => {
  const mins = [];
  for (let minData of minDatas) {
    const subMins = [];
    const minDis = minData[3] === Number.MAX_VALUE ? 20 : minData[3];
    const K = 20 / minDis;
    const prolongI = (minData[0] - iTarget) * K + minData[0];
    const prolongJ = (minData[1] - jTarget) * K + minData[1];
    const prolongK = (minData[2] - kTarget) * K + minData[2];
    const cutOffPoints = cutOffPoint({
      i: minData[0],
      j: minData[1],
      k: minData[2],
    }, {
      i: prolongI,
      j: prolongJ,
      k: prolongK,
    });

    for (let point of cutOffPoints) {
      const pointVal = getIntensityValueSimple(volume, point.k, point.i, point.j);
      if (pointVal) {
        const dis = ((point.i - iTarget) ** 2 + (point.j - jTarget) ** 2 + (point.k - kTarget) ** 2) ** 0.5;
        subMins.push([point.i, point.j, point.k, dis]);
      }
    }

    if (subMins.length) {
      // 延长至最远点 取最远点的值
      mins.push(subMins.sort((a, b) => b[3] - a[3])[0]);
    }
  }

  // 取距离最远的点
  const sortMins = mins.sort((a, b) => a[3] - b[3]);

  return sortMins.length ? sortMins[0] : minDatas[0];
};

const cutOffPoint = (startPoint, endPoint, size = 10) => {
  let points = [];
  const { i: startI, j: startJ, k: startK } = startPoint;
  const { i: endI, j: endJ, k: endK } = endPoint;
  const iStep = (endI - startI) / size;
  const jStep = (endJ - startJ) / size;
  const kStep = (endK - startK) / size;

  for (let i = 0; i < size; i++) {
    const tmpI = startI + iStep * (i + 1);
    const tmpJ = startJ + jStep * (i + 1);
    const tmpK = startK + kStep * (i + 1);

    if (tmpI < 0 || tmpJ < 0 || tmpK < 0) break;

    points.push({
      i: Math.round(tmpI),
      j: Math.round(tmpJ),
      k: Math.round(tmpK),
    });
  }

  return points;
};

// 计算外延的目标点
const countFarVoxel = (start, end, increasedDistance = 20) => {
  const realDistance = ((end.i - start.i) ** 2 + (end.j - start.j) ** 2 + (end.k - start.k) ** 2) ** 0.5;
  // console.log('realDistance', realDistance);
  const ratio = realDistance / (realDistance + increasedDistance);
  const i = (end.i - start.i) / ratio + start.i;
  const j = (end.j - start.j) / ratio + start.j;
  const k = (end.k - start.k) / ratio + start.k;

  return {
    i,
    j,
    k,
  };
};

// 以某个坐标为中心 向内、向外延长
const getMinAndMax = (index, increasedSize) => {
  const maxIndex = 256 - 1;
  let min = index - increasedSize;
  let max = index + increasedSize;
  min = min < 0 ? 0 : min;
  max = max > maxIndex ? maxIndex : max;

  return {
    min,
    max,
  };
};
// 以头皮上的某点为中心，扩展成一个20*20*20的立方体，并筛选其中有值的点
// 过滤掉了斜率相同的点
const formatMinPoints = (minPoint, targetVoxel, volume, increasedSize= 10) => {
  const { min: minI, max: maxI } = getMinAndMax(minPoint[0], increasedSize);
  const { min: minJ, max: maxJ } = getMinAndMax(minPoint[1], increasedSize);
  const { min: minK, max: maxK } = getMinAndMax(minPoint[2], increasedSize);
  const minPoints = [];
  const precision = 10;
  // 选100个点 做延伸 拿到最近的头皮点，以此点 做20mm盒子
  // 以下计算 过滤不需要计算的点 ，为飞视图减少点的计算量
  for (let i = minI; i <= maxI; i++) {
    for (let j = minJ; j <= maxJ; j++) {
      for (let k = minK; k <= maxK; k++) {
        const val = getIntensityValueSimple(volume, k, i, j);
        if (!val) continue;

        // 计算当前点和靶点各个分量的斜率比例
        const slopeBase = i === targetVoxel.i ? 1 : i - targetVoxel.i;
        const slopeJ = j - targetVoxel.j / slopeBase;
        const slopeK = k - targetVoxel.k / slopeBase;
        const dis = ((i - targetVoxel.i) ** 2 + (j - targetVoxel.j) ** 2 + (k - targetVoxel.k) ** 2) ** 0.5;

        const point = {
          i,
          j,
          k,
          dis,
          slopeJ,
          slopeK,
        };

        let checkSlopeAndFar = false;

        for (let index = 0; index < minPoints.length; index++) {
          const subPoint = minPoints[index];
          if (Math.round(subPoint.slopeJ * precision) === Math.round(slopeJ * precision) && Math.round(subPoint.slopeK * precision) === Math.round(slopeK * precision)) {
            checkSlopeAndFar = true;
            // 如果新的点 与已有的点 斜率相同 且处于更外层的头皮上 则更新原有的点
            if (subPoint.dis < dis) {
              minPoints[index] = point;
            }
          }
        }

        // 只新增斜率不同的点 斜率相同的点已经在前面处理过了
        if (!checkSlopeAndFar) {
          minPoints.push(point);
        }
      }
    }
  }

  return minPoints.sort((a, b) => a.dis - b.dis);
};

// 计算头皮进入点（延长至头皮外层的点）
const countEntryPoint = (minDatas, volume, iTarget, jTarget, kTarget) => {
  // 针对这100个头皮点minDatas 分别由靶点与其连接并向外延长 找到最外层的头皮点 并返回距离靶点最近的一个外层头皮点
  const minPoint = countMinPoint(minDatas, volume, iTarget, jTarget, kTarget);
  /* const minPointVoxel = {
   i: minPoint[0],
   j: minPoint[1],
   k: minPoint[2],
   }; */
  const targetVoxel = {
    i: iTarget,
    j: jTarget,
    k: kTarget,
  };

  // console.time('minPoints');
  // 计算外层头皮点minPoint附近的20*20*20个点（已过滤掉斜率相同的点）
  const minPoints = formatMinPoints(minPoint, targetVoxel, volume);
  // console.timeEnd('minPoints');

  let minDis = Number.MAX_VALUE;
  let minDisPoint;

  // console.time('mark');

  // 循环 飞视图 计算
  for (let minPointVoxel of minPoints) {
    if (minDis < minPointVoxel.dis || minPointVoxel.dis === 0) continue;
    // 从靶点至minPoint外延20mm
    const farVoxel = countFarVoxel(targetVoxel, minPointVoxel);

    // 做一个256*256的平面 从外延点向下压 直到与头皮点相接触 返回接触点到靶点的距离
    const distance = inscribeCoilDistance(volume, minPointVoxel, farVoxel, targetVoxel);

    // console.log('dis', dis, 'farVoxel', farVoxel);

    if (distance < minDis) {
      minDis = distance;
      minDisPoint = minPointVoxel;
    }

    // console.log('minPoint voxel', minPointVoxel);
    // console.log('targetVoxel', targetVoxel);
  }

  // console.timeEnd('mark');
  // 没有结果的情况 直接返回这个点 保证有正确的返回值
  if (!minDisPoint) {
    minDisPoint = {
      i: minPoint[0],
      j: minPoint[1],
      k: minPoint[2],
    };
  } else {
    // 特殊处理:根据计算出的最近一点 从靶点向该点延长 直至头皮点 如果没有返回头皮点 直接取最近点
    const minSurfPoints = countMinPoint([[minDisPoint.i, minDisPoint.j, minDisPoint.k, minDis]], volume, iTarget, jTarget, kTarget);
    minDisPoint = {
      i: minSurfPoints[0],
      j: minSurfPoints[1],
      k: minSurfPoints[2],
    };
  }

  return [minDisPoint.i, minDisPoint.j, minDisPoint.k];
};

// 以靶点为起点，向皮层上的点做延长线，以延长线上的每个点做垂直平面，过滤每个平面，一直找到平面内所有点都为空的平面，记录该平面中心与靶点距离
// eslint-disable-next-line max-lines-per-function
const inscribeCoilDistance = (volume, start, end, target) => {
  const { data } = volume;
  start = { i: start.j, j: start.i, k: start.k };
  end = { i: end.j, j: end.i, k: end.k };

  const inter = Math.floor(Math.sqrt(
    Math.pow(start.i - end.i, 2) +
    Math.pow(start.j - end.j, 2) +
    Math.pow(start.k - end.k, 2))) + 1;

  // 构造轨迹的坐标路径
  let xList = mathjs.range(start.i, end.i, (end.i - start.i) / inter)._data;
  let yList = mathjs.range(start.j, end.j, (end.j - start.j) / inter)._data;
  let zList = mathjs.range(start.k, end.k, (end.k - start.k) / inter)._data;

  if (!xList.length) {
    xList = Array.apply(undefined, Array(inter)).map(item => start.i);
  }
  if (!yList.length) {
    yList = Array.apply(undefined, Array(inter)).map(item => start.j);
  }
  if (!zList.length) {
    zList = Array.apply(undefined, Array(inter)).map(item => start.k);
  }

  // x y z 方向的尺寸
  const xSize = xList[xList.length - 1] - xList[0];
  const ySize = yList[yList.length - 1] - yList[0];
  const zSize = zList[zList.length - 1] - zList[0];

  // x y z 与路径尺寸的比例
  const size = Math.sqrt(Math.pow(xSize, 2) + Math.pow(ySize, 2) + Math.pow(zSize, 2));
  const xRotio = xSize / size;
  const yRotio = ySize / size;
  let zRotio = zSize / size;
  if (!zRotio) zRotio += 0.0001;

  const vector1Norm = [xRotio, yRotio, zRotio];

  // 矩阵转换
  let a = mathjs.matrix([
    [xRotio, yRotio, zRotio],
    [1, 0, 0],
    [0, 1, 0],
  ]);

  let b = mathjs.matrix([[0], [1], [0]]);

  const vector2 = mathjs.lusolve(a, b)._data;

  const vector2Size = Math.sqrt(
    Math.pow(vector2[0][0], 2) +
    Math.pow(vector2[1][0], 2) +
    Math.pow(vector2[2][0], 2));
  const vector2x = vector2[0][0] / vector2Size;
  const vector2y = vector2[1][0] / vector2Size;
  const vector2z = vector2[2][0] / vector2Size;
  const vector2Norm = [vector2x, vector2y, vector2z];

  [vector1Norm, vector2Norm].forEach((norm, index) => {
    const symbolVal = (index % 2 ? 1 : -1);
    if (`${norm}` === `${[0, 1, 0]}`) {
      norm[0] = norm[0] + symbolVal * 0.0001;
      norm[1] = norm[1] + symbolVal * 0.0001;
      norm[2] = norm[2] + symbolVal * 0.0001;
    }
  });

  // 另一个矩阵转换
  a = mathjs.matrix([
    [vector1Norm[0], vector1Norm[1], vector1Norm[2]],
    [vector2Norm[0], vector2Norm[1], vector2Norm[2]],
    [0, 1, 0],
  ]);

  b = mathjs.matrix([[0], [0], [1]]);

  const vector3 = mathjs.lusolve(a, b)._data;

  const vector3Size = Math.sqrt(
    Math.pow(vector3[0][0], 2) +
    Math.pow(vector3[1][0], 2) +
    Math.pow(vector3[2][0], 2));
  const vector3x = vector3[0][0] / vector3Size;
  const vector3y = vector3[1][0] / vector3Size;
  const vector3z = vector3[2][0] / vector3Size;
  const vector3Norm = [vector3x, vector3y, vector3z];

  // pointx, pointy, pointz = data.shape
  // pic_center = [data.shape[0] / 2, data.shape[1] / 2, data.shape[2] / 2]
  const width = 256;
  const half = width >> 1;
  const floorHalf = ~~half;
  const picCenter = { x: half, y: half, z: half };

  let nextData = [];
  for (let index = 0; index < xList.length; index++) {
    const newX = xList[index];
    const newY = yList[index];
    const newZ = zList[index];

    const newData = mathjs.zeros(width * width)._data;
    const newCenter = { x: newX, y: newY, z: newZ };

    const startX = -floorHalf >> 1;
    const endX = floorHalf >> 1;
    let hasVal = false;
    for (let i = startX; i < endX; i++) {
      if (hasVal) break;
      const startY = -floorHalf >> 1;
      const endY = floorHalf >> 1;

      for (let j = startY; j < endY; j++) {
        const nextI = ~~((i * vector2Norm[0] + j * vector3Norm[0]) + floorHalf + newCenter.x - picCenter.x);
        const nextJ = ~~((i * vector2Norm[1] + j * vector3Norm[1]) + floorHalf + newCenter.y - picCenter.y);
        const nextK = ~~(i * vector2Norm[2] + j * vector3Norm[2] + floorHalf + newCenter.z - picCenter.z);

        if (nextI < 0 || nextJ < 0 || nextK < 0) continue;

        const dataIndex = Math.pow(width, 2) * nextK + width * nextJ + nextI;

        const newDataIndex = width * (j + floorHalf) + (i + floorHalf);

        if (data[dataIndex]) {
          hasVal = true;
          break;
        }

        newData[newDataIndex] = data[dataIndex];
      }
    }

    // 过滤掉有值的层
    if (!hasVal) {
      nextData = nextData.concat(newData);
      const distance = Math.round((newY - target.i) ** 2 + (newX - target.j) ** 2 + (newZ - target.k) ** 2) ** 0.5;

      return distance;
    }
  }

  return NaN;
};
const voxelToWorld = (volume, i, j, k, stepRotio = 1) => {
  let ordered = {};
  let x; let y; let z;
  let header = volume.header;

  ordered[header.order[0]] = i;
  ordered[header.order[1]] = j;
  ordered[header.order[2]] = k;

  x = ordered.xspace;
  y = ordered.yspace;
  z = ordered.zspace;

  let cx = header.xspace.direction_cosines;
  let cy = header.yspace.direction_cosines;
  let cz = header.zspace.direction_cosines;
  let stepx = header.xspace.step * stepRotio;
  let stepy = header.yspace.step * stepRotio;
  let stepz = header.zspace.step * stepRotio;
  let o = header.voxel_origin;

  return {
    x: x * cx[0] * stepx + y * cy[0] * stepy + z * cz[0] * stepz + o.x,
    y: x * cx[1] * stepx + y * cy[1] * stepy + z * cz[1] * stepz + o.y,
    z: x * cx[2] * stepx + y * cy[2] * stepy + z * cz[2] * stepz + o.z,
  };
};

const worldToVoxel = (volume, x, y, z) => {
  let header = volume.header;
  let xfm = volume.header.w2v;   // Get the world-to-voxel transform.
  let result = {
    vx: x * xfm[0][0] + y * xfm[0][1] + z * xfm[0][2] + xfm[0][3],
    vy: x * xfm[1][0] + y * xfm[1][1] + z * xfm[1][2] + xfm[1][3],
    vz: x * xfm[2][0] + y * xfm[2][1] + z * xfm[2][2] + xfm[2][3],
  };

  let ordered = {};
  ordered[header.order[0]] = Math.round(result.vx);
  ordered[header.order[1]] = Math.round(result.vy);
  ordered[header.order[2]] = Math.round(result.vz);

  return {
    i: ordered.xspace,
    j: ordered.yspace,
    k: ordered.zspace,
  };
};

const getIntensityValueSimple = (volume, i, j, k) => {
  let header = volume.header;

  if (i < 0 || i >= header[header.order[0]].space_length ||
    j < 0 || j >= header[header.order[1]].space_length ||
    k < 0 || k >= header[header.order[2]].space_length) {
    return 0;
  }

  // eslint-disable-next-line camelcase
  let xyzt_offset = (i * header[header.order[0]].offset +
    j * header[header.order[1]].offset +
    k * header[header.order[2]].offset +
    0);

  return volume.data[xyzt_offset];
};
