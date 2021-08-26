<template>
  <div>
    <xy-title title="表情包制作">
      <template slot="button">
        <el-button type="success" size="mini" @click="postImg()">上传服务器</el-button>
      </template>
    </xy-title>

    <el-container direction="horizontal">
      <el-main style="position: relative;">
        <!-- 预览 -->
        <div class="preview-box" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>

        <!-- 编辑 -->
        <div style="padding-right: 260px;">
          <!-- 组件 -->
          <div class="cropper-box">
            <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
              :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
              :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
              :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" @real-time="realTime" :high="option.high">
            </vue-cropper>
          </div>
          <!-- 按钮 -->
          <div style="margin: 10px auto; width: 510px">
            <el-button-group>
              <!-- 上传图片 -->
              <button type="button" class="el-button el-button--primary el-button--small">
                <label for="upload"><i class="el-icon-upload2"></i><span>上传</span></label>
                <input type="file" ref="upload" id="upload" name="file" accept="image/png, image/jpeg, image/gif, image/jpg"
                  @change="uploadImg($event, 1)">
              </button>
              <el-button type="primary" size="small" icon="el-icon-refresh" @click="refreshCrop">刷新</el-button>
              <el-button type="primary" size="small" icon="el-icon-plus" @click="changeScale(1)">放大</el-button>
              <el-button type="primary" size="small" icon="el-icon-minus" @click="changeScale(-1)">缩小</el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="rotateLeft()">左旋</el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh-right" @click="rotateRight()">右旋</el-button>
              <el-button type="primary" size="small" icon="el-icon-download" @click="down()">下载</el-button>
            </el-button-group>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import {
    VueCropper
  } from 'vue-cropper'
  import TitleLayout from '@/components/TitleLayout'
  import config from '@/js/Config.js'
  import axios from 'axios'

  export default {
    data: function() {
      return {
        crap: false,
        previews: {},
        option: {
          // 初始 URL
          img: '',
          size: 1,
          // 是否输出原图比例的截图
          full: false,
          // 图片输出格式
          outputType: 'jpg',
          // 能否拖动图片
          canMove: true,
          // 截图框固定大小
          fixedBox: false,
          // 原始图片大小
          original: false,
          // 能否拖动截图框
          canMoveBox: true,
          // 是否自动生成截图框
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 240,
          autoCropHeight: 240,
          // 截图框是否限制在图片里(只有在自动生成截图框时才能生效)
          centerBox: false,
          // 是否根据dpr生成适合屏幕的高清图片
          high: true
        }
      }
    },
    components: {
      'vue-cropper': VueCropper,
      'xy-title': TitleLayout
    },
    methods: {
      // 刷新
      refreshCrop() {
        this.$refs.cropper.refresh()
      },
      // 缩放
      changeScale(num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      // 左旋
      rotateLeft() {
        this.$refs.cropper.rotateLeft()
      },
      // 右旋
      rotateRight() {
        this.$refs.cropper.rotateRight()
      },
      // 实时预览函数
      realTime(data) {
        this.previews = data
      },
      // 下载
      down() {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      },
      // 上传图片
      uploadImg(e, num) {
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file)
      },
      // 将base64的图片转换为file文件
      convertBase64UrlToBlob(data) {
        // 去掉url的头，并转换为byte
        let bytes = window.atob(data.split(',')[1])
        // 处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length)
        let ia = new Uint8Array(ab)
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {
          type: 'image/jpg'
        })
      },
      // 传送服务器
      postImg() {
        debugger
        // 获取cropper的截图的base64 数据
        this.$refs.cropper.getCropData(data => {
          // 将剪裁后base64的图片转化为file格式
          let file = this.convertBase64UrlToBlob(data)
          file.name = 'file.jpg'
          file.lastModified = Date.now()

          let form = new FormData()
          form.append('file', file)

          // 添加请求头
          let setting = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          // 将剪裁后的图片执行上传
          axios.post('/api/emoji/upload', form, setting)
            .then(response => {
              debugger
              if (config.status.success === response.data.status) {
                // 通知
                this.$notify.success({
                  title: '上传成功',
                  message: '服务器已经收到!',
                  position: 'bottom-right'
                })
              }
            }).catch(() => {
              // 通知
              this.$notify.error({
                title: '上传失败',
                message: '服务器炸了!',
                position: 'bottom-right'
              })
            })
        })
      }
    }
  }
</script>

<style>
  .cropper-box {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }

  .preview-box {
    position: absolute;
    right: 0;
    top: 0;
    border: 4px #90939942 solid;
  }

  #upload {
    position: absolute;
    clip: rect(0 0 0 0);
  }
</style>
