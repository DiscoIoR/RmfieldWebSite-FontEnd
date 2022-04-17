<template>
  <Base />
  <NavigationBar
      :state_ctrl_1="state_ctrl_1"
      :state_ctrl_1_url="state_ctrl_1_url"
      :state_ctrl_2="state_ctrl_2"
      :state_ctrl_2_url="state_ctrl_2_url"
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

export default {
  name: "User-App",
  components:{
    Base,
    NavigationBar
  },
  setup:function (){
    return{
      state_ctrl_1:'Home',
      state_ctrl_1_url:'/',
      state_ctrl_2:'Logout',
      state_ctrl_2_url:'/',
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