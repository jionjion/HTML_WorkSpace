
/*表单验证的共同校验*/

const check = (form) => {
	
	//校验规则
	const rules = {
		//手机验证
		mobile: (v) => {
			return
		},
		//邮箱验证
		email: (v) => {
			return
		},
		//必填校验
		present: (v) => {
			if(!v.trim()){
				return{
					type:'present',
					message:'必填'
				}
			}
			return
		}
	}
	
	//非空校验
	if(!(form && form.elements)){
		return;
	}
	
	//表单对象
	const elements = form.elements;
	let checkResult = [];
	let errorArr = [];
	Array.from(elements).filter(item => {
		return item.getAttribute('valid');
	}).map(item => {
		const valids = item.getAttribute('valid').split(',');
		const value = item.value;
		valids.forEach(valid => {
			//是否存在校验
			if(rules[valid]){
				let result = rules[valid](value);
				//将验证结果写入错误信息中
				result && errorArr.push(result);
			}
		});
		//验证结果返回
		if(errorArr.length){
			checkResult.push({
				dom:item,
				errorArr:errorArr,
				name:item.name,
				message:errorArr[0].message,
				type:errorArr[0].type
			});
		}
		
	});
	
	return checkResult;
}


export { check }
