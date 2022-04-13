<template>
  <Base />
  <NavigationBar
      :state_ctrl_1="state_ctrl_1"
      :state_ctrl_2="state_ctrl_2"
      :element_1="element_1"
      :element_2="element_2"
      :element_3="element_3"
      :element_4="element_4"/>
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
      state_ctrl_2:'Logout',
      element_1:'Arknights Analysis',
      element_2:'',
      element_3:'',
      element_4:''
    }
  }
}
</script>

<style scoped>

</style>