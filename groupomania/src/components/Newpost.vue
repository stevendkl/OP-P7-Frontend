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
      :model="addPostForm.content" :rules="addPostRules" ref="addPostRef"
      label-width="100px" class="demo-ruleForm">
          
        <el-form-item label="Topic" prop="name">
          <el-input v-model="addPostForm.content.name"></el-input>
        </el-form-item>

        <el-form-item label="Content">
          <MyEditor ref="MyEditor"></MyEditor>
        </el-form-item>

        <el-form-item  class="submitBtnDiv">
          
          <el-tag>Upload Image:</el-tag>
          <input @change="modifyFile()" type="file" ref="file" name="image" id="File" accept=".jpg, .jpeg, .png" >        

          <el-button type="primary" @click="submitForm">Create Topic</el-button>
          <el-button type="info" @click="resetForm">Reset</el-button>
          <!-- test
          <el-button type="info" @click="printhtml">testget</el-button>
           -->
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
        content: {
          userId: sessionStorage.userId,
          name: "",
          manufacturer: sessionStorage.username,
          description: "",          
        },
        image: "",
      },

      addPostRules: {
        name: [
          { required: true, message: "Please input post topic", trigger: "blur" },
          { min: 3, max: 50, message: '3 to 50 characters long', trigger: 'blur'},
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
      const html_content = this.$refs.MyEditor.getEHtml();      
      this.addPostForm.content.description = html_content;

      const formData = new FormData();
      formData.set("image", this.file);
      formData.set("name", this.addPostForm.content.name);
      formData.set("userId", sessionStorage.userId);
      formData.set("manufacturer", sessionStorage.username);
      formData.set("description", this.addPostForm.content.description);
      
      this.$refs.addPostRef.validate(async valid => {
        if (!valid) return;
        const {data: res, status: ress} = await this.$http.post('sauces', formData);
        if (ress !== 201) return this.$message.error(res.error);        
        this.$message.success('Posted successfully');        
        this.$router.push('/home');
      });
    },
    resetForm() {
      this.$refs.addPostRef.resetFields();
      this.$refs.MyEditor.clrEditor();        
    },
    modifyFile() {
      this.file = this.$refs.file.files[0];
    },    
    /*printhtml() {
      const html_content = this.$refs.MyEditor.getEHtml();
      
    }*/
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

.el-tag {
  margin-right: 10px;
}

</style>
