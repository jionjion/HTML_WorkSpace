
//require('./world.js');		//commonJS的引入方式
//require('style-loader!css-loader!./style.css');		//commonJS的引入方式
import './world.js';			//ES6的写法
import 'style-loader!css-loader!./style.css';			//ES6的写法

(function hello (str){
	alert(str);
})('hello word!');
