<template>
  <Base/>
  <LoginRegisterPanel/>
  <Footer/>
</template>

<script>
import Base from "@/components/Base";
import LoginRegisterPanel from "@/components/LoginRegisterPanel";
import Footer from "@/components/Footer";

export default {
  name: "Login-App",
  components: {
    Base,
    LoginRegisterPanel,
    Footer
  }
}
</script>

<style scoped>

</style>