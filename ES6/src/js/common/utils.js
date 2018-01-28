/*工具方法模块*/


// 根据id获得dom对象,并改变原对象的id结合随机数,避免重复
const getId = (id) => {
	const dom = document.getElementById(id);
	dom && dom.setAttribute('id',dom.id + '-' + Math.floor(Math.random() * 100000));
	return dom;
}

/*导出函数对象,并使用别名$*/
export { getId as $ }
