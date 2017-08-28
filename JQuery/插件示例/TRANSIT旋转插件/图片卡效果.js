/*立即执行函数,在js加载时即可执行,将其写为闭包函数,可以在js中任何位置调用*/
var loopPlayerInit = (function(){
	
	//创建JQuery对象
	var $btnLeft = null;
	var $btnRight = null;
	var $btnPlay = null;
	var $imgList = null;				//避免他人调用时为空
	var imgAll = [	['img/img01.jpg','img/img02.jpg','img/img03.jpg','img/img04.jpg'],
					['img/img02.jpg','img/img07.jpg','img/img08.jpg','img/img01.jpg'],
					['img/img03.jpg','img/img06.jpg','img/img09.jpg','img/img05.jpg'],
					['img/img04.jpg','img/img05.jpg','img/img01.jpg','img/img08.jpg']	];//图片地址
	var imgArrIndex = 0;				//图片组的索引	
	var imgAng = -15;					//初始角度
	var imgTime = 500;					//图片间隔时间
	var origin = ['125px','600px'];		//旋转中线点
	function init(){
		//为对象赋初值
		$btnLeft = $('.btn_left');
		$btnRight = $('.btn_right');
		$btnPlay = $('.btn_play');
		$imgList = $('.main_box ul li');	//主容器下的所有li元素
	
		//将图片对象进行旋转
		imgsConfig();
		
		//事件添加
		setEvent();
	}
	
	/*将JQuery对象进行初始化旋转*/
	function imgsConfig(){
		var angle = imgAng;				//初始角度,-15°			
		$imgList.each(function(){
			var $liImg = $(this);		//获得图片对象们的每一个
			$liImg.css({ transformOrigin: origin })
					.transition({rotate: angle+'deg'});
			angle = angle + 10;		//每次增加15°
		});
	}
	
	/*按钮事件*/
	function setEvent(){
		$btnLeft.bind('click',function(){			//on绑定事件包括<a>标签自带的跳转事件;bing绑定事件不包括<a>标签自带的跳转事件
			animeGo(-1);								//animeGo()动画事件
			return false;							//禁止<a>链接跳转事件
		});
		
		$btnRight.bind('click',function(){
			animeGo(1);							//animeGo()动画事件
			return false;						
		});
	
		$btnPlay.bind('click',function(){			
			return false;							
		});
	}
	
	/*动画切换事件*/
	function animeGo(go){
		imgArrIndex = imgArrIndex + go;			//获得目标的图片组
		if(imgArrIndex>imgAll.length-1){imgArrIndex=0;}
		else if(imgArrIndex<=0){imgArrIndex=imgAll.length-1;}	//判断索引位置,构成一个循环
		var $imgs = createImg(imgAll);			//将图片地址传入,创建图片dom元素二维数组
		var angle = imgAng;	
		$imgList.each(function(i){				//遍历图片的存放的li元素
			var $liImg = $(this);					//li元素
			var $img = $liImg.children('img');       	//获得图片对象
			var $newImg = $($imgs[imgArrIndex][i]);//传入imgArrIndex第几组图片,i该组图片的位置,获得新的图片对象
			$liImg.append($newImg);					//将新图片装入到li元素中
			$liImg.css({ transformOrigin: origin });
			$newImg.css({ transformOrigin: origin });
			$liImg.animate({rotate:angle+'deg'});	//rotate: angle+'deg'
			angle = angle + 10;		//每次增加15°
		})
		
	}
	
	/*根据数组创建图片,返回一个图片对象数组*/
	function createImg(arr){
		var imgArr = [];
		for(var i in arr){							//遍历二维数组的第一维,遍历出四组一维数组
			imgArr[i] = [];							//创建的一位数组
			for(var j in arr[i]){					//遍历二维数组的第二维,遍历出图片的地址
				 imgArr[i][j] = new Image();		//创建图片对象
				 imgArr[i][j].src = arr[i][j];		//为图片对象数组设置图片
			}
		}
		return imgArr;
	}
	
	return init;
})();


loopPlayerInit();
