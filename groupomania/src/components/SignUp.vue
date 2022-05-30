<template>
    <div class="login_container">
        <div class="login_box">
          <!-- avatar area -->
          <div class="avatar_box">
            <img src="../assets/logo.svg" alt="">
          </div>
          <!-- signup form area -->          
          <el-form ref="signFormRef" :model="signForm" :rules="signFormRules" class="login_form">
          <!-- account -->            
          <el-form-item class="login_form_item" prop="email">
            <el-input placeholder="please input user account" v-model="signForm.email">
                <template slot="prepend">Account&nbsp;&nbsp;&nbsp;</template>
            </el-input>
          </el-form-item>
          <!-- username -->                    
          <el-form-item class="login_form_item" prop="username">
            <el-input placeholder="please input user nickname" v-model="signForm.username">
                <template slot="prepend">Username</template>
            </el-input>
          </el-form-item>
          <!-- password -->
          <el-form-item class="login_form_item" prop="password">
            <el-input placeholder="please input user password" v-model="signForm.password" show-password>
                <template slot="prepend">Password&nbsp;</template>
            </el-input>
          </el-form-item>         
          <!-- signup button -->
          <el-form-item class="login_form_item, btns">                 
            <el-button type="primary" @click="signup">Sign Up</el-button>
          </el-form-item>
          </el-form>
        </div>        
    </div>
</template>

<script>
export default {
  data() {
    return {
      signForm: {
        email: "",
        username: "",
        password: "",
      },
      signFormRules: {
        
        email: [
          { required: true, message: 'Please input login email', trigger: 'blur' },
          { type: 'email', message: " Please input correct email address format", trigger: 'blur'},
          { min: 3, max: 20, message: '3 to 20 characters long', trigger: 'blur' }
        ],
        
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 20, message: '3 to 20 characters long', trigger: 'blur' }
        ],
        
        password: [
          { required: true, message: 'Please input login password', trigger: 'blur' },
          { min: 6, max: 15, message: '6 to 15 characters long', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {    
    signup() {
      this.$refs.signFormRef.validate(async valid => {
        if (!valid) return;
        const {data: res, status: ress} = await this.$http.post('auth/signup', this.signForm);
        if (ress !== 201) return this.$message.error(res.error);        
        this.$message.success('signup successful');        
        this.$router.push('/login');
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 80%;
  max-width: 450px;
  height: 800%;
  max-height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffd7d7;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login_form_item {
    width: 90%;
    margin: auto;
    margin-bottom: 20px;
  }

  button {
    width: 100px;
  }
}
.login_form {  
  padding-top: max(100px, 25%);
}


.btns {
  display: flex;
  justify-content: center;
}

</style>