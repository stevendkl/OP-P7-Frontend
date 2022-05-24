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
      // 这是登录表单的数据绑定对象
      loginForm: {
        email: "",
        password: "",
        remMe: false,
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证email是否合法
        email: [
          { required: true, message: 'Please input login email', trigger: 'blur' },
          { type: 'email', message: " Please input correct email address format", trigger: 'blur'},
          { min: 3, max: 20, message: '3 to 20 characters long', trigger: 'blur' }
        ],
        // 验证密码是否合法
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
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        var tokenhead = "Bearer ";
        var tokenattach = tokenhead + res.token;
        window.sessionStorage.setItem('token', tokenattach);
        window.sessionStorage.setItem('username', res.username);
        window.sessionStorage.setItem('userId', res.userId);        
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home');
      });
    }
  }
}
</script>

<!-- scoped定义样式只在本文件中应用 -->
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