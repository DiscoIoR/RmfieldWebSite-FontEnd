<template>
  <Base />
  <NoticeBoard/>
  <NavigationBar
      :element_1="element_1"
      :element_1_url="element_1_url"
      :element_2="element_2"
      :element_2_url="element_2_url"
      :element_3="element_3"
      :element_3_url="element_3_url"
      :element_4="element_4"
      :element_4_url="element_4_url"/>
  <router-view />
</template>

<script>
import Base from "@/components/Base";
import NavigationBar from "@/components/NavigationBar";
import NoticeBoard from "@/components/User/NoticeBoard";

export default {
  name: "User-App",
  components:{
    Base,
    NavigationBar,
    NoticeBoard
  },
  setup:function (){
    return{
      element_1:'Arknights Analysis',
      element_1_url:'/user/arknights-analysis/general',
      element_2:'',
      element_2_url:'',
      element_3:'',
      element_3_url:'',
      element_4:'',
      element_4_url:''
    }
  }
}
</script>

<style scoped>

</style>