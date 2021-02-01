// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as antd from '@antv/g2';
import OGVSchema from './schema/index';
import ElementUI from 'element-ui';
import oButton from './views/OGV-form-design/components/o-buttonRender'
import oInput from './views/OGV-form-design/components/o-inputRender'
import oHtml from './views/OGV-form-design/components/o-htmlRender'
import oHtmlRender from './views/OGV-form-design/components/o-htmlRender'
import oFormRender from './views/OGV-form-design/components/o-formRender'
import oRowRender from './views/OGV-form-design/components/o-rowRender'
import oColRender from './views/OGV-form-design/components/o-colRender'

import 'element-ui/lib/theme-chalk/index.css';
import Tinymce from '@/components/tinymce/index.vue'

Vue.component('tinymce', Tinymce)
Vue.use(ElementUI);
Vue.use(OGVSchema);
Vue.component('oButton', oButton)
Vue.component('oInput', oInput)
Vue.component('oHtml', oHtml)
Vue.component('oFormRender', oFormRender)
Vue.component('oHtmlRender', oHtmlRender)
Vue.component('oRow', oRowRender)
Vue.component('oCol', oColRender)

Vue.config.productionTip = false
console.log(antd.VERSION)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
