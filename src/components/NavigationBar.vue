<template>
  <div v-if="deviceType==='pc'" class="navigation-bar">
    <div class="navigation-bar-user">
      <div class="navigation-bar-user-content-logout" @click="clickLogout" v-if="state_ctrl_2!==''">
        {{ state_ctrl_2 }}
        <router-link :to="state_ctrl_2_url" id="home" style="display: none" target="_self"></router-link>
      </div>
      <div class="navigation-bar-user-content-divide" v-if="(state_ctrl_1!=='')&&(state_ctrl_2!=='')">
        |
      </div>
      <div class="navigation-bar-user-content-home" @click="clickHome" v-if="state_ctrl_1!==''">
        {{state_ctrl_1}}
        <router-link :to="state_ctrl_1_url" id="logout" style="display: none" target="_self"></router-link>
      </div>
    </div>
    <div class="navigation-bar-element" v-if="element_1!==''">
      <div class="navigation-bar-element-content" @click="clickElement1">
        {{ element_1 }}
        <router-link :to="element_1_url" id="element1" style="display: none" target="_self"></router-link>
      </div>
    </div>
    <div class="navigation-bar-element" v-if="element_2!==''">
      <div class="navigation-bar-element-content" @click="clickElement2">
        {{ element_2 }}
        <router-link :to="element_2_url" id="element2" style="display: none" target="_self"></router-link>
      </div>
    </div>
    <div class="navigation-bar-element" v-if="element_3!==''">
      <div class="navigation-bar-element-content" @click="clickElement3">
        {{ element_3 }}
        <router-link :to="element_3_url" id="element3" style="display: none" target="_self"></router-link>
      </div>
    </div>
    <div class="navigation-bar-element" v-if="element_4!==''">
      <div class="navigation-bar-element-content" @click="clickElement4">
        {{ element_4 }}
        <router-link :to="element_4_url" id="element4" style="display: none" target="_self"></router-link>
      </div>
    </div>
  </div>

  <div v-if="deviceType==='mobile'" :class="navigation_bar_mobile">
    <div class="navigation-bar-mobile-user">
      <div class="navigation-bar-mobile-user-content-home" v-if="state_ctrl_1!==''">
        <router-link :to="state_ctrl_1_url" class="navigation-bar-mobile-user-link">{{ state_ctrl_1 }}</router-link>
      </div>
      <br>
      <div class="navigation-bar-mobile-user-content-logout" v-if="state_ctrl_2!==''">
        <router-link :to="state_ctrl_2_url" class="navigation-bar-mobile-user-link">{{ state_ctrl_2 }}</router-link>
      </div>
    </div>
    <div class="navigation-bar-mobile-element" v-if="element_1!==''">
      <div class="navigation-bar-mobile-element-content">
        <router-link :to="element_1_url" class="navigation-bar-mobile-element-link">{{ element_1 }}</router-link>
      </div>
    </div>
    <div class="navigation-bar-mobile-element" v-if="element_2!==''">
      <div class="navigation-bar-mobile-element-content">
        <router-link :to="element_2_url" class="navigation-bar-mobile-element-link">{{ element_2 }}</router-link>
      </div>
    </div>
    <div class="navigation-bar-mobile-element" v-if="element_3!==''">
      <div class="navigation-bar-mobile-element-content">
        <router-link :to="element_3_url" class="navigation-bar-mobile-element-link">{{ element_3 }}</router-link>
      </div>
    </div>
    <div class="navigation-bar-mobile-element" v-if="element_4!==''">
      <div class="navigation-bar-mobile-element-content">
        <router-link :to="element_4_url" class="navigation-bar-mobile-element-link">{{ element_4 }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'

export default {
  name: "NavigationBar-Components",
  props: {
    state_ctrl_1:String,
    state_ctrl_1_url:String,
    state_ctrl_2:String,
    state_ctrl_2_url:String,
    element_1:String,
    element_1_url:String,
    element_2:String,
    element_2_url:String,
    element_3:String,
    element_3_url:String,
    element_4:String,
    element_4_url:String,
},
  setup() {
    let deviceType = ref('')
    function _isMobile(){
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }

    const navigation_bar_mobile = ref('navigation_bar_mobile_before_slide')
    let positionX_start = 0
    let positionX_end = 0
    let positionY_start = 0
    let positionY_end = 0
    function handleTouchstart(event) {
      positionX_start = event.touches[0].pageX;
      positionY_start = event.touches[0].pageY;
    }
    function handleTouchend(event) {
      positionX_end = event.changedTouches[0].pageX;
      let moveX = positionX_end - positionX_start
      positionY_end = event.changedTouches[0].pageY;
      let moveY = positionY_end - positionY_start
      if (Math.abs(moveY/moveX)<=1){
        if (moveX < 0) {
          navigation_bar_mobile.value = 'navigation_bar_mobile_after_slide';
        } else if (moveX > 0) {
          navigation_bar_mobile.value = 'navigation_bar_mobile_before_slide';
        }
      }
    }

    function clickHome(){
      document.getElementById("home").click();
    }
    function clickLogout(){
      document.getElementById("logout").click();
    }
    function clickElement1(){
      document.getElementById("element1").click();
    }
    function clickElement2(){
      document.getElementById("element2").click();
    }
    function clickElement3(){
      document.getElementById("element3").click();
    }
    function clickElement4(){
      document.getElementById("element4").click();
    }

    if(_isMobile()){
      deviceType.value='mobile'
    }else {
      deviceType.value='pc'
    }

    onMounted(() => {
      window.addEventListener('touchstart', handleTouchstart)
      window.addEventListener('touchend', handleTouchend)
    })

    return {
      navigation_bar_mobile:navigation_bar_mobile,
      deviceType:deviceType,
      clickHome,
      clickLogout,
      clickElement1,
      clickElement2,
      clickElement3,
      clickElement4
    }
  }
}
</script>

<style>
.navigation-bar {
  background: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,0.05),rgba(0,0,0,0.15),rgba(0,0,0,0.3),rgba(0,0,0,0.4),rgba(0,0,0,0.5),rgba(0,0,0,0.6),rgba(0,0,0,0.7));
  position: fixed;
  height: 100%;
  width: 18%;
  right: 0;
}
.navigation-bar-user {
  position: relative;
  height: 20%;
}
.navigation-bar-user-content-home {
  display: inline-block;
  float: right;
  margin-top: 10%;
  margin-right: 2%;
  color: #c8c8c8;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}
.navigation-bar-user-content-home:hover {
  display: inline-block;
  float: right;
  margin-top: 10%;
  margin-right: 3%;
  color: #39C5BB;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 14px;
  cursor: url("../assets/miku_cursor.cur"),default;
  transition: 0.2s;
}
.navigation-bar-user-content-divide {
  display: inline-block;
  float: right;
  margin-top: 8.5%;
  margin-right: 1%;
  color: #c8c8c8;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 20px;
}
.navigation-bar-user-content-logout {
  display: inline-block;
  float: right;
  margin-top: 10%;
  margin-left: 1%;
  margin-right: 19%;
  color: #c8c8c8;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}
.navigation-bar-user-content-logout:hover {
  display: inline-block;
  float: right;
  margin-top: 10%;
  margin-left: 0;
  margin-right: 20%;
  color: #39C5BB;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 14px;
  cursor: url("../assets/miku_cursor.cur"),default;
  transition: 0.2s;
}
.navigation-bar-element {
  position: relative;
  height: 12%;
}
.navigation-bar-element-content {
  width: 40%;
  text-align: right;
  display: inline-block;
  float: right;
  margin-top: 7%;
  margin-right: 20%;
  padding-right: 0;
  color: white;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 20px;
  transition: 0.2s;
  word-break: keep-all;
}
.navigation-bar-element-content:hover {
  display: inline-block;
  margin-top: 7%;
  margin-right: 20%;
  padding-right: 10%;
  color: #39C5BB;
  font-family: "Microsoft YaHei UI", sans-serif;
  text-decoration: none;
  font-size: 20px;
  cursor: url("../assets/miku_cursor.cur"),default;
  transition: 0.2s;
}

.navigation_bar_mobile_before_slide{
  position: fixed;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  background-color: rgba(0, 0, 0, 0.6);
  transition-duration: 0.3s;
  height: 81%;
  width: 40%;
  top: 2%;
  left: 105%;
  z-index: 100;
}
.navigation_bar_mobile_after_slide{
  position: fixed;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  background-color: rgba(0, 0, 0, 0.6);
  transition-duration: 0.3s;
  height: 81%;
  width: 40%;
  top: 2%;
  left: 58%;
  z-index: 100;
}
.navigation-bar-mobile-user{
  position: relative;
  height: 23%;
}
.navigation-bar-mobile-user-content-home{
  display: inline-block;
  margin-left: 20%;
  margin-top: 20%;
}
.navigation-bar-mobile-user-content-logout{
  display: inline-block;
  margin-left: 20%;
  margin-top: 4%;
}
.navigation-bar-mobile-user-link,.navigation-bar-mobile-user-link:visited{
  color: #bbbbbb;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 16px;
  text-decoration: none;
}
.navigation-bar-mobile-user-link:active{
  color: #39C5BB;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 16px;
  text-decoration: none;
}
.navigation-bar-mobile-element{
  position: relative;
  height: 8%;
}
.navigation-bar-mobile-element-content{
  display: inline-block;
  margin-left: 20%;
  margin-top: 5%;
  word-break: keep-all;
  line-height: 90%;
}
.navigation-bar-mobile-element-link,.navigation-bar-mobile-element-link:visited{
  color: #bbbbbb;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 18px;
  text-decoration: none;
}
.navigation-bar-mobile-element-link:active{
  color: #39C5BB;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 16px;
  text-decoration: none;
}
</style>