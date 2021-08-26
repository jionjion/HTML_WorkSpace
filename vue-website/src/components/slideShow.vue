<!--幻灯片组件-->
<template>
	<!--幻灯片组件,在鼠标悬停时,clearInv方法停止自动跑动;	鼠标移除时,runInv方法继续跑动幻灯片-->
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
  	<!--幻灯片图片-->
    <div class="slide-img">
    	<!--nowIndex,图片索引位置,从slides列表中获取图片地址-->
      <a :href="slides[nowIndex].href">
      	<!--动画切换,新一张向左移入;isShow控制前一页消失,后一页出现-->
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <!--动画切换,旧一张向左移出-->
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    
    <!--幻灯片标题,通过索引列表获得标题信息-->
    <h2>{{ slides[nowIndex].title }}</h2>
    
    <!--幻灯片右下角数字列表切换-->
    <ul class="slide-pages">
    	<!--轮播向前翻页,传入计算属性后的获得的值-->
      <li @click="goto(prevIndex)">&lt;</li>
      <!--当前幻灯片总页数-->
      <li v-for="(item, index) in slides" @click="goto(index)">
      	<!--当前页,增加样式on-page-->
        <a :class="{'on-page': index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <!--轮播后前翻页,传入计算属性后的获得的值-->
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
	//子组件通过props对象,获得组件调用时传入的参数
  props: {
  	//slides图片列表属性,类型及默认值
    slides: {
      type: Array,
      default: []
    },
    //间隔时间
    inv: {
      type: Number,
      default: 1000
    }
  },
  //数据对象
  data () {
    return {
    	//当前幻灯片位置
      nowIndex: 0,
      //是否显示
      isShow: true
    }
  },
  //计算属性
  computed: {
  	//prevIndex参数,为当前页索引-1;如果当前页为首页,则其前一页为索引最后
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      }
      else {
        return this.nowIndex - 1
      } 
    },
    //nextIndex参数,为当前页索引 + 1;如果当前页为末页,则其后一页为索引0
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      }
      else {
        return this.nowIndex + 1
      }
    }
  },
  //方法对象
  methods: {
  	//跳转第几页
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
        //抛出一个事件
        this.$emit('onchange',index);
      }, 10)
    },
    //幻灯片运动
    runInv () {
    	//setInterval()函数进行间隔操作,传入回调函数和间隔执行时间,返回invId即本次间隔调用JOB的ID
      this.invId = setInterval(
      	//回调函数,执行goto(nextIndex)方法,幻灯片翻动下一页
      	() => {
        this.goto(this.nextIndex)
      	}, 
      	//间隔执行时间
      	this.inv)
    },
    //清除幻灯片自动翻页,在鼠标悬停时触发
    clearInv () {
    	//clearInterval,清除间隔操作,传入invId为发起间隔任务的ID
      clearInterval(this.invId)
    }
  },
  
  //事件钩子,在组件渲染完毕后,挂载方法时执行;整个生命周期只执行一次
  mounted () {
    this.runInv();
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on-page {
  text-decoration: underline;
}
</style>
