<!--登录组件-->
<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
        	<!--绑定usernameModel模型-->
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <!--用户错误提示,计算属性获得-->
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
        	<!--绑定passwordModel模型-->
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <!--密码错误提示,计算属性获得-->
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
        	<!--登录按钮 点击触发onLoginFn函数-->
          <a class="button" @click="onLoginFn">登录</a>
        </div>
      </div>
      <!--全局登录验证提示-->
      <p v-if="errorText" class="error-text">{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
	//数据对象
  data () {
    return {
    	//用户
      usernameModel: '',
      //密码
      passwordModel: '',
      //错误提示
      errorText: ''
    }
  },
  //计算属性,便于监听输入表单的值是否符合要求
  computed: {
  	//用户验证提示,每次usernameModel改变时触发
    userErrors () {
    	//提示,状态
      let errorText, status;
      //验证,用户名包含@符号
      if (!/@/g.test(this.usernameModel)) {
        status = false;
        errorText = '用户名不包含@';
      }
      else {
        status = true;
        errorText = '';
      }
      //标识位userFlag,默认不存在,在第一次验证时,由于不存在进入判断,抵消错误提示,并赋值flase;之后不会再被重复进入
      if (!this.userFlag) {
        errorText = '';
        this.userFlag = true;
      }
      //返回验证结果和错误提示
      return {
        status,
        errorText
      }
    },
    //密码验证提示,每次passwordModel改变时触发
    passwordErrors () {
      let errorText, status;
      //密码为6位
      if (!/^\w{6}$/g.test(this.passwordModel)) {
        status = false;
        errorText = '密码不是6位';
      }
      else {
        status = true;
        errorText = '';
      }
      //标识位passwordFlag,默认不存在,在第一次验证时,由于不存在进入判断,抵消错误提示,并赋值flase;之后不会再被重复进入
      if (!this.passwordFlag) {
        errorText = '';
        this.passwordFlag = true;
      }
      return {
        status,
        errorText
      }
    }
  },
  //方法对象
  methods: {
  	//点击[登录]按钮
    onLoginFn () {
    	//如果计算验证属性不全为true,阻止
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过!'
      }
      //验证通过,发起登录请求
      else {
        this.errorText = ''
        //get请求
        this.$http.get('api/login')
        .then(
        	//成功回调
        	(res) => {
        		//成功,则进行抛出自定义事假
          	this.$emit('has-log', res.data)
        	},
        	//失败回调
        	(error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-text {
	color: red;
	font-weight: bolder;
}
</style>
