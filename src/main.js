// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import axios from 'axios';

// import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';
import store from './store';

/* does not work?
axios.defaults.baseURL = '/api/v1';
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.post.Accepts = 'application/json';
*/

Vue.config.productionTip = false;

// Vue.use(BootstrapVue);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
