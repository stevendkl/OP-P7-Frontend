<template>  
  <el-container class="home-container">
    <!-- head area -->
    <el-header>
      <div>
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="">
        <span>User: {{userinfo}} </span>        
      </div>
      <div>
        <el-button type="primary" @click="home">Home</el-button>
        <el-button type="info" @click="logout">Logout</el-button>
      </div>
      
    </el-header>    
    <!-- main area -->
    <el-main>
      <div class="articles">
      <article>
      <h3>{{ postInfo.name }}</h3>
      <el-divider></el-divider>
      <img :src="imgUrl" alt="post_img" />
        <div class="info-box">
        <!--    title      -->
        <p v-html="postInfo.description"></p> 
        <ul>
          <!--    author        -->
          <li class="author">            
            <span>Author: {{ postInfo.manufacturer }}</span>
          </li>
          <!--    create Time        -->
          <li class="createTime">          
            <span>Post at: {{ postInfo.createdAt | dateFormat }}</span>
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
      // get read info
      readForm: {
        postId: this.$route.query.id,
        userId: sessionStorage.userId,
      },
      postInfo: [], 
      imgUrl: "",
    }
  },

  created() {
    this.postread(),
    this.getPost()
  },

  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    home() {      
      this.$router.push('/home')
    },
    postNew() {      
      this.$router.push('/newpost')
    },
    //post read status
    async postread() {
      const {data: res, status: ress} = await this.$http.post('postread', this.readForm);
      if (ress !== 201) 
      return this.$message.error(res.error);        
      this.$message.success('post read status successful');      
    },
    // get all post 
    async getPost() {
      const {data: res, status: ress} = await this.$http.get('sauces/'+this.readForm.postId);
      if (ress !== 200) return this.$message.error('can not read posts');        
      this.postInfo = res;
      if (res.imageUrl) {
        this.imgUrl = res.imageUrl;} 
      else { 
        this.imgUrl = "http://localhost:3000/images/blank.png";}
      console.log(this.postInfo);
    },  
  },

  filters: {
    // format time string
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

}


</script>

<style lang="less" scoped>
@import '../assets/css/header.less';
@import '../assets/css/articles.less';

article {
  margin-left: 15%;
  width:70%;
}

img {
  max-width:70%;
}

 .el-divider--horizontal {
     margin: 12px 0;
 } 

</style>