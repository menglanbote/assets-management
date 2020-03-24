<template>
  <div class="three_step">
    <el-divider content-position="left">数据库配置</el-divider>
    <el-form
      :model="formData"
      :rules="rules"
      ref="step_sql_form"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="formData.ip" :maxLength="50"></el-input>
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <el-input v-model="formData.port" :maxLength="50"></el-input>
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
import { setDatabaseConfig } from "req/api/install";
export default {
  name: "three_step",
  data() {
    var validatePort = (rule, value, callback) => {
      let isTest = !isNaN(value) && parseInt(value) > 0 && parseInt(value) < 65536;
      if (!isTest) {
        return callback(new Error("请输入正确的端口号,端口号大于0小于65536"));
      } else {
        return callback();
      }
    };
    var validateIP = (rule, value, callback) => {
      let isTest = this.$validates.ipReg.test(value);
      if (!isTest) {
        return callback(new Error("请输入正确的IP地址,例如:1.1.1.1"));
      } else {
        return callback();
      }
    };
    return {
      labelPosition: "right",
      formData: {
        ip: "",
        port: ""
      },
      rules: {
        ip: [
          { required: true, message: "IP地址不能为空", trigger: "blur" },
          { validator: validateIP, trigger: "blur" }
        ],
        port: [
          { required: true, message: "端口号不能为空", trigger: "blur" },
          { validator: validatePort, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    activeStep: Number
  },
  methods: {
    handleNext() {
      this.$refs.step_sql_form.validate(valid => {
        if (valid) {
          this.__setDatabaseConfig(this.formData)
        } else {
          return false;
        }
      });
    },
    handlePrev() {
      this.$emit("update:activeStep", this.activeStep - 1);
    },
    __setDatabaseConfig(param) {
      setDatabaseConfig(param).then(res => {
        this.$emit("update:activeStep", this.activeStep + 1);
      }).catch(err => {})
    }
  }
};
</script>
<style lang="less" scoped>
.three_step {
  .demo-ruleForm {
    width: 400px;
    margin: 20px 0 40px;
  }
}
</style>
