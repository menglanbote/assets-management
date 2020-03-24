<template>
  <div class="loginwrap" id="loginContainer" v-show="isShowLogin">
    <vue-particles
      color="#fff"
      :particleOpacity="0.5"
      :particlesNumber="40"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="100"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="repulse"
      :clickEffect="true"
      clickMode="push"
      class="lizi-wrap"
    ></vue-particles>
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      ref="login_Form"
      class="demo-ruleForm login_form"
    >
      <header class="login-header">
        <p class="login-header-title">{{ product_name }}</p>
        <p class="login-header-version">V{{ product_m_version }}</p>
      </header>
      <div class="login-form-wrap" @keyup.enter="submitForm('login_Form')">
        <el-form-item prop="name">
          <img src="~assets/img/user.png" class="login-input-icon" alt="" />
          <el-input
            type="text"
            :maxLength="20"
            v-model="loginForm.name"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <img src="~assets/img/pwd.png" class="login-input-icon" alt="" />
          <el-input
            type="password"
            :maxLength="20"
            v-model="loginForm.password"
            placeholder="密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <img src="~assets/img/cap.png" class="login-input-icon" alt="" />
          <el-input
            v-model="loginForm.captcha"
            :maxLength="4"
            style="width:70%"
            type="text"
            placeholder="验证码"
            autocomplete="off"
          ></el-input>
          <div ref="captcha_wrap" class="captcha_wrap" @click="__getCaptcha">
            {{ captcha }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
            @click="submitForm('login_Form')"
            >用户登录</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getCaptcha, postLogin, authInfomation } from "req/api/login";
import { mapGetters, mapMutations } from "vuex";
import * as types from "store/mutation_types";
import { isInstall } from "req/api/login";
export default {
  name: "login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      callback();
    };
    var validateCapt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (value.toLowerCase() !== this.captcha.toLowerCase()) {
        this.__getCaptcha();
        return callback(new Error("验证码不对"));
      }
      callback();
    };
    return {
      loginRules: {
        name: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCapt, trigger: "blur" }]
      },
      loginForm: {
        name: "",
        password: "",
        captcha: ""
      },
      isShowLogin: true,
      isInstall: 0,
      captcha: "----",
      product_m_version: "2.0",
      product_name: "自动化平台"
    };
  },
  
  activated () {
    this.__authInfomation()
    this.__getCaptcha();
    if(this.timer5min) {
      clearInterval(this.timer5min)
      document.onmousemove = null
    }
    this.$layer.closeAll()
  },
  computed: {
    ...mapGetters(["token", "username","timer5min"])
  },
  methods: {
    __getCaptcha() {
      getCaptcha().then(res => {
        if (!res) {
          return;
        }
        this.captcha = res.data.captcha_code;
      });
    },
    __postLogin(params) {
      postLogin(params)
        .then(res => {
          if (!res) {
            return;
          }
          var level = res.data.level;
          var token = res.data.token || "";
          let show_name = res.data.show_name || "";
          sessionStorage.setItem("level", level);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("username", show_name);
          this.set_token(token);
          this.set_username(show_name);
          this.$router.replace("/home");
        })
        .catch(err => {
          this.__getCaptcha();
        });
    },
    __authInfomation(param) {
      authInfomation(param)
        .then(res => {
          let data = res.data;
          this.product_m_version = data.product_m_version;
          this.product_name = data.product_name;
          document.title = this.product_name;
          let dataStr = JSON.stringify(data);
          this.set_authorInfo(dataStr);
        })
        .catch(err => {});
    },
    submitForm(fromName) {
      this.$refs[fromName].validate(validate => {
        if (validate) {
          this.loginForm.password = this.$md5(this.loginForm.password);
          this.__postLogin(this.loginForm);
        }
      });
    },
    ...mapMutations({
      set_token: types.SET_TOKEN,
      set_username: types.SET_USERNAME,
      set_authorInfo: types.SET_AUTHORINFO
    })
  }
};
</script>
<style>
#loginContainer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(~assets/img/demo-1-bg.jpg) no-repeat center;
  background-size: cover;
}
.lizi-wrap {
  width: 100%;
  height: 100%;
}
.login-header {
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
}
.login-header .login-header-title {
  font-size: 36px;
  line-height: 2;
  letter-spacing: 2px;
}
.login-header .login-header-version {
  font-size: 20px;
}
.login-form-wrap {
  width: 350px;
  margin: 0 auto;
}
#loginContainer .el-input__inner {
  background-color: rgba(29, 51, 74, 0.47);
  border: 1px solid #5c7998;
  padding-left: 36px;
  color: #fff;
}
#loginContainer .el-input__inner:focus {
  border-color: #409eff;
}
#loginContainer .login-input-icon {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 26px;
}
.captcha_wrap {
  position: absolute;
  top: 0;
  right: 0;
  width: 28%;
  height: 40px;
  text-align: center;
  background-color: rgba(29, 51, 74, 0.47);
  border: 1px solid #5c7998;
  border-radius: 5px;
  cursor: pointer;
  font-size: 30px;
  letter-spacing: 3px;
  line-height: 40px;
  color: #fff;
  font-family: IBM,sans-serif;
}
.captcha_wrap:hover {
  border-color: #409eff;
}
.loginwrap .login_form {
  width: 100%;
  height: 500px;
  max-width: 460px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
@font-face {
  font-family: IBM;
  src: url(~assets/font/Nouveau_IBM.ttf);
}
</style>
