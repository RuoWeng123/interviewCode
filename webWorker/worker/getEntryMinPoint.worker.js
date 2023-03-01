import {getMinPoint} from './calMinEntryPoint';
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
onmessage = function (e) {
  const {volume, target, planId} = e.data;

  let data = getMinPoint(target, volume, planId);

  postMessage(data);
};
