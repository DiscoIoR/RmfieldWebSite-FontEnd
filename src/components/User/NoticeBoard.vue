<template>
  <div :class="changeNoticeBoard" @click="turnNoticeBoard">
    <div v-show="showNoticeTitle">
      NOTICE
    </div>
    <div class="NoticeContent">
      {{ noticeContent }}
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {getCookie} from "@/router/getCookie";

export default {
  name: "NoticeBoard-Components",
  setup(){
    let changeNoticeBoard = ref('NoticeBoardBox-1')
    let showNoticeTitle = ref(true)

    function turnNoticeBoard(){
      showNoticeTitle.value = !showNoticeTitle.value
      if(changeNoticeBoard.value === 'NoticeBoardBox-1'){
        changeNoticeBoard.value = 'NoticeBoardBox-2'
      }else {
        changeNoticeBoard.value = 'NoticeBoardBox-1'
      }
    }

    let token = getCookie('token')
    let noticeContent = ref('')
    axios({
      url:'/user/api/notice-board',
      headers: {
        'token': token
      }
    }).then(response=>{
      let result = response.data
      noticeContent.value = result.data.content
      if(noticeContent.value === '' || noticeContent.value === null){
        noticeContent.value = 'There is no notice.'
      }
      console.log(noticeContent.value)
    }).catch(()=>{
      noticeContent.value = '获取公告时发生错误'
    })

    return{
      showNoticeTitle,
      changeNoticeBoard,
      noticeContent,
      turnNoticeBoard
    }
  }
}
</script>

<style scoped>
.NoticeBoardBox-1{
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(3px);
  box-shadow: 2px 2px 2px rgba(50, 50, 50, 0.3);
  color: white;
  position: fixed;
  text-align: center;
  height: 20px;
  width: 60px;
  top: 2%;
  left: 6%;
  padding: 3px;
  border-radius: 7px;
  font-family: "Microsoft YaHei UI", sans-serif;
  cursor: default;
  font-weight: lighter;
  z-index: 90;
  transition: 0.3s;
  overflow: hidden;
}
.NoticeBoardBox-1:hover{
  box-shadow: 3px 3px 4px rgba(200,200,200,0.8);
  transition: 0.3s;
}
.NoticeBoardBox-2{
  background-color: rgba(0,5,0,0.7);
  backdrop-filter: blur(3px);
  box-shadow: 3px 3px 4px rgba(100,100,100,0.8);
  color: rgba(255,255,255,0.6);
  position: fixed;
  width: 250px;
  height: 250px;
  top: 2%;
  left: 6%;
  padding: 3px;
  border-radius: 7px;
  font-family: "Microsoft YaHei UI", sans-serif;
  cursor: default;
  z-index: 90;
  transition: 0.3s;
}
.NoticeBoardBox-2:hover{
  box-shadow: 3px 3px 4px rgba(200,200,200,0.8);
  transition: 0.3s;
}

.NoticeContent{
  padding: 8px;
  color: white;
  font-weight: lighter;
  font-size: 13px;
  line-height: 22px;
  overflow: scroll;
}
.NoticeContent::-webkit-scrollbar{
  display: none;
}


</style>