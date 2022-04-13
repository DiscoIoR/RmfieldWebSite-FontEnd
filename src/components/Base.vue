<template>
  <div :class="footer">
    <div class="footer_content_parent">
      <div class="footer-content-maintainer">
        <div class="footer-content-maintainer-avatar"></div>
        <div class="footer-content-maintainer-discribe">
          <span>DiscoloR</span>
          <br>
          <span><a href="https://github.com/DiscoIoR" class="footer_link_discribe">Github</a></span>
          <br>
          <span><a href="https://space.bilibili.com/86618315" class="footer_link_discribe">Bilibili</a></span>
          <br>
        </div>
      </div>
      <div class="footer-content-beian">
        <a href="https://beian.miit.gov.cn/" class="footer_link_beian">闽ICP备2021014916号</a>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'

export default {
  name: 'Base-Components',
  setup: function () {
    const footer = ref('footer_before_scroll')
    function handleMousewhell(event) {
      event = event || window.event;
      if (event.wheelDelta > 0) {
        footer.value = 'footer_before_scroll';
      } else {
        footer.value = 'footer_after_scroll';
      }
    }

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
      if(Math.abs(moveY/moveX)>1){
        if (moveY < 0) {
          footer.value = 'footer_after_scroll';
        } else if (moveY > 0) {
          footer.value = 'footer_before_scroll';
        }
      }
    }
    //
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

      window.addEventListener('mousewheel', handleMousewhell);
      window.addEventListener('touchstart', handleTouchstart)
      window.addEventListener('touchend', handleTouchend)
    })
    return {
      footer: footer
    }
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

.footer_before_scroll {
  backdrop-filter: blur(15px);
  width: 96%;
  margin-left: 2%;
  position: fixed;
  bottom: -40%;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  transition-duration: 0.3s;
}
.footer_after_scroll {
  backdrop-filter: blur(15px);
  width: 96%;
  margin-left: 2%;
  position: fixed;
  bottom: 2%;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  transition-duration: 0.3s;
}
.footer_content_parent {
  position: relative;
}
.footer-content-maintainer {
  display: inline-block;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 5%;
  float: left;
}
.footer-content-maintainer-avatar {
  flex-basis: 0;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 2.2rem;
  background-size: cover;
  background-position: center;
  float: left;
  background-image: url("../assets/maintainer_avatar.jpg");
}
.footer-content-maintainer-discribe {
  display: inline-block;
  margin-left: 20px;
  height: 70px;
  color: #39C5BB;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 20px;
  vertical-align: top;
  float: left;
}
.footer_link_discribe:visited, .footer_link_discribe {
  color: #bbbbbb;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 14px;
  text-decoration: none;
}
.footer_link_discribe:hover {
  color: #ffffff;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 14px;
  text-decoration: none;
}
.footer_link_discribe:active {
  color: #007d94;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-size: 16px;
  text-decoration: none;
}
.footer-content-beian {
  display: inline-block;
  float: right;
  margin-right: 3%;
  margin-top: 70px;

}
.footer_link_beian:visited, .footer_link_beian {
  color: #a1a1a1;
  text-decoration: none;
  font-size: 12px;
}
.footer_link_beian:hover {
  color: #c0c0c0;
  text-decoration: none;
  font-size: 12px;
}
.footer_link_beian:active {
  color: #e8e8e8;
  text-decoration: none;
  font-size: 12px;
}
</style>