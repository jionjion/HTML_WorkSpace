import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/pages/index'
import DetailPage from '@/pages/detail'
import OrderListPage from '@/pages/orderList'
import CountPage from '@/pages/detail/count'
import ForecastPage from '@/pages/detail/forecast'
import AnalysisPage from '@/pages/detail/analysis'
import PublishPage from '@/pages/detail/publish'


Vue.use(Router)

//导出配置对象,默认放在根目录下
export default new Router({

	//开启历史记录
	mode: 'history',

	//路由映射配置
	routes: [
		//根节点
		{
			path: '/',
			name: '主页',
			component: IndexPage
		},
		//详情页面
		{
			path: '/detail',
			name: '详情页',
			//重定向到第一个页面
			redirect:'/detail/count',
			component: DetailPage,
			//子路由配置
			children:[
				{
					//子页面路径,不加/根节点
					path: 'count',
					//子页面组件
					component: CountPage
				},
				{
					//子页面路径,不加/根节点
					path: 'forecast',
					//子页面组件
					component: ForecastPage
				},
				{
					//子页面路径,不加/根节点
					path: 'analysis',
					//子页面组件
					component: AnalysisPage
				},
				{
					//子页面路径,不加/根节点
					path: 'publish',
					//子页面组件
					component: PublishPage
				},
			]
		},
		//订单列表
		{
			path: '/orderList',
			name: '订单列表',
			component: OrderListPage
		}
	],
})