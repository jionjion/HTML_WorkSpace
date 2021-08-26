<!--多选组件-->
<template>
	<div class="chooser-component">
		<ul class="chooser-list">
			<!--遍历组件,点击触发toggleSelection函数-->
			<li v-for="(item, index) in selections" @click="toggleSelection(index)" :title="item.label" :class="{active: checkActive(index)}">{{ item.label }}</li>
		</ul>
	</div>
</template>

<script>
	import _ from 'lodash'
	export default {
		//组件属性
		props: {
			//多选列表
			selections: {
				type: Array,
				default: [{
					label: '空',
					value: 0
				}]
			}
		},
		data() {
			return {
				nowIndexes: [0]
			}
		},
		methods: {
			//选择点击触发,修改_.map中的nowIndexes对象属性
			toggleSelection(index) {
				//如果
				if(this.nowIndexes.indexOf(index) === -1) {
					this.nowIndexes.push(index)
				} else {
					this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
						return idx !== index
					})
				}
				let nowObjArray = _.map(this.nowIndexes, (idx) => {
					return this.selections[idx]
				})
				this.$emit('on-change', nowObjArray)
			},
			//当前元素是否被选择,如果选择,则修改样式
			checkActive(index) {
				return this.nowIndexes.indexOf(index) !== -1
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