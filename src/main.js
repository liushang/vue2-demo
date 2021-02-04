// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as antd from '@antv/g2';
import OGVSchema from './schema/index';
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import ElementUI from 'element-ui';
import oButton from './views/OGV-form-design/components/o-buttonRender'
import oSwitch from './views/OGV-form-design/components/o-switchRender'
import oInput from './views/OGV-form-design/components/o-inputRender'
import oHtml from './views/OGV-form-design/components/o-htmlRender'
import oHtmlRender from './views/OGV-form-design/components/o-htmlRender'
import oFormRender from './views/OGV-form-design/components/o-formRender'
import oForm from './views/OGV-form-design/components/o-formRender'
import oFormItem from './views/OGV-form-design/components/o-formItemRender'
import oRowRender from './views/OGV-form-design/components/o-rowRender'
import oColRender from './views/OGV-form-design/components/o-colRender'

import 'element-ui/lib/theme-chalk/index.css';
import Tinymce from '@/components/tinymce/index.vue'
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)
Vue.component('tinymce', Tinymce)
Vue.use(ElementUI);
Vue.use(OGVSchema);
Vue.component('oButton', oButton)
Vue.component('oInput', oInput)
Vue.component('oHtml', oHtml)
Vue.component('oFormRender', oFormRender)
Vue.component('oHtmlRender', oHtmlRender)
Vue.component('oForm', oForm)
Vue.component('oFormItem', oFormItem)
Vue.component('oRow', oRowRender)
Vue.component('oCol', oColRender)
Vue.component('oSwitch', oSwitch)

Vue.config.productionTip = false
console.log(Vue)
/* eslint-disable no-new */
let oo = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
console.log(oo)
