import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HeadTop from '../components/nav/nav'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'head',
      component: HeadTop
    }
  ]
})
