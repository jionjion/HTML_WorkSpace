<!--选择组件-->
<template>
	<div class="selection-component">
		<!--下拉框组件,点击触发函数toggleDrop-->
		<div class="selection-show" @click="toggleDrop">
			<!--当前选择的列表元素-->
			<span>{{ selections[nowIndex].label }}</span>
			<!--下箭头-->
			<div class="arrow"></div>
		</div>
		<!--下拉框候选 isDrop参数控制其是否下拉选择 -->
		<div class="selection-list" v-if="isDrop">
			<ul>
				<!--遍历,选项,点击时触发chooseSelection函数-->
				<li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		//组件属性
		props: {
			//候选列表,数组类型
			selections: {
				type: Array,
				default: [{
					//默认值
					label: '空',
					value: 0
				}]
			}
		},
		//数据对象
		data() {
			return {
				//是否展示下拉候选列表
				isDrop: false,
				nowIndex: 0
			}
		},
		//方法对象
		methods: {
			//点击出现下拉框
			toggleDrop() {
				this.isDrop = !this.isDrop
			},
			//点击候选列表,返回当前选项的索引,并消失候选框
			chooseSelection(index) {
				this.nowIndex = index
				this.isDrop = false
				//抛出事件,返回索引位置
				this.$emit('on-change', this.selections[this.nowIndex])
			}
		}
	}
</script>

<style scoped>
	.selection-component {
		position: relative;
		display: inline-block;
	}
	
	.selection-show {
		border: 1px solid #e3e3e3;
		padding: 0 20px 0 10px;
		display: inline-block;
		position: relative;
		cursor: pointer;
		height: 25px;
		line-height: 25px;
		border-radius: 3px;
		background: #fff;
	}
	
	.selection-show .arrow {
		display: inline-block;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 5px solid #e3e3e3;
		width: 0;
		height: 0;
		margin-top: -1px;
		margin-left: 6px;
		margin-right: -14px;
		vertical-align: middle;
	}
	
	.selection-list {
		display: inline-block;
		position: absolute;
		left: 0;
		top: 25px;
		width: 100%;
		background: #fff;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		z-index: 5;
	}
	
	.selection-list li {
		padding: 5px 15px 5px 10px;
		border-left: 1px solid #e3e3e3;
		border-right: 1px solid #e3e3e3;
		cursor: pointer;
		background: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.selection-list li:hover {
		background: #e3e3e3;
	}
</style>