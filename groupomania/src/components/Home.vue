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
      <div class="articles">
      <article v-for="item in menulist" :key="item.id">
      <h3>{{ item.name }}</h3>
        <div class="info-box">
        <!--    摘要      -->
        <p v-html="item.description"></p>
        <ul>

          <!--    作者        -->
          <li class="author">            
            <span>Author: {{ item.manufacturer }}</span>
          </li>

          <!--    创建时间        -->
          <li class="createTime">          
            <span>post at: {{ item.createdAt | dateFormat }}</span>
          </li>
        </ul>
        </div>
      </article>
      </div>
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

  filters: {
    // 格式化时间字符串
    dateFormat(time) {
      let dt = new Date(time);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      return `${y}.${m}.${d} ${hh}:${mm}:${ss}`;
    },
  },
};


</script>

<style lang="less" scoped>
@import '../assets/css/header.less';
@import '../assets/css/articles.less';

</style>