<!--加减数量组件-->
<template>
	<div class="counter-component">
		<!--减按钮-->
		<div class="counter-btn" @click="minus"> - </div>
		<div class="counter-show">
			<!--键盘按下后触发,修改当前数字-->
			<input type="text" v-model="number" @keyup="fixNumber">
		</div>
		<!--加按钮-->
		<div class="counter-btn" @click="add"> + </div>
	</div>
</template>

<script>
	export default {
		//组件属性
		props: {
			//最大值
			max: {
				type: Number,
				default: 5
			},
			//最小值
			min: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				number: this.min
			}
		},
		//监听
		watch: {
			//属性改变
			number() {
				//向外抛出自定义事件
				this.$emit('on-change', this.number)
			}
		},
		//方法对象
		methods: {
			//键盘按下事件,只能输入数字
			fixNumber() {
				let fix
				if(typeof this.number === 'string') {
					fix = Number(this.number.replace(/\D/g, ''))
				} else {
					fix = this.number
				}
				if(fix > this.max || fix < this.min) {
					fix = this.min
				}
				this.number = fix
			},
			//减按钮触发事件
			minus() {
				if(this.number <= this.min) {
					return
				}
				this.number--
			},
			//加按钮触发事件
			add() {
				if(this.number >= this.max) {
					return
				}
				this.number++
			}
		}
	}
</script>

<style scoped>
	.counter-component {
		position: relative;
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;
	}
	
	.counter-show {
		float: left;
	}
	
	.counter-show input {
		border: none;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		height: 23px;
		line-height: 23px;
		width: 30px;
		outline: none;
		text-indent: 4px;
	}
	
	.counter-btn {
		border: 1px solid #e3e3e3;
		float: left;
		height: 25px;
		line-height: 25px;
		width: 25px;
		text-align: center;
		cursor: pointer;
	}
	
	.counter-btn:hover {
		border-color: #4fc08d;
		background: #4fc08d;
		color: #fff;
	}
</style>