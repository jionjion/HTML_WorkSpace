/**
 * 	请求调用的主JS
 * 	使用ES4编写
 * 
 * 	错误代码
 * 		-9001 登录请求失败
 */

// 引入辣鸡百度的CDN
document.write("<script language=javascript src='http://libs.baidu.com/jquery/2.0.0/jquery.min.js'></script>");

/*
 * 	重写方法
 * 		user_info 	用户信息
 * 		request		通用请求调用
 * 		login		登录获取
 * 		balance		查询余额
 * 		upload		上传图片
 * 		post_url	封装POST请求
 */
var YDMHttp = {
	// 请求信息
	'user_info' : {
		'apiurl' : 'http://api.yundama.com/api.php',
		'username' : 'jionjion',
		'password' : 'jionjion520',
		'appid' : '5015',
		'appkey' : '79c2d472c2e7f49d42f793fcc0d08af3',
		'codetype' : '1005',
		'timeout' : '60'
	},
	
	// 包装请求操作
	'request' : function(fields, files){
        response = YDMHttp.post_url(YDMHttp.user_info.apiurl, fields, files);
        //格式化为JSON
        debugger
        response = JSON.parse(response);
        return response;
	},
	
	// 登录操作
	'login' : function(){
		data = {
			'method': 'login',
			'username': YDMHttp.user_info.username,
			'password': YDMHttp.user_info.password,
			'appid': YDMHttp.user_info.appid,
			'appkey': YDMHttp.user_info.appkey
		};
		response = YDMHttp.request(data);
        if (response){
	        if (response['ret'] && response['ret'] < 0){
	        	// ret为负,错误代码,服务器返回错误代码,将其返回
	            return response['ret'];
	        }else{
	        	// ret=0,登录成功,服务器返回uid,5位随机数,将其返回
	            return response['uid'];
	        }
        }else{
        	return -9001;
        }
	},
	
	// 查询余额
    'balance' : function(){
    	data = {
    		'method': 'balance',
    		'username': YDMHttp.user_info.username,
			'password': YDMHttp.user_info.password,
			'appid': YDMHttp.user_info.appid,
			'appkey': YDMHttp.user_info.appkey
    	};
    	response = YDMHttp.request(data);
    	if (response){
    		if(response['ret'] && response['ret'] < 0){
    			return response['ret'];
    		}else{
    			return response['balance'];
    		}
    		    
    	}else{
    		return -9001;
    	}
    },
	
	//上传图片方法 filename 文件名,暂时无用  TODO
	'upload' : function(filename){
		debugger;
        data = {
     		'method': 'upload',
     		'username': YDMHttp.user_info.username,
     		'password': YDMHttp.user_info.password,
     		'appid': YDMHttp.user_info.appid,
     		'appkey': YDMHttp.user_info.appkey,
     		'codetype': YDMHttp.user_info.codetype,
        	'timeout': YDMHttp.user_info.timeout
        };
        //图片对象
        file = {
        	'file': Tools.getCodeImage()
        };
        YDMHttp.request(data,file);
        if (response){
            if (response['ret'] && response['ret'] < 0){
                return response['ret'];
            }else{
                return response['cid'];
            }
        }else{
            return -9001;        
        }
	},
	
	// post请求 fields参数JSON , files文件信息
	'post_url': function(url,fields, files){
		// 针对文件列表,循环打开文件,其实只有一张图片
		//TODO 没有调试过
		$.each(files, function(index,element) {
			// 二进制打开文件
            file = getBase64Image(element);
            fields['file'] = file
		});
		//ajax提交,并同步获得报文后返回
		var data = $.ajax({
			type:"post",
			url:url,
			data:fields,
			datatype:'json',
			async:false,
			success : function(data){
				return data;
			}
		}).responseText;
		return data;
	}
}

/**
 * 	工具方法
 * 		getBase64Image	将图片转为二进制
 * 		
 */
var Tools = {
	
	//将图片对象转为二进制
	getBase64Image: function(img) {
		// 创建一个空画板对象
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		// 拷贝图片到画板对象
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		// 火狐支持PNG,JPG格式
		var dataURL = canvas.toDataURL("image/png");

		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	},

	//获得页面中的图片对象,只返回第一个
	getCodeImage: function(){
		// TODO
		var image = $('#code')[0];
		return image;
	}
}

