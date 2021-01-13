import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld1 from '../modules/moduleone/test.vue'
import HelloWorld2 from '../modules/moduletwo/test.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld2
    }
  ]
})
