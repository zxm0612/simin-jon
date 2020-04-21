import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './flux';
import routes from './router/router';
import ElementUI from 'element-ui';
import './primary/index.scss';
import {routerMode} from './config/env'

Vue.use(VueRouter);
Vue.use(ElementUI);
const router = new VueRouter({
  routes,
  mode:'history'
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

