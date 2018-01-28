import FetchMcok from 'fetch-mock';

/*假装有服务端,伪造服务数据*/

//	伪造端口实例:FetchMcok.mock('/login',{code:200,message:'登录成功'});


//模拟登录接口,并对携带的密码进行校验
FetchMcok.mock('/login',(url,opts) => {
	//请求参数
	const params = opts.params;
	//手机号登录,假装校验
	if(params.account === '123456789'){
		if(params.password === '123456789'){
			return {code:200,message:'登录成功'};
		}else{
			return {code:400,message:'密码错误'};
		}
		
	}else{
		return {code:400,message:'用户名错误'};
	}
})
