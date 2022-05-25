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
      <el-form 
      :model="addPostForm" :rules="addPostRules" ref="addPostRef"
      label-width="100px" class="demo-ruleForm">
          
        <el-form-item label="Topic" prop="title">
          <el-input v-model="addPostForm.title"></el-input>
        </el-form-item>

        <el-form-item label="Content">
          <MyEditor ref="MyEditor"></MyEditor>
        </el-form-item>

        <el-form-item  class="submitBtnDiv">
          <el-button type="primary" @click="submitForm">Create Topic</el-button>
          <el-button type="info" @click="resetForm">Reset</el-button>
        </el-form-item>

      </el-form>      
    </el-main>
    <!-- footer area -->
    <el-footer>Footer</el-footer>    
  </el-container>
</template>

<script>
import MyEditor from '../components/MyEditor.vue'

export default {
  components: {MyEditor}, 

  data() {   
    return {
      userinfo: sessionStorage.username,

      addPostForm: {
        title: "",
      },

      addPostRules: {
        title: [
          { required: true, message: "Please input post topic", trigger: "blur" },
          { min: 3, max: 20, message: '3 to 20 characters long', trigger: 'blur'},
        ],
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
    submitForm() {
    },
    resetForm() {
      this.$refs.addPostRef.resetFields();
      this.$refs.MyEditor.clrEditor();        
    },    
  },
};


</script>

<style lang="less" scoped>
@import '../assets/css/header.less';

.submitBtnDiv {
  text-align: right;
  margin-top: 20px;
  padding-right: 50px;
}

form {
  width: 70%;
  margin-left: 15%;
  background-color: #fff;
  padding: 10px;
}

</style>
