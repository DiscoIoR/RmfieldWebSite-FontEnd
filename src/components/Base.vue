<template>
  <template></template>
</template>

<script>
import {onMounted} from 'vue'

export default {
  name: 'Base-Components',
  setup: function () {

    // function welcomeMessage(){
    //   console.clear()
    //   console.log(
    //       '                                           /@@@@`                         \n' +
    //       '                                           @@@@@@@\\`,]]`                  \n' +
    //       '                                           =@@@@@@@@@@@@@\\                \n' +
    //       '                                         /@@@@@@@@@@@@@@@@@               \n' +
    //       '                                       /@@@@@@@@@@@@@@@@@@@^              \n' +
    //       '                                      @@@@@@@@@@@@@@@@@@@@@@`             \n' +
    //       '                                     /@@@@@@@@@@@@@@@@@@@@@@@             \n' +
    //       '                                     @@@@@@@@@@@@@@@@@@@@@@@@^            \n' +
    //       '                                     =@@@@@@@@@@@@@@@@@@@@@@@@            \n' +
    //       '                                      [\\@@@@@@@@@@@@@@@@@@@@@@^           \n' +
    //       '                                        .@@@@@@@@@@@@@@@@@@@@@^           \n' +
    //       '                                         \\@@@@@@@@@@@@@@@@@@@@^           \n' +
    //       '                                           \\@@@@@@@@@@@@@@@@@@^           \n' +
    //       '                                           =@@@.@@@@@@@@@@@@@@^           \n' +
    //       '                                           =@@@@@@@@@@@@@@@@@@^           \n' +
    //       '                       _\\\\_                O@@@@@@@@@@@@@@O@@^           \n' +
    //       '                    ,@@@@@@@^               @@@@@@@@@@@@@@^,.^`           \n' +
    //       '                    @@@@@@@@@           =@@@@@@@@@@@@@@@@@@               \n' +
    //       '                    =@@@@@@@@\\]         =@@@@@@@@@@@@@@@@@@`              \n' +
    //       '                     \\@@@@@@@@@@@@@@]`,@@@@@@@@@@@@@@@@@@@@^              \n' +
    //       '                       [[@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@O              \n' +
    //       '                          =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@              \n' +
    //       '                         =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`          \n' +
    //       '                         =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             \n' +
    //       '                        ,@@@@@@@@@@@@@@@@@=@@@@@@@@@@@@@@@@@@`            \n' +
    //       '                        @@@@@@@@@@@@@@@@@^/@@@@@@@@@@@@@@@@@@^           \n')
    //   console.log('\n\n                       Welcome to my website  (^・ω・^ )')
    //   console.log('                       This site is built through Vue and Springboot')
    //   console.log('                       If you have any content or technical suggestions,just contact me')
    // }

    onMounted(() => {

      //welcomeMessage()

      let time_hour = parseInt(new Date().toString().split(' ')[4].split(':')[0]);
      if(time_hour < 7 || time_hour >= 23){
        document.querySelector('body').setAttribute('class','body-at-night');
      }else {
        document.querySelector('body').setAttribute('class','body-at-day');
      }
    })

    return {}
  }
}
</script>

<style>
.body-at-day {
  background-color: rgba(0, 20, 30, 0.9);
  background-image: url("../assets/miku_bg.jpg");
  background-position: 45%;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.body-at-night {
  background-color: rgba(0, 20, 30, 0.9);
  background-image: url("../assets/miku_bg_dark.JPG");
  background-position: 45%;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
</style>