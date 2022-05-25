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
      <div class="profiles">
      <el-card class="box-card" >
        <div class="item">User&nbsp;&nbsp;: {{userinfo}}</div>
        <div class="item">Email&nbsp;: {{email}}</div>
        <div class="item">Registration Date&nbsp;: {{ registerdate | dateFormat }}</div>
      </el-card>
      <el-button type="primary" @click="deleteAcc">Delete account</el-button>
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
      email:sessionStorage.email,
      registerdate: sessionStorage.registerdate,
      deleteForm: {
        userId: sessionStorage.userId,
      }, 
    }
  },

  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },

    home() {      
      this.$router.push('/home')
    },
    
    async deleteAcc() {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        'This operation will permanently delete the user account, do you want to continue?',
        'Notice',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('Delete cancelled')
      }
      const {data: res, status: ress} = await this.$http.delete('auth/delete', {data: {userId: this.deleteForm.userId}});
      if (ress !== 200) return this.$message.error(res.error);        
      this.$message.success(res.message);
      this.$router.push('/login');
    }
  },

  filters: {
    // 格式化时间字符串
    dateFormat(time) {
      let dt = new Date(time);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      return `${y}.${m}.${d}`;
    },
  },
};


</script>

<style lang="less" scoped>
@import '../assets/css/header.less';

.profiles {
  display:flex;
  align-items:center;
  flex-direction: column;
}

.item {
    padding: 12px 0;
}

.box-card {
    width: 480px;
    margin-bottom: 20px;
    margin-top: 20px;
}

</style>