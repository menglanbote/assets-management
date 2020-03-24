<template>
  <div class="five_step">
    <el-divider content-position="left">添加系统管理员</el-divider>
    <el-form
      :model="formData"
      :rules="rules"
      ref="step_userinfo_form"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="real_name">
        <el-input v-model="formData.real_name" :maxLength="50"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="show_name">
        <el-input v-model="formData.show_name" :maxLength="50"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="formData.password"
          :maxLength="50"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="formData.checkPass"
          autocomplete="off"
          :maxLength="50"
        ></el-input>
      </el-form-item>
    </el-form>
    <div>
      <mu-button
        flat
        class="demo-step-button"
        :disabled="activeStep === 0"
        @click="handlePrev"
      >
        上一步
      </mu-button>
      <mu-button class="demo-step-button" color="primary" @click="handleNext">
        下一步
      </mu-button>
    </div>
  </div>
</template>
<script>

import { setUseConfig } from "req/api/install";
export default {
  name: "five_step",
  data() {
    var validateName = (rule, value, callback) => {
      let isTest = this.$validates.nameReg.test(value);
      if (!isTest) {
        return callback(
          new Error(
            "用户名只能为字母、数字或下划线,且不能用下划线开头,长度3-16位"
          )
        );
      } else {
        return callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      let isTest = this.$validates.passwordReg.test(value);
      if (!isTest) {
        return callback(
          new Error(
            "密码至少包含大小写字母、数字、特殊字符(~!@#$%^&*()_-+,.)中的三种,且长度为8-24位"
          )
        );
      } else {
        return callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
        if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      labelPosition: "right",
      visibility: false,
      rules: {
        real_name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ],
        show_name: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "用户昵称长度在 2 到 8 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
            { validator: validatePassword2, trigger: 'blur' }
          ]
      },
      formData: {
        real_name: "",
        show_name: "",
        password: "",
        checkPass:""
      }
    };
  },
  props: {
    activeStep: Number
  },
  methods: {
    handleNext() {
      this.$refs.step_userinfo_form.validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.formData))
          data.password = this.$md5(data.password)
          data.checkPass = this.$md5(data.checkPass)
          this.__setUseConfig(data);
        } else {
          return false;
        }
      });
    },
    handlePrev() {
      this.$emit("update:activeStep", this.activeStep - 1);
    },
    __setUseConfig(param) {
      setUseConfig(param)
        .then(res => {
          this.$emit("update:activeStep", this.activeStep + 1);
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
.five_step {
  .demo-ruleForm {
    margin: 20px 0 40px;
    width: 400px;
    .el-form-item {
      margin-bottom: 34px;
    }
  }
}
</style>
