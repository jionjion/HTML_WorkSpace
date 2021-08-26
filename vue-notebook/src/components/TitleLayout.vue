<template>
  <div>
    <el-row align="bottom" type="flex" justify="space-between">
      <el-col :span="4">
        <!-- 标题 -->
        <strong style="font-size: 18px">{{title}}</strong>
      </el-col>
      <el-col :span="4">
        <!-- 插槽.按钮 -->
        <slot name="button"></slot>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
  export default {
    props: {
      // 标题
      title: {
        type: String
      }
    }
  }
</script>

<style>
</style>
