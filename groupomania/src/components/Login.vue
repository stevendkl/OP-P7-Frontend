<template>
    <div class="login_container">
        <div class="login_box">
          <!-- avatar area -->
          <div class="avatar_box">
            <img src="../assets/logo.svg" alt="">
          </div>
          <!-- login form area -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
          <!-- login account -->            
          <el-form-item class="login_form_item" prop="email">
            <el-input placeholder="please input user account" v-model="loginForm.email">
                <template slot="prepend">Account&nbsp;&nbsp;</template>
            </el-input>
          </el-form-item>
          <!-- login password -->
          <el-form-item class="login_form_item" prop="password">
            <el-input placeholder="please input user password" v-model="loginForm.password" show-password>
                <template slot="prepend">Password</template>
            </el-input>
          </el-form-item>
          <el-form-item class="login_form_item">
            <el-checkbox v-model="loginForm.remMe">Remember Me</el-checkbox>
          </el-form-item>
          <!-- login button -->
          <el-form-item class="login_form_item, btns">
            <el-button type="primary" @click="login">Log In</el-button>        
            <router-link to='/signup'>
              <el-button type="info">Sign Up</el-button>
            </router-link>            
          </el-form-item>
          </el-form>
        </div>        
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 
      loginForm: {
        email: "",
        password: "",
        remMe: false,
      },
      // 
      loginFormRules: {
        // validate email input format
        email: [
          { required: true, message: 'Please input login email', trigger: 'blur' },
          { type: 'email', message: " Please input correct email address format", trigger: 'blur'},
          { min: 3, max: 20, message: '3 to 20 characters long', trigger: 'blur' }
        ],
        // validate password input format
        password: [
          { required: true, message: 'Please input login password', trigger: 'blur' },
          { min: 6, max: 15, message: '6 to 15 characters long', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {    
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const {data: res, status: ress} = await this.$http.post('auth/login', this.loginForm);
        if (ress !== 200) return this.$message.error(res.error);        
        this.$message.success('login successful');
        // save token to sessionStorage
        var tokenhead = "Bearer ";
        var tokenattach = tokenhead + res.token;
        window.sessionStorage.setItem('token', tokenattach);
        window.sessionStorage.setItem('username', res.username);
        window.sessionStorage.setItem('userId', res.userId);
        window.sessionStorage.setItem('email', res.email);
        window.sessionStorage.setItem('registerdate', res.registerdate);

        // jump to /home
        this.$router.push('/home');
      });
    }
  }
}
</script>

<!-- scoped define css only effect in this file -->
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
    margin-left: 20px;
    margin-right: 20px;
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