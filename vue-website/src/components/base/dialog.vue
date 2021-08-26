<!--弹窗组件-->
<template>
  <div>
    <div class="dialog-wrap">
    	<!--弹窗遮罩,click点击时,触发关闭弹窗-->
      <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
      <!--弹窗内容,使用动画-->
      <transition name="drop">
        <div class="dialog-content" v-if="isShow">
        	<!--弹窗关闭图标-->
          <p class="dialog-close" @click="closeMyself">X</p>
          <!--使用插槽,插槽内容为组件调用时包裹内容,便于将Html传入显示-->
          <slot>获得传入的HTML片段</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
	//组件属性 isShow是否显示
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  //方法
  methods: {
  	//关闭
    closeMyself () {
    	//当弹窗关闭时,抛出自定义事件on-close
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
/*drop动画开始*/
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
/*drop动画结束*/

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 50%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #464068;
  padding: 2%;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
