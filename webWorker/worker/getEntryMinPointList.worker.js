import {getMinPoint} from './calMinEntryPoint';
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
onmessage = function (e) {
  const {volume, volSeedList, planId} = e.data;

  let resultList = volSeedList.map(item =>{
    return {
      key: item,
      value: {},
    };
  });

  for(let item of resultList){
    item.value = getMinPoint(item.key, volume, planId);
  }

  postMessage(resultList);
};
