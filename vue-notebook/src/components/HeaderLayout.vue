<template>
  <el-row align="top" type="flex" justify="center" style="height: 100%;align-items: center;">
    <!-- 应用图标 -->
    <el-col :span='4'>
      <div>
        <i class="el-icon-notebook-2" style="color: white; font-size: 1.5rem; margin: 0;"></i>
        <b style="font-size: 1.5rem;">咸鱼云笔记</b>
      </div>
    </el-col>
    <!-- 前后路由 -->
    <el-col :offset="2" :span="8">
      <div>
        <el-input placeholder="查找垃圾" clearable v-model="query"></el-input>
      </div>
    </el-col>
    <!-- 前后路由 -->
    <el-col :offset="8" :span="2">
      <div class="text-black-50">
        <el-dropdown size="small" type="primary" trigger="click" @command="handleCommand">
          <span style="color: white;cursor: pointer;">
            <i class="el-icon-user"></i>
            <span>
             <strong>用户名</strong>
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" split-button>
            <el-dropdown-item icon="el-icon-lock" command="lock">锁定</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data: function() {
      return {
        query: ''
      }
    },
    props: {
        username: {
          type: String,
          default: '咸鱼仔'
        }
    },
    // 事件
    methods: {
      // 根据下拉按钮的不同,切换不同的效果
      handleCommand(command) {
        debugger
        if (command === 'lock') {
          localStorage.removeItem('username')
          localStorage.removeItem('token')
          window.location.reload()
        }
      }
    }
  }
</script>
