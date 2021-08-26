/** 存放浏览器方法*/
const STORAGE_KEY = 'todos-vuejs';

//暴露功能
export default {
	//暴露抓取方法
	fetch() {
		//返回JSON数据,没有获得返回空数组
		return JSON.parse(
			window.localStorage.getItem(STORAGE_KEY) || '[]'
		)
	},
	//暴露保存方法
	save(items) {
		//JSON保存
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	}

}