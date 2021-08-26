<!--单选组件-->
<template>
	<div class="chooser-component">
		<ul class="chooser-list">
			<!--单选列表-->
			<li v-for="(item, index) in selections" @click="chosenSelection(index)" :title="item.label" :class="{active:index === nowIndex}">{{ item.label }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		//组件属性
		props: {
			//默认显示列表
			selections: {
				type: Array,
				default: [{
					label: '空',
					value: 0
				}]
			}
		},
		//数据对象
		data() {
			return {
				//当前索引
				nowIndex: 0
			}
		},
		//方法对象
		methods: {
			//选择对象,返回当前选择元素的索引
			chosenSelection(index) {
				this.nowIndex = index
				this.$emit('on-change', this.selections[index])
			}
		}
	}
</script>

<style scoped>
	.chooser-component {
		position: relative;
		display: inline-block;
	}
	
	.chooser-list li {
		display: inline-block;
		border: 1px solid #e3e3e3;
		height: 25px;
		line-height: 25px;
		padding: 0 8px;
		margin-right: 5px;
		border-radius: 3px;
		text-align: center;
		cursor: pointer;
	}
	
	.chooser-list li.active {
		border-color: #4fc08d;
		background: #4fc08d;
		color: #fff;
	}
</style>