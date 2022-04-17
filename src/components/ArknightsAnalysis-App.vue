<template>
  <div :class="arknights_analysis_ui">
    <router-view/>
  </div>
</template>

<script>

import {onMounted, ref} from "vue";

export default {
  name: "ArknightsAnalysis-App",
  setup(){
    let arknights_analysis_ui=ref('')
    let deviceType = ref('')
    function _isMobile(){
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }


    if(_isMobile()){
      deviceType.value='mobile'
    }else {
      deviceType.value='pc'
    }
    if (deviceType.value==='mobile'){
      arknights_analysis_ui.value='arknights-analysis-mobile'
    }else {
      arknights_analysis_ui.value='arknights-analysis-pc'
    }

    onMounted(()=>{

    })

    return{
      arknights_analysis_ui:arknights_analysis_ui
    }
  }
}
</script>

<style scoped>
.arknights-analysis-pc{
  position: fixed;
  width: 82%;
  height: 100%;
}
.arknights-analysis-mobile{
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>