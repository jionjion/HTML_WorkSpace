<template>
  <!-- 弹出登录 -->
  <el-dialog title="验明身份" :visible.sync="shoWlogin" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" width="30%">
    <el-form>
      <el-form-item label="咸鱼">
        <el-input autocomplete="off" v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="口令">
        <el-input autocomplete="off" show-password v-model="password" @keyup.enter.native="loginApp()"></el-input>
      </el-form-item>
      <div v-show="showMessage">
        <el-alert :title="message" type="error" :closable="false"></el-alert>
      </div>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="loginApp()">一键划水</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import config from '@/js/Config.js'
  import axios from 'axios'

  export default {
    // 数据
    data() {
      return {
        shoWlogin: true,
        username: '',
        password: '',
        token: '',
        showMessage: false,
        message: ''
      }
    },
    // 事件
    methods: {
      // 请求后端
      loginApp() {
        let url = '/api/user/login'
        let _this = this
        let data = new FormData()
        data.append('username', this.username)
        data.append('password', this.password)
        axios.post(url, data).then(response => {
          if (config.status.success === response.data.status) {
            // 成功后赋值
            _this.username = response.data.datas[0].username
            _this.token = response.data.datas[0].token

            _this.shoWlogin = false
            _this.showMessage = false
            // 存入本地
            localStorage.setItem('username', _this.username)
            localStorage.setItem('token', _this.token)
            // 刷新页面
            this.$refs.cropper.refresh()
          } else {
            _this.showMessage = true
            _this.message = response.data.message
          }
        })
      }
    }
  }
</script>

<style>
</style>
