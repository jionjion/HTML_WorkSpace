import  { $ } from '../common/utils.js';

/*模块渲染函数*/

//渲染函数
/*模板函数*/
const template = (opts ={}) => {
	//是否允许自动填充,将该字段放入模板中,使浏览器填充此不,不会触发业务登录的填充
	const autocompleteTpl = `
		<div id="on-autocomplete">
			<input type="text" />
			<input type="password"/>
		</div>
	`;
	//是否自动填充配置
	const autocompleteAdapter = opts.autocomplete ? '' : autocompleteTpl;
	const autocompleteValue = opts.autocompleteValue ? 'on' : 'off';
	//模板html字符串 
	const tpl = `
		<div id="login-wrapper">
			<form id="login-form" action="#" onsubmit="return false">
				${autocompleteAdapter}
				<br>
				<label>
					<span>${opts.accountLable}</span>
					<input id="login-account" name="account" type="text" placeholder="${opts.accountPlaceholder}" autocomplete="${autocompleteValue}" valid="present"/>
					<input id="clear-account" type="button" value="X"/>
				</label></br>
				<label>
					<span>${opts.passwordLable}</span>
					<input id="login-password" name="password" type="password" placeholder="${opts.passwordPlaceholder}" autocomplete="${autocompleteValue}" valid="present"/>
					<input id="clear-password" type="button" value="X"/>
				</label></br>
					<div id="login-error"></div>
				<label>
					<span>记住密码</span>
					<input id="login-remember" name="login-remember" type="checkbox" autocomplete="${autocompleteValue}"/>
				</label></br>
					<input id="login-btn" type="submit" value="${opts.loginBtnText}"/>
			</form>		
		</div>	
	`;
	return tpl;
}

/*导出一个函数,在调用对象的_default函数下挂载*/
export default (conf) => {
	//引入文件
	conf.container.innerHTML = template(conf);
	
	//隐藏自动填充的部分,拒绝在style中写样式,避免加载后在隐藏的出现
	const $noAutocomplete = $('on-autocomplete');
	if($noAutocomplete){
		$noAutocomplete.style.opacity = '0';
		$noAutocomplete.style.height = '0';
	}
}
