<template>  
  <el-container class="home-container">
    <!-- head area -->
    <el-header>
      <div>
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="">
        <span>User: </span>        
      </div>
      <el-button type="info" @click="logout">Logout</el-button>
    </el-header>
    <!-- body area -->
    <el-container>
      <!-- side area -->
      <el-aside width="200px">Aside</el-aside>
      <!-- main area -->
      <el-container>
        <el-main>Main</el-main>
        <!-- footer area -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height:48px;
    };
  };
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.el-footer {
  background-color: #373d41;
}

</style>