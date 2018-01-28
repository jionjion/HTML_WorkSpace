/*使用浏览器的feach API进行异步请求*/

//包装原有的feach函数,并返回请求结果
const fetchPost = (url,params) => {
	return fetch(url , {
		//参数构建
		method: 'POST',
		header: {
			"Content-Type": "application/x-www-form-urlencode"
		},
		//开启携带Cookies配置;默认不携带Cookies
		credentials: 'include',
		params: params
	}).then( (res) => {
		if(!res.ok){
			throw Error(res.statusText);
		}
		//返回结果
		return res.json();
	});
}

export { fetchPost }
