/** 
 *	全局JS配置 	
 * */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//根组件
new Vue({
  render: h => h(App)
}).$mount('#app')
