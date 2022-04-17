<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {provide} from "vue";

export default {
  name: "App",
  setup(){
    provide('echarts',echarts)
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./common/font/font.css";
</style>