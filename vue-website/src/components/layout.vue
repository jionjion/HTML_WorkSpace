<!--布局页面-->
<template>
  <div>
  	<!--头部-->
    <div class="app-head">
      <div class="app-head-inner">
      	<!--跳转主页-->
      	<router-link :to="{path:'/'}">
	        <img src="../assets/logo.png">
      	</router-link>
        <div class="head-nav">
          <ul class="nav-list">
          	<!--登录后显示用户名-->
          	<template v-if="username">
          	<li>{{username}}</li>
          	<li class="nav-pile">|</li>
          	<li v-on:click="quitClickFn">退出</li>
          	</template>
          	<!--点击事件-->
            <li v-if="!username" v-on:click="loginClickFn">登录</li>
            <li class="nav-pile">|</li>
            <li v-on:click="signClickFn">注册</li>
            <li class="nav-pile">|</li>
            <li v-on:click="aboutClickFn">关于</li>
          </ul>
        </div>  
      </div>
    </div>
    
    <!--内容-->
    <div class="app-content">
    	<!--使用路由切换,并缓存-->
    	<keep-alive>
	    	<router-view></router-view>
    	</keep-alive>
    </div>
    <!--底部-->
    <div class="app-foot">
      <p>© 2016 fishenal MIT</p>
    </div>
    <!--登录弹窗组件,点击各种按钮时修改isShowDialog属性显示弹窗  自定义onClose关闭弹窗事件触发closeDialogFn()函数-->
    <app-dialog v-bind:isShow="isShowLoginDialog" v-on:on-close="closeDialogFn('isShowLoginDialog')">
    	<!--登录组件 has-log自定义抛出登录成功事件-->
    	<login-form v-on:has-log="onSuccessLoginFn"></login-form>
    </app-dialog>
    <!--注册弹窗组件-->
    <app-dialog v-bind:isShow="isShowSignDialog" v-on:on-close="closeDialogFn('isShowSignDialog')">
    	<!--注册组件-->
    	<sign-form></sign-form>
    </app-dialog>
    <!--关于弹窗组件-->
    <app-dialog v-bind:isShow="isShowAboutDialog" v-on:on-close="closeDialogFn('isShowAboutDialog')">
    	<p>这是一个使用Vue框架实现的前端页面</p>
    </app-dialog>
  </div>
</template>

<!--默认JS-->
<script>
	//弹窗组件
	import Dialog from './base/dialog'
	//登录与注册组件
	import LoginForm from './loginForm'
	import SignForm from './signForm'
	
	export default {
		//数据对象
		data() {
			return {
				//是否显示登录弹窗组件
				isShowLoginDialog:false,
				//是否显示注册弹窗组件
				isShowSignDialog:false,
				//是否显示关于弹窗组件
				isShowAboutDialog:false,
				//当前用户名
				username:"",
			}
		},
		//组件
		components:{
			AppDialog:Dialog,
			LoginForm:LoginForm,
			SignForm:SignForm
		},
		//方法
		methods:{
			//点击[登录]按钮
			loginClickFn(){
				this.isShowLoginDialog = true;
			},
			//点击[注册]按钮
			signClickFn(){
				this.isShowSignDialog = true;
			},
			//点击[关于]按钮
			aboutClickFn(){
				//显示弹窗
				this.isShowAboutDialog = true;
			},
			//点击[退出]按钮
			quitClickFn(){
				this.username = "";
			},
			//关闭弹窗函数
			closeDialogFn(attr){
				//隐藏对应属性的弹窗
				this[attr] = false;
			},
			//登录成功事件
			onSuccessLoginFn(e){
				//获得登录组件登录成功事件
				console.log("登录成功事件",e);
				this.username = e.username;
				//关闭登录弹窗
				this.closeDialogFn('isShowLoginDialog');
			}
		}
	}
</script>


<!--全局样式-->
<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}
.g-form {

}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>