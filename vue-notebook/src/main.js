// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

//  ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 基础URL,根据配置文件指定具体的URL
// 基础URL,根据配置文件指定具体的URL,仅生产环境需要
axios.defaults.baseURL = process.env.API_HOST
// 请求拦截,增加token @TODO
axios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('token')
    if (token) {
      // 手动增加请求头
      config.headers.common.token = token
    }
    // 在发送请求之前做些什么
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
