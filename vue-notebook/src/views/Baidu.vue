<template>
  <div>
    <xy-title title="百度热点">
      <template slot="button">
        <el-button type="primary" size="mini" @click="refresh()">刷新全部</el-button>
      </template>
    </xy-title>

    <el-container direction="vertical">
      <el-main v-loading="loading">
        <el-row>
          <el-col :span="7">
            <!-- 卡片 -->
            <el-card>
              <div slot="header">
                <span>时事热点</span>
              </div>
              <div>
                <div v-for="n in newList" :key="n.id">
                  <el-link  :underline="false" :href="n.addr" target='_blank'>
                    <p style="margin-top: 10px; margin-left: 10px;">
                      <span v-text="n.num" style="min-width: 24px; display: inline-block;"></span>
                      <span v-text="n.txt"></span>
                    </p>
                  </el-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import TitleLayout from '@/components/TitleLayout'
  import config from '@/js/Config.js'
  import axios from 'axios'

  export default {
    data: function() {
      return {
        loading: true,
        newList: []
      }
    },
    // 组件
    components: {
      'xy-title': TitleLayout
    },
    // 生命周期
    created: function() {
      this.loadData()
    },
    methods: {
      /* 请求后端数据 */
      loadData() {
        let url = '/api/baidu/news'
        this.loading = true
        axios.get(url).then(response => {
          this.loading = true
          if (config.status.success === response.data.status) {
            this.newList = response.data.datas
            this.loading = false
          }
        })
        this.loading = false
      },
      /* 刷新数据 */
      refresh() {
        let url = '/api/baidu/news/refresh'
        let _this = this
        this.loading = true
        axios.post(url).then(response => {
          this.loading = true
          if (config.status.success === response.data.status) {
            this.loading = false
            // 重查
            _this.loadData()
            // 通知
            this.$notify.success({
              title: '刷新成功',
              message: '资讯已经刷新!',
              position: 'bottom-right'
            })
          }
        })
        this.loading = false
      }
    }
  }
</script>

<style>

</style>
