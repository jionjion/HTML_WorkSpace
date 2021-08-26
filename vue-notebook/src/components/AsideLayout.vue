<template>
  <el-menu :router="true">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-shop"></i>
        <span>渔塘</span>
      </template>
      <el-menu-item index="1-1" route="/todo">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>代办</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-2" route="/done">
        <template slot="title">
          <i class="el-icon-s-release"></i>
          <span>已办</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-3" route="/note">
        <template slot="title">
          <i class="el-icon-s-cooperation"></i>
          <span>暂存空间</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-comment"></i>
        <span>渔汛</span>
      </template>
      <el-menu-item index="2-1" route="/baidu">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>百度</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-comment"></i>
        <span>渔技</span>
      </template>
      <el-menu-item index="3-1" route="/upload">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>表情包上传</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3-2" route="/emoji">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>表情包生成器</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style scoped="scoped">
  .el-menu {
    width: 200px;
    max-height: 800px;
  }
</style>
