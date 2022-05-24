<template>  
  <el-container class="home-container">
    <!-- head area -->
    <el-header>
      <div>
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="">
        <span>User: {{userinfo}}</span>        
      </div>
      <div>
        <el-button type="primary" @click="postNew">New Post</el-button>
        <el-button type="primary" @click="profile">Profile</el-button>
        <el-button type="info" @click="logout">Logout</el-button>
      </div>
      
    </el-header>    
    <!-- main area -->
    <el-main>
      <article v-for="item in menulist" :key="item.id">
      <h3>{{ item.name }}</h3>
        <div>
        <!--    摘要      -->
        <p v-html="item.description"></p>
        <ul>
          <!--    作者        -->
          <li>
            <svg-icon icon-class="author"></svg-icon>
            <span>{{ item.manufacturer }}</span>
          </li>

          <!--    创建时间        -->
          <li>
            <svg-icon icon-class="clock"></svg-icon>
            <span>{{ item.createdAt}}</span>
          </li>
        </ul>
        </div>
        </article>
    </el-main>
    <!-- footer area -->
    <el-footer>Footer</el-footer>    
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userinfo: sessionStorage.username,
      menulist: [],
    }
  },

  created() {
    this.getMenuList()
  },

  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    profile() {      
      this.$router.push('/profile')
    },
    postNew() {      
      this.$router.push('/newpost')
    },
    // get all post menu
    async getMenuList() {
      const {data: res, status: ress} = await this.$http.get('sauces');
      if (ress !== 200) return this.$message.error('can not read posts');        
      this.menulist = res;
      console.log(res);
    },
  },
};


</script>

<style lang="less" scoped>
@import '../assets/css/header.less';
</style>