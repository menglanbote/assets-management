<template>
  <div class="three_step">
    <el-divider content-position="left">出口地址</el-divider>
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
      <div class="colorNotice">备注：出口地址为负载均衡所使用的虚拟地址</div>
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
import { addproxyip } from "req/api/install";
export default {
  name: "three_step",
  data() {
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
        ip: ""
      },
      rules: {
        ip: [
          { required: true, message: "IP地址不能为空", trigger: "blur" },
          { validator: validateIP, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    activeStep: Number
  },
  created () {
    this.formData.ip = window.location.hostname || ""
  },
  methods: {
    handleNext() {
      this.$refs.step_sql_form.validate(valid => {
        if (valid) {
          this.__addproxyip(this.formData)
        } else {
          return false;
        }
      });
    },
    handlePrev() {
      this.$emit("update:activeStep", this.activeStep - 1);
    },
    __addproxyip(param) {
      addproxyip(param).then(res => {
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
