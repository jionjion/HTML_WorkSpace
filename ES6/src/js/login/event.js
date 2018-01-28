import { $ } from '../common/utils.js';
import { fetchPost } from '../common/fetch.js';
import { check } from '../common/form-check.js';

/*模块事件函数*/


/*导出一个函数,在引用的对象_default函数下挂载*/
export default (opts = {}) => {
	//通过工具方法,获得dom元素
	const $loginForm = $('login-form');
	const $loginBtn = $('login-btn');
	const $remember = $('login-remember');
	const $clearAccount = $('clear-account');
	const $clearPassword = $('clear-password');
	const $account = $('login-account');
	const $password = $('login-password');
	const $error = $('login-error');
	
	//隐藏清除按钮
	$clearAccount.style.display = 'none';		
	$clearPassword.style.display = 'none';
	
	//点击登录按钮或者键盘回车执行登录事件, 使用async关键字修饰函数,表示这是一个异步函数
	$loginForm.onsubmit = async () => {
		/*	使用　fetch API进行后端交互 
		fetch(url,{}).then((res) => {//提交url和参数,获得响应内容
			res.json();				//响应
			handle(res.json());		//处理响应
		}).then();					//等待
		*/
		
		//验证表单是否符合要求
		const checkResults = check($loginForm);
		debugger;
		if(!checkResults.length){
			//定义变量,是否勾选记住密码
			let remeber = '0';
			if($remember.getAttribute('checked')){
				remeber = '1';
			}
			
			//使用await关键字,构建异步请求,并获得返回值.这里fetchPost是我写的函数
			const data = await fetchPost('/login',{
				account: $account.value,
				password: $password.value,
				remember: remeber
			});
			
			if(data.code=200){
				//使用下游业务定义的success()函数作为处理结果
				opts.success && opts.success();
			}else{
				$error.innerHTML=data.message;
			}
		}else{
			//表单验证失败
			const name = checkResults[0].name;
			const type = checkResults[0].type;
			if(type==='present'){
				if(name==='account'){
					$error.innerHTML='请填写您的用户名!';
				}
				if(name==='password'){
					$error.innerHTML='请填写您的密码!';
				}				
			}
			
		}
	}
	
	//账号输入提示
	$account.oninput = () => {
		if($account.value.length){
			$clearAccount.style.display = 'inline';
		}else{
			$clearAccount.style.display = 'none';
		}
		
		$error.innerHTML = '';
	}
	
	//账号输入框有值时,显示一键删除按钮
	$clearAccount.onclick = () => {
		$account.value = '';
		$clearAccount.style.display = 'none';
	}
	
	//密码输入框有值时,显示一键删除按钮
	$password.oninput = () => {
		if($password.value.length){
			$clearPassword.style.display = 'inline';
		}else{
			$clearPassword.style.display = 'none';
		}
		
		$error.innerHTML = '';		
	}
	
	//账号输入提示,当再次输入时,错误提示消失
	$clearPassword.onclick = () => {
		$password.value = '';
		$clearPassword.style.display = 'none';		
	}
	
	//提交时表单检验
	
}