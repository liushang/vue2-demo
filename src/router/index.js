import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import newDesign from '../views/OGV-form-design/index.vue'
import oButton from '../views/OGV-form-design/components/o-button.vue'
import oButtonRender from '../views/OGV-form-design/components/o-buttonRender.js'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: newDesign
    }, {
      path: '/o-button',
      name: 'HelloWorld',
      component: oButton
    }, {
      path: '/o-buttonRender',
      name: 'HelloWorld',
      component: oButtonRender
    }
  ]
})
