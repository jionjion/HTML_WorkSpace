import '../common/polyfill.js';
import render from './render.js';
import bingEvent from './event.js';


/*模块入口函数*/

//定义暴露函数,传入配置参数为对象格式,默认值为空
const login = (opts ={}) => {
	//默认配置
	const defaultOpts = {
		loginBtnText: '登 录',
		accountLable: '手机',
		passwordLable: '密码',
		accountPlaceholder: '请输入用户名',
		passwordPlaceholder: '请输入密码',
		autocomplete:false
	};
	
	//对比用户传入配置与默认,传入则覆盖.
	const options =Object.assign(defaultOpts,opts);
	//根据配置进行渲染
	render(options);
	//根据配置绑定事件
	bingEvent(options);
}


/*模块的输出对象,需要使用{}进行规范,同时不能直接输出一个常量,一定要指向内部的一个常量*/
export { login }
