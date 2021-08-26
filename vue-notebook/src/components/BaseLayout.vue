<template>
  <el-container>
    <!-- 导航啦 -->
    <el-header>
      <xy-header :username="username"></xy-header>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="300">
        <xy-asider></xy-asider>
      </el-aside>

      <el-main>
        <xy-main></xy-main>
      </el-main>
    </el-container>

    <!-- 底部 -->
    <el-footer>
      <xy-footer></xy-footer>
    </el-footer>

    <!-- 登录 -->
    <xy-login v-if="logined"></xy-login>
  </el-container>
</template>

<style scoped="scoped">
  .el-container {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  .el-header {
    background-color: #409EFF;
    color: white;
    height: 5%;
  }

  .el-aside {
    height: 85%;
    color: #333;
  }

  .el-nain {
    /* flex-basis: none; */
    /* overflow: none; */
  }

  .el-footer {
    height: 5%;
    color: #333;
    text-align: center;
    font-size: 12px;
    background-color: #409EFF;
  }
</style>

<script>
  import HeaderLayout from '@/components/HeaderLayout.vue'
  import AsideLayout from '@/components/AsideLayout.vue'
  import FooterLayout from '@/components/FooterLayout.vue'
  import MainLayout from '@/components/MainLayout.vue'
  import Login from '@/views/Login.vue'

  export default {
    // 数据
    data() {
      return {
        // username: ''
      }
    },
    // 计算属性
    computed: {
      username: () => {
        return localStorage.getItem('username') || '咸鱼仔'
      },
      logined: () => {
        return !localStorage.getItem('token')
      }
    },
    // // 监听器
    // watch: {
    //   logined: (newVal, oldVal) => {
    //     debugger
    //     window.location.reload()
    //   }
    // },
    // 组件
    components: {
      'xy-header': HeaderLayout,
      'xy-asider': AsideLayout,
      'xy-footer': FooterLayout,
      'xy-main': MainLayout,
      'xy-login': Login
    },
    // 事件
    methods: {
    }
  }
</script>
