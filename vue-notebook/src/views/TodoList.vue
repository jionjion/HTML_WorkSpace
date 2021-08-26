<template>
  <div>
    <xy-title title="奴役咸鱼的猫崽子">
      <template slot="button">
        <el-button type="primary" size="mini" @click="showDrawer=true">新增</el-button>
        <el-button type="primary" size="mini" @click="todoFinish">完成</el-button>
      </template>
    </xy-title>

    <el-container direction="vertical">
      <!-- 表格 -->
      <el-main style="min-height: 520px; max-height: 520px;">
        <el-table ref="filterTable" :data="todoList" :size="'medium'" :v-border="true" style="width: 100%;min-height: 480px;"
          v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)" @selection-change="selectTableIndex">
          <el-table-column type="selection" header-align="center" align="center" width="50">
          </el-table-column>
          <el-table-column property="name" label="任务" header-align="center" width="180">
          </el-table-column>
          <el-table-column property="startDate" sortable label="日期" :formatter="dateFormater" header-align="center"
            align="center" width="180">
          </el-table-column>
          <el-table-column property="sender" label="派发人" header-align="center" align="center" width="180" column-key="sender"
            :filters="[{text: '小姐姐', value: '小姐姐'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column property="description" label="描述" header-align="center">
          </el-table-column>
          <el-table-column property="type" label="紧急程度" header-align="center" align="center" width="120" :filters="taskTagList"
            :filter-method="filterTag" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tag" size="small">{{scope.row.tagDesc}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 分页 -->
      <el-footer>
        <el-row align="bottom" type="flex" justify="end">
          <el-col :span="6" :pull="1">
            <el-pagination background layout="prev, pager, next" :total="page.dataCount" :page-size="page.pageSize"
              @prev-click="gotoPage('prev')" @next-click="gotoPage('next')" @current-change="gotoPage">
            </el-pagination>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>

    <!-- 侧边,代办添加 -->
    <el-drawer :visible.sync="showDrawer" :show-close="false" direction="rtl" ref="drawer">
      <div slot="title">
        <h3>不给小鱼干还干活</h3>
      </div>
      <div>
        <el-form :model="todoNew" :rules="rules" ref="todoNew">
          <el-form-item label="任务" label-position="top" prop="name">
            <el-input v-model="todoNew.name" autocomplete="off" autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="附加" label-position="top">
            <el-row type="flex" style="display: inline-flex;">
              <el-col :span="10">
                <el-date-picker v-model="todoNew.startDate" type="date" placeholder="期望完成日期" :automatic-dropdown="false"></el-date-picker>
              </el-col>
              <el-col :span="8" :offset="6">
                <el-select v-model="todoNew.tag" filterable autocomplete="off" :automatic-dropdown="false" placeholder="择紧急程度">
                  <el-option v-for="(taskTag, index) in taskTagList" :key="index" :label="taskTag.text" :value="taskTag.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="派发人" label-position="top">
            <el-input v-model="todoNew.sender" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" label-position="top" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="todoNew.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="16">
                <el-button style="width: 100%;" type="primary" @click="todoSave('todoNew')" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import TitleLayout from '@/components/TitleLayout'
  import config from '@/js/Config.js'
  import tools from '@/js/Tools.js'
  import axios from 'axios'

  export default {
    data: function() {
      return {
        loading: true,
        taskTagList: [],
        todoList: [
          /* {
                    name: '标题',
                    tag: 'danger',
                    tagDesc: '危险',
                    sender: '派发人',
                    description: '任务内容',
                    startDate: '2020-01-01'
                  } */
        ],
        selectedTodoItemList: [],
        showDrawer: false,
        todoNew: {
          name: null,
          tag: 'info',
          tagDesc: null,
          sender: '我自己',
          description: null,
          startDate: new Date()
        },
        page: {
          pageNum: 1,
          pageSize: 10,
          dataCount: 1
        },
        rules: {
          name: [{
            required: true,
            message: '任务不能为空!',
            trigger: 'change'
          }],
          description: [{
            required: true,
            message: '描述不能为空!',
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
        let url = '/api/tasks/page?closeFlag=N'
        this.loading = true
        axios.get(url).then(response => {
          this.loading = true
          if (config.status.success === response.data.status) {
            this.todoList = response.data.datas
            this.page.dataCount = response.data.count
            this.loading = false
          }
        })
        axios.get('/api/enums/TaskTag').then(response => {
          if (config.status.success === response.data.status) {
            this.taskTagList = response.data.datas
          }
        })
        this.loading = false
      },
      // 日期格式化
      dateFormater(row, column, cellValue, index) {
        return tools.dateFormat(new Date(cellValue))
      },
      /* 选中,纪录ID */
      selectTableIndex(val) {
        this.selectedTodoItemList = []
        for (let i = 0; i < val.length; i++) {
          this.selectedTodoItemList.push(val[i])
        }
      },
      /* 翻页 */
      gotoPage(type) {
        if (type === 'prev') {
          this.pageNum--
        } else if (type === 'next') {
          this.page.pageNum++
        } else if (!isNaN(type)) {
          this.page.pageNum = type
        }

        let url = '/api/tasks/page/' + this.page.pageNum + '/' + this.page.pageSize + '?closeFlag=N'
        this.loading = true
        axios.get(url).then(response => {
          if (config.status.success === response.data.status) {
            this.todoList = response.data.datas
            this.page.dataCount = response.data.count
            this.loading = false
          }
        })
      },
      /* 过滤任务紧急情况 */
      filterTag(value, row) {
        return row.tag === value
      },
      /* 过滤派发人 */
      filterHandler(value, row, column) {
        // 获得字段名
        const property = column['property']
        // 获得字段值
        return row[property] === value
      },
      /* 新增 */
      todoSave(todoNew) {
        // 校验
        let _this = this
        this.$refs[todoNew].validate((valid) => {
          // 校验通过
          if (valid) {
            let url = '/api/tasks/'
            let data = {
              name: _this.todoNew.name,
              tag: _this.todoNew.tag,
              tagDesc: _this.todoNew.tagDesc,
              sender: _this.todoNew.sender,
              description: _this.todoNew.description,
              startDate: _this.todoNew.startDate.getTime(),
              closeFlag: 'N'
            }
            axios.post(url, data).then(response => {
              if (config.status.success === response.data.status) {
                // 重查
                _this.loadData()
                _this.showDrawer = false
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
          }
        })
      },
      /* 完成 */
      todoFinish() {
        let selectedTodoItemList = this.selectedTodoItemList
        if (selectedTodoItemList.length === 0) {
          return
        }
        this.loading = true
        axios.put('api/tasks/finish',
          selectedTodoItemList
        ).then(response => {
          if (config.status.success === response.data.status) {
            this.loading = false
            this.gotoPage(this.page.pageNum)
          }
        })
      }
    }
  }
</script>

<style>
  .el-table--medium td,
  .el-table--medium th {
    padding: 6px 0;
  }

  .el-divider--horizontal {
    margin: 10px 0;
  }

  /* 重写抽屉标题 */
  .el-drawer__header {
    margin: 0 5%;
    padding: 0;
  }

  /* 重写抽屉体 */
  .el-drawer__body {
    margin: 0 5%;
  }
</style>
