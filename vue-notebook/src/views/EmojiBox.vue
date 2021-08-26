<template>
  <div>
    <xy-title title="表情包生成器">
      <template slot="button">
        <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="createEmoji()">生成</el-button>
        <el-button type="success" icon="el-icon-edit-outline" size="mini" @click="copyEmoji()">赋值到粘贴板</el-button>
      </template>
    </xy-title>
    <el-form ref="emoji" label-position="top" :model="emoji" :rules="rules">
      <el-row>
        <el-col :span="14">
          <el-form-item prop="content">
            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" resize="none" placeholder="请输入内容" clearable="true" v-model="emoji.content"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h3>表情包预览</h3>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-image v-if="emoji.uri" class="box-image-before" :src="emoji.uri" fit="none"></el-image>
        </el-col>
        <el-col :span="10">
          <el-image v-if="emoji.base64Image" class="box-image-before" :src="emoji.base64Image" v-loading="loading" fit="contain"></el-image>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import TitleLayout from '@/components/TitleLayout'
  import config from '@/js/Config.js'
  import axios from 'axios'

  export default {
    data() {
      return {
        loading: false,
        emoji: {
          id: null,
          uri: null,
          content: null,
          base64Image: null
        },
        watermarkUrl: null,
        rules: {
          content: [{
            required: true,
            message: '内容不能为空!',
            trigger: 'change'
          }]
        }
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
      /* 请求后端数据,同步方法 */
      loadData() {
        let id = this.$route.params.id
        let url = '/api/emoji/' + id
        axios.get(url).then(response => {
          if (config.status.success === response.data.status) {
            // 数组,长度为1
            if (response.data.datas.length === 1) {
              let emoji = response.data.datas[0]
              this.emoji.id = emoji.id
              this.emoji.uri = emoji.uri
            }
          }
        })
      },
      // 生成表情包
      createEmoji() {
        // 校验
        let _this = this
        let url = '/api/emoji/' + _this.emoji.id + '/watermark'
        this.$refs['emoji'].validate((valid) => {
          // 校验通过
          if (valid) {
            // 表情包文字内容
            let data = {'content': _this.emoji.content}
            _this.loading = true
            axios.post(url, data).then(response => {
              if (config.status.success === response.data.status) {
                // 图片URL替换,默认jpg格式
                debugger
                _this.emoji.base64Image = 'data:image/jpg;base64,' + response.data.datas[0].base64Image
                _this.loading = false
                // 通知
                this.$notify.success({
                  title: 'Duang',
                  message: '生成成功!',
                  position: 'bottom-right'
                })
              }
            }).catch(error => {
              _this.loading = false
              this.$notify.error({
                title: '服务器炸了',
                message: error,
                position: 'bottom-right'
              })
            })
          } else {
            return false
          }
        })
      },
      // 拷贝表情包
      copyEmoji() {
        // http://www.clipboardjs.cn/
        alert('参阅')
      }
    }
  }
</script>

<style scoped="scoped">
  .box-image-before {
    width: 365px;
    height: 365px;
    display: inline-block;
    margin: 0 auto;
  }
</style>
