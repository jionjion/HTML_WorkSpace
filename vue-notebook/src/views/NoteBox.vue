<template>
  <div>
    <xy-title title="笔记列表">
      <template slot="button">
        <el-button type="primary" icon="el-icon-edit-outline" @click="saveNote('note')" size="mini">保存</el-button>

        <el-popconfirm title="删除后不再恢复!" confirmButtonText='删除' @onConfirm="deleteNote" confirmButtonType="danger" cancelButtonText='再想想'>
          <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </el-popconfirm>
      </template>
    </xy-title>
    <el-form ref="note" label-position="top" :model="note" :rules="rules">
      <el-row>
        <el-col :span="14">
          <el-form-item prop="title">
            <el-input placeholder="请输入标题" v-model="note.title" @keyup.enter.native="saveNote('note')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-form-item prop="createDate">
            <el-date-picker type="date" v-model="note.createDate" placeholder="日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="正文" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 20}" v-model="note.content" placeholder="请输入内容" @keyup.ctrl.enter.native="saveNote('note')">
          </el-input>
        </el-form-item>
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
        note: {
          id: null,
          title: null,
          content: null,
          createDate: new Date()
        },
        rules: {
          title: [{
            required: true,
            message: '标题不能为空!',
            trigger: 'change'
          }],
          createDate: [{
            required: true,
            message: '日期不能为空!',
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '正文不能为空!',
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
      /* 请求后端数据 */
      loadData() {
        let id = this.$route.params.id
        let url = '/api/notes/' + id
        axios.get(url).then(response => {
          if (config.status.success === response.data.status) {
            // 数组,长度为1
            if (response.data.datas.length === 1) {
              let note = response.data.datas[0]
              this.note.id = note.id
              this.note.title = note.title
              this.note.content = note.content
              this.note.createDate = new Date(note.createDate)
            }
          }
        })
      },
      // 保存,传入绑定数据对象
      saveNote(note) {
        // 校验
        let _this = this
        this.$refs[note].validate((valid) => {
          // 校验通过
          if (valid) {
            let url = '/api/notes/'
            let data = {
              id: _this.note.id,
              title: _this.note.title,
              content: _this.note.content,
              createDate: _this.note.createDate.getTime()
            }
            axios.post(url, data).then(response => {
              if (config.status.success === response.data.status) {
                // 保存数据
                let note = response.data.datas[0]
                this.note.id = note.id
                this.note.title = note.title
                this.note.createDate = new Date(note.createDate)
                // 通知
                this.$notify.success({
                  title: '保存成功',
                  message: '服务器已经收到!',
                  position: 'bottom-right'
                })
              }
            }).catch(error => {
              this.$notify.error({
                title: '保存失败',
                message: error,
                position: 'bottom-right'
              })
            })
          } else {
            // 校验失败
            return false
          }
        })
      },
      // 删除
      deleteNote() {
          let url = '/api/notes/' + this.note.id
          axios.delete(url).then(response => {
            if (config.status.success === response.data.status) {
              // 通知
              this.$notify.success({
                title: '删除成功',
                message: '服务器已经删除!',
                position: 'bottom-right'
              })
              // 跳转
              this.$router.push({path: '/note'})
            }
          }).catch(error => {
            this.$notify.error({
              title: '删除失败',
              message: error,
              position: 'bottom-right'
            })
          })
      }
    }
  }
</script>

<style>
</style>
