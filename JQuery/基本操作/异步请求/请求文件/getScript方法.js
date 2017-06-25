var data = [{
	"name": "足球"
}, {
	"name": "散步"
}, {
	"name": "篮球"
}, {
	"name": "乒乓球"
}, {
	"name": "骑自行车"
}];

/*请求,并自动执行文件的方法*/
$.each(data, function(index, sport) {
	//查找第二个,并追加
	if(index == 1)	{
		$("ul").append("<li>" + sport["name"] + "</li>");
		$("ul").append("<li>" + sport.name + "</li>");
	}
});