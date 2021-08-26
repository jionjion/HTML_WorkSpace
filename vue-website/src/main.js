//插件功能
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'

//页面
import Layout from './components/layout'


Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
	//挂载点
  el: '#app',
  //路由
  router,
  //组件
  components: { 
  	Layout 
  },
  //模板
  template: '<Layout/>'
})
