<template>
	<div id="app">
		<!--<img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App">
    </HelloWorld>-->

		<!--To Do List-->
		<h1 v-html="title"></h1>
		<!--数据模型-->
		<input type="text" v-model="newItem" v-on:keyup.enter="addNew()" />
		<ul>
			<li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="doFinished(item)">
				{{item.label}}
			</li>
		</ul>
		
		<!--调用其他组件,驼峰命名转为带中线的-->
		<component-a msg-a="父组件调用"></component-a>
		
		<!--调用子组件,并绑定自定义事件-->
		<component-a v-on:child-do="childDoThing"></component-a>
		<p>{{childThing}}</p>
	</div>
</template>

<script>
	//import HelloWorld from './components/HelloWorld.vue'
	//导入组件
	//export default {
	//name: 'app',
	//components: {
	//  HelloWorld
	//}
	//}

	//引入自定义的方法
	import store from "./components/store.js"
	//引用其他组件
	import componentA from "./components/componentA.vue"
	console.log(store);
	export default {
		//数据对象
		data: function() {
			return {
				//标题
				title: '<i>代办列表!<i/>',
				//内容,事件列表
				/*items: [{
						label: 'coding',
						isFinished: false
					},
					{
						label: 'sleeping',
						isFinished: true
					},
				]*/
				items: store.fetch(),
				//双向绑定的数据模型,空字符串
				newItem: "",
				//子组件需要传递的参数在父组件注册
				childThing:""
			}
		},
		//方法对象
		methods: {
			doFinished: function(item) {
				console.log(item.label);
				item.isFinished = !item.isFinished;
			},
			addNew: function() {
				//this指当前页面所有data对象
				var newItem = this.newItem;
				console.log(newItem);
				this.newItem = "";
				this.items.push({
					label: newItem,
					isFinished: false
				})
			},
			//自定义方法
			childDoThing:function(msg){
				console.log(msg);
				this.childThing = msg;
			}
		},
		//监听对象
		watch: {
			items: {
				handler: function (items) {
					console.log(items);
					store.save(items)
				},
				deep: true
			}
		},
		//注册组件
		components:{componentA},
	}
	
	
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
	.finished {
		text-decoration: underline;
		color: green;
		font-style: italic;
		font-weight: bolder;
	}
</style>