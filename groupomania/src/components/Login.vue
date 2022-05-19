<template>
    <div class="login_container">
        <div class="login_box">
          <!-- avatar area -->
          <div class="avatar_box">
            <img src="../assets/logo.svg" alt="">
          </div>
          <!-- login form area -->
          <el-form :model="loginForm" :rules="loginFormRules" class="login_form">
          <!-- login account -->            
          <el-form-item class="login_form_item" prop="userNo">
            <el-input placeholder="please input user account" v-model="loginForm.userNo">
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
            <el-button type="primary">Log In</el-button>        
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
        userNo: "",
        password: "",
        remMe: false,
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        userNo: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { type: 'email', message: " Please input correct email address format", trigger: 'blur'},
          { min: 3, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
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