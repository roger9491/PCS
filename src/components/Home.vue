<template>
  <!-- 頁面主體區域 -->
  <el-container direction="vertical">
    <div class="cover" :style="selectdisplay"></div>
    <!-- Login box -->
    <div class="login_box" :style="selectdisplay">
      <!-- Avatar icon -->
      <div class="avatar_box" >
        <img src="../assets/image/avatar.jpg" alt="" />
      </div>
      <!-- 登陸表單 -->
      <!-- 為表單添加驗證規則對象 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
        :style="selectdisplay"
      >
        <!-- 帳號 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密碼   prop:element 需要校驗的變數 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按鈕區域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陸</el-button>
          <el-button type="info" @click="creatUser">新增帳密</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-header >
      <!-- 導航菜單 -->
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      
      >
        <el-row :span="7" justify="center">
          <el-col :span="4"
            ><div class="menu-style">
              <el-menu-item index="1"  @click="eazynote">雲端上傳</el-menu-item>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="menu-style">
              <el-menu-item index="1"  @click="calendar">日曆</el-menu-item>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="menu-button">
             <el-button type="primary" plain>修改帳密</el-button>
             <el-button type="info" plain @click="logout">Logout</el-button>
            </div></el-col
          >
        </el-row>
      </el-menu>
    </el-header>

    <!-- 右側 -->
    <el-main>
      <!-- 路由佔位福 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { request } from "../network/request.js";
export default {
  data() {
    return {
      selectdisplay: {
        display: "",
      },
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
        password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
      },
      //使否折疊
      isCollapse: false,
    };
  },
  created() {
    // Remember to switch back to "block"
    this.selectdisplay.display = "block";
  },
  methods: {
    login() {
      request({
        url: "/api/login",
        method: "post",
        data: this.loginForm,
      })
        .then((res) => {
          if (res.data.Code == 401) {
            console.log("fail");
            return this.$message.error("帳號密碼錯誤");
          }
          //token儲存到cookies
          this.$cookies.set("Authorization", res.data["jwttoken"])
          this.$cookies.set("UserId", res.data["userid"])
          this.selectdisplay.display = "none";
          this.$$router.push("/welcome")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.$cookies.remove("Authorization")
      //路由跳轉
      this.$router.push("/home");
      this.selectdisplay.display = "block"
    },
    creatUser(){
      request({
        url: "/api/user",
        method: "put",
        data: this.loginForm,
      })
        .then((res) => {
          if (res.data.Code == 400) {
            console.log("fail");
            return this.$message.error("無效帳密");
          }
          if (res.data == "-1") {
            return this.$message.error("重複使用者");
          }
          //token儲存到cookies
          console.log(res)
          this.$cookies.set("Authorization", res.data["jwttoken"])
          this.$cookies.set("UserId", res.data["userid"])

          this.selectdisplay.display = "none";
          this.$$router.push("/welcome")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggkeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    taskmanagement(){
      this.$router.push("/taskmanage")
    },
    eazynote(){
      this.$router.push("/eazynote")
    },
    notebook(){
      this.$router.push("/notebook")
    },
    calendar(){
      this.$router.push("/calendar")
    }

  },
};
</script>

<style lang="less" scoped>
.el-header {
  width: 100%;
  line-height: 100px;
  z-index: 800;
}

.cover {
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 8);
  backdrop-filter: blur(10px);
  overflow: auto;
  opacity: 0.8;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}

.main {
  background-color: #eaedf1;
  height: 100%;
  z-index: 800;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.4em;
  cursor: pointer;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px; //圓角

  //位置設中心 可以學起來
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  .avatar_box {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    padding: 10px;
    // box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    // background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item{
  height: 60px;
  text-align: center;   //文字居中
}


.menu-button{
  position:relative;
  top:15px;
  left:30px;
}


::v-deep .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6; 
}
</style>

