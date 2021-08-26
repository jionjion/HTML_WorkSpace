<template>
  <div>
    <xy-title title="黑本本上的猫崽子">
      <template slot="button">
        <el-button type="primary" size="mini">查询</el-button>
      </template>
    </xy-title>

    <el-container direction="vertical">
      <!-- 表格 -->
      <el-main style="min-height: 520px; max-height: 520px;">
        <el-table ref="filterTable" :data="todoList" :size="'medium'" :v-border="true" style="width: 100%;min-height: 480px;"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)">
          <el-table-column property="name" label="任务" header-align="center" width="180">
          </el-table-column>
          <el-table-column property="startDate" label="日期" :formatter="dateFormater" header-align="center" align="center" width="180">
          </el-table-column>
          <el-table-column property="sender" label="派发人" header-align="center" align="center" width="180" column-key="sender">
          </el-table-column>
          <el-table-column property="description" label="描述" header-align="center">
          </el-table-column>
          <el-table-column property="type" label="紧急程度" header-align="center" align="center" width="120" filter-placement="bottom-end">
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
        todoList: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          dataCount: 1
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
        let url = '/api/tasks/page?closeFlag=Y'
        this.loading = true
        axios.get(url).then(response => {
          this.loading = true
          if (config.status.success === response.data.status) {
            this.todoList = response.data.datas
            this.page.dataCount = response.data.count
            this.loading = false
          }
        })
        this.loading = false
      },
      // 日期格式化
      dateFormater(row, column, cellValue, index) {
        return tools.dateFormat(new Date(cellValue))
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

        let url = '/api/tasks/page/' + this.page.pageNum + '/' + this.page.pageSize + '?closeFlag=Y'
        this.loading = true
        axios.get(url).then(response => {
          if (config.status.success === response.data.status) {
            this.todoList = response.data.datas
            this.page.dataCount = response.data.count
            this.loading = false
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
</style>
