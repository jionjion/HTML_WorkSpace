<template>
  <div>
    <xy-title title="选择表情包">
      <template slot="button">
        <el-button type="danger" size="mini" @click="deleteEmoji()">删除</el-button>
      </template>
    </xy-title>

    <!-- 每行五个,首个不用偏移 -->
    <div class="box">
      <el-checkbox-group v-model="checkList">
        <div v-for="(emoji, index) in emojiList" :key="index" style="display: inline-flex; margin: 5px;">
          <el-checkbox :label="emoji.id" style="position: absolute;zoom: 1.6;"></el-checkbox>
          <el-image class="box-image" :src="emoji.uri" fit="cover" @click="clickEmoji(emoji.id)"></el-image>
        </div>
      </el-checkbox-group>
    </div>

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
        emojiList: [],
        checkList: []
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
        let url = '/api/emoji/'
        this.loading = true
        axios.get(url).then(response => {
          this.loading = true
          if (config.status.success === response.data.status) {
            this.emojiList = response.data.datas
            this.loading = false
          }
        })
        this.loading = false
      },
      // 点击进入明细
      clickEmoji(id) {
        // 跳转明细
        this.$router.push({path: '/emoji/' + id})
      },
      // 删除表情包
      deleteEmoji(){
        alert('嘤嘤嘤嘤,不要人家了么' + this.checkList)
      } 
    }
  }
</script>

<style>
  .box {
    height: 100%;
  }

  .box-image {
      width: 120px;
      height: 120px;
      margin: 5px;
      border-radius: 15px;
      border: 2px #909397 solid;
      color: white;
      cursor: pointer;
  }
</style>
