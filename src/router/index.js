import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import newDesign from '../views/OGV-form-design/index.vue'
import oButton from '../views/OGV-form-design/components/o-button.vue'
import oButtonRender from '../views/OGV-form-design/components/o-buttonRender.js'
import oInputRender from '../views/OGV-form-design/components/o-inputRender.js'
import oFormRender from '../views/OGV-form-design/components/o-formRender.js'
import oRowRender from '../views/OGV-form-design/components/o-rowRender.js'
import oForm from '../views/OGV-form-design/oForm'
import Home from '../views/index/Home.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    }, {
      path: '/o-button',
      name: 'HelloWorld',
      component: oButton
    }, {
      path: '/o-row',
      name: 'HelloWorld',
      component: oRowRender
    }, {
      path: '/o-buttonRender',
      name: 'HelloWorld',
      component: oButtonRender
    }, {
      path: '/o-inputRender',
      name: 'HelloWorld',
      component: oInputRender
    }
  ]
})
