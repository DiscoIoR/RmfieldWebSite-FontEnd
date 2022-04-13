<template>
  <div id="shield" :class="page_cover"></div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PageCover-Components",
  setup(){
    let date = new Date();
    let date_str = date.toString()
    let time_str = date_str.split(' ')[4]
    let time_hour_str = time_str.split(':')[0]
    let time_hour = parseInt(time_hour_str)
    let page_cover = ref('page-cover-day')
    if (time_hour < 7 || time_hour >= 23) {
      page_cover.value = 'page-cover-night'
    } else {
      page_cover.value = 'page-cover-day'
    }

    return{
      page_cover: page_cover
    }
  }
}
</script>

<style>
.page-cover-night {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(20, 10, 0, 0.4);
  pointer-events: none;
}
.page-cover-day {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  pointer-events: none;
}
</style>