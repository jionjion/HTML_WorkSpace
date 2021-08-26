<!--组件A-->
<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<!--获得父组件的值-->
		<h3>{{msgA}}</h3>
		<button v-on:click="onClickMe">子组件点击按钮</button>
	</div>
</template>

<script>
	export default {
		//数据
		data: function() {
			return {
				msg: "这是子组件!",
			}
		},
		//注册,从调用组件者获得属性传入信息,HTML属性注册为对象属性时,遵守命名转换
		props:['msgA'],
		//方法
		methods: {
			onClickMe: function(){
				console.log(this.msgA);
				
				//点击时,触发自定义事件,并传递子组件定义的参数
				this.$emit('child-do',this.msg)
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1 {
		margin: 40px 0 0;
	}
</style>