import {LOCALSURFENTRYPOINT_VERSION} from '@/renderer/utils/worker/calMinEntryPoint';

export const getLocalSurfEntryPoint = (planId, target) => {
  const key = getLocalSurfEntryPointKey(planId, target);
  const minPointStr = window.localStorage.getItem(key);

  if (!minPointStr) return;

  try {
    const minPoint = JSON.parse(minPointStr);

    return minPoint;
  } catch (e) {
    // catch err
  }

  return;
};

export const setLocalSurfEntryPoint = (planId, target, minPoint) => {
  const key = getLocalSurfEntryPointKey(planId, target);
  try {
    const minPointStr = JSON.stringify(minPoint);
    window.localStorage.setItem(key, minPointStr);
  } catch (e) {
    // catch err
  }
};

export const getLocalSurfEntryPointKey = (planId, target) => {
  const {x, y, z} = target;

  return `SurfPoint_${LOCALSURFENTRYPOINT_VERSION}_${planId}_${x}_${y}_${z}`;
};
