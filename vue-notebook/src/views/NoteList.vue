<template>
  <div>
    <xy-title title="笔记列表">
      <template slot="button">
        <el-button type="primary" size="mini" @click="clickCard()">新建</el-button>
      </template>
    </xy-title>

    <!-- 每行五个,首个不用偏移 -->
    <div class="boxs">
      <el-row align="bottom" class="box-row" type="flex" justify="start" v-for="(noteList, indexA) in rowNoteList" :key="indexA">
        <el-col :span="4" :offset="indexB==0 ? 0 : 1" v-for="(note, indexB) in noteList" :key="indexB">
          <div class="box-div" @click="clickCard(note.id)">
            <el-card class="box-body" body-style="padding: 5px;" shadow="hover">
              <el-image style="height: 160px;" fit="contain" :src="randomImage(note.id)"></el-image>
              <div>
                <p class="title">{{note.title}}</p>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import TitleLayout from '@/components/TitleLayout'
  import config from '@/js/Config.js'
  import axios from 'axios'
  import allCoverImages from '@/static/images/cover/index.js'

  export default {
    data() {
      return {
        rowNoteList: []
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
        let url = '/api/notes/'
        axios.get(url).then(response => {
          if (config.status.success === response.data.status) {
            let noteList = response.data.datas
            this.noteList = noteList
            // 计算行明细
            this.rowNoteList = []
            let index = 0
            for (var i = 0; i < noteList.length; i++) {
              index = parseInt(i / 5)
              if (this.rowNoteList.length <= index) {
                this.rowNoteList.push([])
              }
              this.rowNoteList[index].push(noteList[i])
            }
          }
        })
      },
      // 点击进入明细
      clickCard(id) {
        // 跳转明细
        this.$router.push({path: '/note/' + id})
      },
      // 根据ID匹配图片
      randomImage(id) {
        const randIndex = id * 13 % allCoverImages.length
        return allCoverImages[randIndex]
      }
    }
  }
</script>

<style scoped="scoped">
  .box-div {
    cursor: pointer
  }

  .box-row {
    padding: 10px 0px;
  }

  .title {
    margin: 0 auto;
    max-width: 90%;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .boxs {
    height: 100%;
  }
</style>
