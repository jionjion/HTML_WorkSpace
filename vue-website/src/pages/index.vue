<!--内容主页-->
<template>
	
	<!--整体-->
  <div class="index-wrap">
  	
  	<!--左边栏-->
    <div class="index-left">
    	
    	<!--左边栏上全部商品列表-->
      <div class="index-left-block">
        <h2>全部产品</h2>
        <!--template标签进行多元素遍历-->
        <template v-for="product in productList">
        	<!--产品标题-->
          <h3>{{ product.title}}</h3>
          <!--产品列表-->
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{ item.name }}</a>
              <!--如果有hot标签,则进行渲染-->
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <!--如果为产品last最后一个元素,则渲染-->
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      
      <!--左边栏下最新消息列表-->
      <div class="index-left-block lastest-news">
        <h2>近日新闻</h2>
        <h3>后台消息</h3>
        <!--消息列表-->
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    
    <!--右边栏-->
    <div class="index-right">
    	<!--滚动跑马灯 slides图片数组 inv间隔时间,注意,这里使用v-bind:属性 方式传入值  onchange为自定义事件 -->
      <slide-show v-bind:slides="slides" v-bind:inv="invTime" v-on:onchange="onchangeFn"></slide-show>
      
      <!--产品功能图标,遍历boardList列表,绑定不同的样式;两个为一行的列表;同时根据列表元素中的key属性,拼接class样式-->
      <div class="index-board-list">
        <div 	class="index-board-item" 
			        v-for="(item, index) in boardList"
			        :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
          <div class="index-board-item-inner">
          	<!--产品名称-->
            <h2>{{ item.title }}</h2>
            <!--描述-->
            <p>{{ item.description }}</p>
            <!--按钮-->
            <div class="index-board-button">
            	<!--路由链接完成跳转  '/detail/analysis/'形式  -->
              <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
            </div>  
          </div>
			</div>
      </div>
    </div>
  </div>
</template>

<!--默认JS-->
<script>
	
	//幻灯片组件  ../  或者 @ 表示从src目录开始查找
	import slideShow from '@/components/slideShow'
	
	export default {
		
		//事件钩子:在创建时,发送请求获得数据
		created:function(){
			//发送get请求
			this.$http.get('api/getNewsList')
			.then(
				//成功方法,ES4函数
				function(req){
					this.newsList = req.data;
					console.log(req);
				},
				//失败方法,箭头函数
				(err) => {
					console.log(err);
				}
			)
		},
		
		//数据对象
		data() {
			return {
				//产品列表
	      productList: {
	        pc: {
	          title: 'PC产品',
	          list: [
	            {
	              name: '数据统计',
	              url: '#'
	            },
	            {
	              name: '数据预测',
	              url: '#'
	            },
	            {
	              name: '流量分析',
	              url: '#',
	              hot: true
	            },
	            {
	              name: '广告发布',
	              url: '#'
	            }
	          ]
	        },
	        app: {
	          title: '手机应用类',
	          last: true,
	          list: [
	            {
	              name: '91助手',
	              url: '#'
	            },
	            {
	              name: '产品助手',
	              url: '#',
	              hot: true
	            },
	            {
	              name: '智能地图',
	              url: '#'
	            },
	            {
	              name: '团队语音',
	              url: '#'
	            }
	          ]
	        }
	      },
	      //消息列表
	      newsList: [
	      	{
			      title:'数据统计',
			      url:'#'
	      	},
	      	{
	      		title:'数据预测',
			      url:'#'
	      	},
	      	{
	      		title:'流量分析',
			      url:'#'
	      	},
	      	{
	      		title:'广告发布',
			      url:'#'
	      	}
	      ],
	      //产品功能图标
	      boardList: [
	        {
	          title: '开放产品',
	          description: '开放产品是一款开放产品',
	          id: 'car',
	          toKey: 'analysis',
	          saleout: false
	        },
	        {
	          title: '品牌营销',
	          description: '品牌营销帮助你的产品更好地找到定位',
	          id: 'earth',
	          toKey: 'count',
	          saleout: false
	        },
	        {
	          title: '使命必达',
	          description: '使命必达快速迭代永远保持最前端的速度',
	          id: 'loud',
	          toKey: 'forecast',
	          saleout: true
	        },
	        {
	          title: '勇攀高峰',
	          description: '帮你勇闯高峰，到达事业的顶峰',
	          id: 'hill',
	          toKey: 'publish',
	          saleout: false
	        }
	      ],
	      //幻灯片属性-暂停多久
	      invTime: 2000,
	      //幻灯片属性-图片信息
	      slides: [
	        {
	          src: require('../assets/slideShow/pic1.jpg'),
	          title: 'xxx1',
	          href: 'detail/analysis'
	        },
	        {
	          src: require('../assets/slideShow/pic2.jpg'),
	          title: 'xxx2',
	          href: 'detail/count'
	        },
	        {
	          src: require('../assets/slideShow/pic3.jpg'),
	          title: 'xxx3',
	          href: 'http://www.xxx.com'
	        },
	        {
	          src: require('../assets/slideShow/pic4.jpg'),
	          title: 'xxx4',
	          href: 'detail/forecast'
	        }
	      ],
			}
		},
		//组件
		components:{
			slideShow:slideShow
		},
		//方法
		methods:{
			onchangeFn(e){
				console.log("幻灯片切换事件触发,当前页索引:",e)
			}
		}
		
	}
</script>

<style scoped>
	.index-wrap {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.index-left {
		float: left;
		width: 300px;
		text-align: left;
	}
	
	.index-right {
		float: left;
		width: 900px;
	}
	
	.index-left-block {
		margin: 15px;
		background: #fff;
		box-shadow: 0 0 1px #ddd;
	}
	
	.index-left-block .hr {
		margin-bottom: 20px;
	}
	
	.index-left-block h2 {
		background: #4fc08d;
		color: #fff;
		padding: 10px 15px;
		margin-bottom: 20px;
	}
	
	.index-left-block h3 {
		padding: 0 15px 5px 15px;
		font-weight: bold;
		color: #222;
	}
	
	.index-left-block ul {
		padding: 10px 15px;
	}
	
	.index-left-block li {
		padding: 5px;
	}
	
	.index-board-list {
		overflow: hidden;
	}
	
	.index-board-item {
		float: left;
		width: 400px;
		background: #fff;
		box-shadow: 0 0 1px #ddd;
		padding: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
	}
	
	.index-board-item-inner {
		min-height: 125px;
		padding-left: 120px;
	}
	
	.index-board-car .index-board-item-inner {
		background: url(../assets/images/1.png) no-repeat;
	}
	
	.index-board-loud .index-board-item-inner {
		background: url(../assets/images/2.png) no-repeat;
	}
	
	.index-board-earth .index-board-item-inner {
		background: url(../assets/images/3.png) no-repeat;
	}
	
	.index-board-hill .index-board-item-inner {
		background: url(../assets/images/4.png) no-repeat;
	}
	
	.index-board-item h2 {
		font-size: 18px;
		font-weight: bold;
		color: #000;
		margin-bottom: 15px;
	}
	
	.line-last {
		margin-right: 0;
	}
	
	.index-board-button {
		margin-top: 20px;
	}
	
	.lastest-news {
		min-height: 512px;
	}
	
	.hot-tag {
		background: red;
		color: #fff;
	}
	
	.new-item {
		display: inline-block;
		width: 230px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>