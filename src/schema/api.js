

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
  console.log(this.configData)
  let configArr = analysisRenderConfig(this.configData, h); 
  console.log(configArr)
  return h(
      'span',
      {
          attrs: {
              class: 'foo'
          }
      },
      configArr
  )
}