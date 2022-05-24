<template>  
  <el-container class="home-container">
    <!-- head area -->
    <el-header>
      <div>
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="">
        <span>User: {{userinfo}}</span>        
      </div>
      <div>
        <el-button type="primary" @click="home">Home</el-button>
        <el-button type="info" @click="logout">Logout</el-button>
      </div>
      
    </el-header>    
    <!-- main area -->
    <el-main>
      main
    </el-main>
    <!-- footer area -->
    <el-footer>Footer</el-footer>    
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userinfo: sessionStorage.username }
  },

  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    home() {      
      this.$router.push('/home')
    }
  },
};


</script>

<style lang="less" scoped>
@import '../assets/css/header.less';
</style>