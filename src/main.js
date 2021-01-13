// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as antd from '@antv/g2';
import OGVSchema from './schema/index';
Vue.use(OGVSchema);

Vue.config.productionTip = false
console.log(antd.VERSION)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
