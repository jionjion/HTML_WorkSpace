<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  /* 最小宽高 */
  #app {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
</style>
