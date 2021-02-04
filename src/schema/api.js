

import { analysisRenderConfig, analysisDataRender } from './util';

export function created() {
  this.configData = analysisDataRender(this.configComponents.children);
}

export const computed = {
  configData() {
    return analysisDataRender(this.configComponents.children);
  }
}

export function render(h) {
  // this.configData = analysisDataRender(this.configComponents.children);
  let configArr = analysisRenderConfig(this.configData, h); 
  console.log(configArr)
  if (configArr.length > 1) {
    return h(
      'div',
      null,
      configArr
    )
  } else {
    return configArr[0]
  }
  
}