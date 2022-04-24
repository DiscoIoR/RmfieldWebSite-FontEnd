<template>
  <div :class="arknights_analysis_ui">
    <div :class="arknights_general_dev">
      <div :class="arknights_qurery_box">
        <router-view/>
      </div>
      <div :class="arknights_query_switch">
        <button type="button" class="arknights_query_switch_button" @click="general_button_onclick">概况</button>
        <router-link to="/user/arknights-analysis/general" id="arknights-general" style="display: none"
                     target="_self"></router-link>
        <button type="button" class="arknights_query_switch_button" @click="gacha_button_onclick">寻访</button>
        <router-link to="/user/arknights-analysis/gacha" id="arknights-gacha" style="display: none"
                     target="_self"></router-link>
        <button type="button" class="arknights_query_switch_button" @click="diamond_button_onclick">源石</button>
        <router-link to="/user/arknights-analysis/diamond" id="arknights-diamond" style="display: none"
                     target="_self"></router-link>
        <button type="button" class="arknights_query_switch_button" @click="order_button_onclick">充值</button>
        <router-link to="/user/arknights-analysis/order" id="arknights-order" style="display: none"
                     target="_self"></router-link>
      </div>
    </div>
  </div>
</template>

<script>

import {onMounted, ref} from "vue";

export default {
  name: "ArknightsAnalysis-App",
  setup() {
    let arknights_analysis_ui = ref('')
    let deviceType = ref('')
    let arknights_general_dev = ref('')
    let arknights_qurery_box = ref('')
    let arknights_query_switch = ref('')

    function _isMobile() {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
    if (_isMobile()) {
      deviceType.value = 'mobile'
    } else {
      deviceType.value = 'pc'
    }
    if (deviceType.value === 'mobile') {
      arknights_analysis_ui.value = 'arknights-analysis-mobile'
      deviceType.value = 'mobile'
      arknights_general_dev.value = 'arknights-general-mobile'
      arknights_qurery_box.value = 'arknights-qurery-box-mobile'
      arknights_query_switch.value = 'arknights-query-switch-mobile'
    } else {
      arknights_analysis_ui.value = 'arknights-analysis-pc'
      deviceType.value = 'pc'
      arknights_general_dev.value = 'arknights-general-pc'
      arknights_qurery_box.value = 'arknights-qurery-box-pc'
      arknights_query_switch.value = 'arknights-query-switch-mobile'
    }

    function general_button_onclick(){
      document.getElementById("arknights-general").click()
    }
    function gacha_button_onclick(){
      document.getElementById("arknights-gacha").click()
    }
    function diamond_button_onclick(){
      document.getElementById("arknights-diamond").click()
    }
    function order_button_onclick(){
      document.getElementById("arknights-order").click()
    }

    onMounted(() => {

    })

    return {
      arknights_analysis_ui: arknights_analysis_ui,
      arknights_general_dev: arknights_general_dev,
      arknights_qurery_box:arknights_qurery_box,
      arknights_query_switch:arknights_query_switch,
      general_button_onclick,
      gacha_button_onclick,
      diamond_button_onclick,
      order_button_onclick
    }
  }
}
</script>

<style scoped>
.arknights-analysis-pc {
  position: fixed;
  width: 82%;
  height: 100%;
}

.arknights-analysis-mobile {
  position: fixed;
  width: 100%;
  height: 100%;
}

.arknights-general-pc {
  background: rgba(200, 230, 230, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 6px 6px 2px rgba(50, 50, 50, 0.6);
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  width: 65%;
  min-width: 340px;
  height: 80%;
}
.arknights-general-mobile {
  background: rgba(200, 230, 230, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 6px 6px 2px rgba(50, 50, 50, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
  min-width: 340px;
  height: 80%;
  min-height: 600px;
  text-align: center;
  vertical-align: bottom;
}

.arknights-qurery-box-pc{
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  height: 90%;
  text-align: center;
}
.arknights-qurery-box-pc::-webkit-scrollbar{
  display: none;
  width: 5px;
  height:10px;
  background-color:#b5b1b1;
}
.arknights-qurery-box-pc::-webkit-scrollbar-track{
  display: none;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color:black;
}
.arknights-qurery-box-pc::-webkit-scrollbar-thumb{
  display: none;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:#b5b1b1;
}
.arknights-qurery-box-mobile{
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 90%;
}
.arknights-qurery-box-mobile::-webkit-scrollbar{
  display: none;
}

.arknights-query-switch-pc{
  width: 100%;
  height: 10%;
  text-align: center;
}
.arknights-query-switch-mobile {
  width: 100%;
  height: 10%;
  text-align: center;
}
.arknights_query_switch_button{
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 22%;
  height: 40px;
  margin-top: 6px;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_query_switch_button:hover{
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 22%;
  height: 40px;
  margin-top: 6px;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_query_switch_button:active{
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 22%;
  height: 40px;
  margin-top: 6px;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

input:hover::placeholder, input:focus::placeholder {
  color: white;
  font-weight: normal;
}

</style>