// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import Axios from "axios"
//vuex
import store from "./store"
//loading
import Loading from "./loading"
Vue.use(Loading)
Vue.config.productionTip = false
//axios 配置
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
Axios.interceptors.request.use(function (config) {  //配置发送请求的信息
	store.dispatch("showLoading");
  return config;
}, function (error) {
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) { //配置请求回来的信息
	store.dispatch("hideLoading");
  return response;
}, function (error) {

  return Promise.reject(error);
});

/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
//axios.defaults.baseURL='http://localhost:8082/';
Vue.prototype.$http = Axios  //其他页面在使用axios的时候直接  this.$http就可以了
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
