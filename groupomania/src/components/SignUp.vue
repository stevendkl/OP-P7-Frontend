<template>
    <div class="login_container">
        <div class="login_box">
          <!-- avatar area -->
          <div class="avatar_box">
            <img src="../assets/logo.svg" alt="">
          </div>
          <!-- signup form area -->
          <!-- account -->
          <el-form class="login_form">            
          <p>
            <el-input placeholder="please input user account" v-model="userNo">
                <template slot="prepend">Account&nbsp;&nbsp;&nbsp;</template>
            </el-input>
          </p>                   
          <p>
            <el-input placeholder="please input user nickname" v-model="userName">
                <template slot="prepend">Username</template>
            </el-input>
          </p>
          <!-- password -->
          <p>
            <el-input placeholder="please input user password" v-model="password" show-password>
                <template slot="prepend">Password&nbsp;</template>
            </el-input>
          </p>          
          <!-- signup button -->
          <p class="btns">                 
            <el-button type="primary">Sign Up</el-button>
          </p>
          </el-form>
        </div>        
    </div>
</template>

<script>
export default {
  data() {
    return {
      userNo: "",
      userName: "",
      password: "",
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

  p {
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