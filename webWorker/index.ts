import { getLocalSurfEntryPoint, setLocalSurfEntryPoint } from './worker/getLocalSurfEntryPoint';
// @ts-ignore
import Worker from './worker/getEntryMinPoint.worker';
type SpotType = {
  isActive: boolean;
  volSeed: {x: number, y: number, z: number};
}

// 在react中调用 beyondCalMinEntryPoint
export const beyondCalMinEntryPoint = (volumeViewer: any, volumeScalpMaskIndex: number, spotList: SpotType[], planId: number) =>{
  // let scalpVolume;
  if(volumeScalpMaskIndex && volumeViewer.volumes.length >3){
    let scalpVolume = {
      data: volumeViewer.volumes[volumeScalpMaskIndex].data,
      header: volumeViewer.volumes[volumeScalpMaskIndex].header,
    };
    let target = spotList.find((item: SpotType) =>item.isActive)?.volSeed;
    const minPoint = getLocalSurfEntryPoint(planId, target);
    if (minPoint) return minPoint;
    // @ts-ignore
    const myCalMinPointWorker = new Worker();
    myCalMinPointWorker.postMessage({volume: scalpVolume, target, planId});
    myCalMinPointWorker.addEventListener('message', (e: any)=>{
      setLocalSurfEntryPoint(planId, target, e.data);
      console.log('独立线程计算完毕，马上关闭', e.data); // eslint-disable-line no-console
      myCalMinPointWorker.terminate();
    });
  }
};