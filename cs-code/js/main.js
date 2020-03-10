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
	
	//上传图片方法 filename 文件名,暂时不支持文件名方式上传.暂定为获得页面嵌入验证码  TODO
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
        file = Tools.getCodeImage();
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
		if(files != undefined){
			// 二进制打开文件
            file = Tools.getBase64Image(files);
            fields['file'] = file
		}
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

		//使用Form表单结合Post请求发送报文
//		var formData = new FormData();
//		formData.append("method", 'login');
//	    formData.append("username", 'jionjion');
//	    formData.append("password", 'jionjion520');
//	    formData.append("appcodetypekey", '1005');
//	    formData.append("appid", '5015');
//	    formData.append("appkey", '79c2d472c2e7f49d42f793fcc0d08af3');
//	    formData.append("timeout", '60');
//	    formData.append("file", files);
	    
	    
		
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
		ctx.drawImage(img, 0, 0, img.width, img.height);

		// 火狐支持PNG,JPG格式
		var dataURL = canvas.toDataURL("image/png");
		return dataURL;
//		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");	//编码开头文件格式
	},

	//获得页面中的图片对象,只返回第一个,默认页面之中只有一个未识别的验证码
	getCodeImage: function(){
		// TODO
		var image = $('#code')[0];
		return image;
	},
	
	//将base64转为blob对象
	

	//将图片转为file文件对象
	getFileImage:function(img){
		var data = Tools.getBase64Image(img);
		
	}
}

var test = {
	
	
	sumitImageFile : function (){  
		
		file = Tools.getCodeImage();
		
		base64Codes = Tools.getBase64Image(file);
		
	
	    var formData = new FormData();   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数  
		formData.append("method", 'upload');
	    formData.append("username", 'jionjion');
	    formData.append("password", 'jionjion520');
	    formData.append("appcodetypekey", '1005');
	    formData.append("appid", '5015');
	    formData.append("appkey", '79c2d472c2e7f49d42f793fcc0d08af3');
	    formData.append("timeout", '60');
	    //convertBase64UrlToBlob函数是将base64编码转换为Blob  
	    formData.append("file",test.convertBase64UrlToBlob(base64Codes));  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同  
	
	    //ajax 提交form  
	    $.ajax({  
	        url : 'http://api.yundama.com/api.php',  
	        type : "POST",  
	        data : formData,  
	        dataType:"text",  
	        async:false,
	        processData : false,         // 告诉jQuery不要去处理发送的数据  
	        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头  
	
	        success:function(data){  
	            console.log(data);	  
	        }
	    });  
	}  
	,
	convertBase64UrlToBlob : function (urlData){  
	
	    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
	
	    //处理异常,将ascii码小于0的转换为大于0  
	    var ab = new ArrayBuffer(bytes.length);  
	    var ia = new Uint8Array(ab);  
	    for (var i = 0; i < bytes.length; i++) {  
	        ia[i] = bytes.charCodeAt(i);  
	    }  
	
	    return new Blob( [ab] , {type : 'image/png'});  
	}  
}